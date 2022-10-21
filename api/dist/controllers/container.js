"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
class Container {
    constructor(file) {
        this.file = file;
    }
    save(item) {
        return __awaiter(this, void 0, void 0, function* () {
            let content = yield fs.promises.readFile(this.file);
            let contObj = JSON.parse(content);
            let newId;
            if (contObj.length > 0) {
                const itemsId = contObj.map((p) => p.id);
                newId = Math.max(...itemsId) + 1;
            }
            else {
                newId = 1;
            }
            item.id = newId;
            contObj.push(item);
            yield fs.promises.writeFile(this.file, JSON.stringify(contObj));
            return item;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let content = yield fs.promises.readFile(this.file);
            let contObj = JSON.parse(content);
            return contObj;
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            let contObj = yield this.getAll();
            let result = id != null ? contObj.find((obj) => obj.id == id) : contObj;
            return result;
        });
    }
    updateById(req, res, element) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const item = req.body;
            let contObj = yield this.getAll();
            const idx = contObj.findIndex((p) => p.id == id);
            if (idx === -1) {
                return false;
            }
            else {
                element ? contObj.splice(idx, 1, element) : contObj.splice(idx, 1, item);
                yield fs.promises.writeFile(this.file, JSON.stringify(contObj));
                return true;
            }
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            let contObj = yield this.getAll();
            let idx = contObj.findIndex((i) => i.id == id);
            if (idx === -1) {
                return false;
            }
            req.body ? contObj.splice(idx, 1, req.body) : contObj.splice(idx, 1);
            yield fs.promises.writeFile(this.file, JSON.stringify(contObj));
            return true;
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs.promises.writeFile(this.file, "[]");
        });
    }
}
exports.default = Container;
