import { Request, Response } from 'express'
const fs = require('fs');

class Container {
    file: any
    constructor(file: any) {
        this.file = file
    }

    async save(item: any) {
        let content = await fs.promises.readFile(this.file);
        let contObj = JSON.parse(content);
        let newId;
        if (contObj.length > 0) {
            const itemsId = contObj.map((p: any) => p.id);
            newId = Math.max(...itemsId) + 1;
        } else {
            newId = 1;
        }
        item.id = newId;
        contObj.push(item);
        await fs.promises.writeFile(this.file, JSON.stringify(contObj));
        return item
    }

    async getAll() {
        let content = await fs.promises.readFile(this.file);
        let contObj = JSON.parse(content);
        return contObj
    }

    async getById(req: Request, res: Response) {
        let { id } = req.params;
        let contObj = await this.getAll();
        let result = id != null ? contObj.find((obj: any) => obj.id == id) : contObj;
        return result;
    }

    async updateById(req: Request, res: Response, element?: any) {

        const id = req.params.id;
        const item = req.body;
        let contObj = await this.getAll();
        const idx = contObj.findIndex((p: any) => p.id == id);

        if (idx === -1) {
            return false;
        } else {
            element ? contObj.splice(idx, 1, element) : contObj.splice(idx, 1, item);
            await fs.promises.writeFile(this.file, JSON.stringify(contObj));
            return true
        }
    }

    async deleteById(req: Request, res: Response) {
        let { id } = req.params;
        let contObj = await this.getAll();
        let idx = contObj.findIndex((i: any) => i.id == id);

        if (idx === -1) {
            return false;
        }

        req.body ? contObj.splice(idx, 1, req.body) : contObj.splice(idx, 1);
        await fs.promises.writeFile(this.file, JSON.stringify(contObj));

        return true;
    }

    async deleteAll() {
        await fs.promises.writeFile(this.file, "[]")
    }

}


export default Container;