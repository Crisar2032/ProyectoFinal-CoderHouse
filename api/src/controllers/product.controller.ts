import { Response, Request } from 'express';
import Container from './container'
import Product from '../models/product';


const containerProducts = new Container(__dirname+'../product.txt');

export const getProductById = async (req: Request, res: Response) => {
    const product = await containerProducts.getById(req, res)
    if (!product) {
        return res.json({ message: 'Product not found' });
    }
    return res.json(product);
}

export const createProduct = async (req: Request, res: Response) => {
    let item = req.body;
    const product = new Product("", Date.now(), item.name, item.description, item.code, item.photo, item.price, item.stock)
    const result = await containerProducts.save(product)
    return res.json({ message: 'Product created', product: result });
}

export const updateProduct = async (req: Request, res: Response) => {
    let item = req.body;
    let p = await containerProducts.getById(req, res);
    p.id = req.params.id;
    p.timestamp = item.timestamp ? item.timestamp : p.timestamp;
    p.name = item.name ? item.name : p.name;
    p.description = item.description ? item.description : p.description;
    p.code = item.code ? item.code : p.code;
    p.photo = item.photo ? item.photo : p.photo;
    p.price = item.price ? item.price : p.price;
    p.stock = item.stock ? item.stock : p.stock;

    const result = await containerProducts.updateById(req, res, p)
    return res.json({ message: 'Product updated', product: result });
}

export const deleteProduct = async (req: Request, res: Response) => {
    const result = await containerProducts.deleteById(req, res);
    if (!result) {
        return res.json({ message: 'The product you want to delete does not exist.' })
    }
    return res.json({ message: `Deleted product with id: ${req.params.id}` });
}