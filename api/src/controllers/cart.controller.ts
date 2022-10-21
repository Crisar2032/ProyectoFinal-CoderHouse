import { Response, Request } from 'express';
import Container from './container';
import Cart from '../models/cart';
import Product from '../models/product';


const containerCarts = new Container(__dirname+'../../cart.txt');
const containerProducts = new Container(__dirname+'../../product.txt');

export const createCart = async (req: Request, res: Response) => {
    let item = req.body;
    const cart = new Cart("", Date.now(), item.products);
    const result = await containerCarts.save(cart)
    return res.json({ message: 'Cart created', cart: result });
}


export const deleteCart = async (req: Request, res: Response) => {
    const result = await containerCarts.deleteById(req, res);
    if (!result) {
        return res.json({ message: 'The cart you want to delete does not exist.' })
    }
    return res.json({ message: `Deleted cart with id: ${req.params.id}` });
}

export const getProductsCart = async (req: Request, res: Response) => {
    const result = await containerCarts.getById(req, res)
    if (!result) {
        return res.json({ message: 'Cart not found' });
    }
    return res.json(result);
}

export const addProductCart = async (req: Request, res: Response) => {
    let cartId = req.params.id;
    let productId = req.params.id_prod;

    let c = await containerCarts.getById(req, res);
    req.params.id = productId;
    let p = await containerProducts.getById(req, res);

    const cart = new Cart(c.id,
        c.timestamp,
        c.products);
    const product = new Product(
        p.id,
        p.timestamp,
        p.name,
        p.description,
        p.code,
        p.photo,
        p.price,
        p.stock);
    cart.products.push(product);

    req.body = cart;
    req.params.id = cartId;

    const result = await containerCarts.updateById(req, res)
    if (!result) {
        return res.json({ message: 'Cart not found' });
    }
    return res.json({ message: 'Product updated', product: cart.products[cart.products.length - 1] });
}



export const deleteProductCart = async (req: Request, res: Response) => {
    let cartId = req.params.id;
    let productId = req.params.id_prod;

    let c = await containerCarts.getById(req, res);
    const cart = new Cart(c.id,
        c.timestamp,
        c.products);

    let idx = cart.products.findIndex((i: any) => i.id == productId);

    if (idx === -1) {
        return res.json({ message: 'Product not found' });
    }
    cart.products.splice(idx, 1);
    req.body=cart;

    const result = await containerCarts.deleteById(req,res);

    return res.json({ message: 'Product deleted', actualCart: cart.products });
}