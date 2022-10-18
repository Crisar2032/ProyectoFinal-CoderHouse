import { Response, Request } from 'express';
import Container from './container'
import Cart from '../models/product';


const containerCarts = new Container('../api/src/cart.txt');

////////TO DO: Implementar lógica de las funciones. Solo están creadas las funciones con logica de productController//////////////////

export const createCart = async (req: Request, res: Response) => {
    let item = req.body;
    //const product = new Product("", Date.now(), item.name, item.description, item.code, item.photo, item.price, item.stock)
   // const result = await containerCarts.save(product)
    //return res.json({ message: 'Product added', product: result });
}


export const deleteCart = async( req:Request, res: Response) =>{
    const result = await containerCarts.deleteById(req,res);
    if (!result) {
       return res.json({message:'The product you want to delete does not exist.'})
    }
    return res.json({message:`Deleted product with id: ${req.params.id}`});
}

export const getProductById = async (req: Request, res: Response) => {
    const product = await containerCarts.getById(req, res)
    return res.json(product);
}

export const addProductCart = async (req: Request, res: Response) => {
    let item = req.body;
    let p = await containerCarts.getById(req, res);
    p.id = item.id ? item.id : p.id;
    p.timestamp = item.timestamp? item.timestamp: p.timestamp ;
    p.name = item.name? item.name: p.name;
    p.description = item.description? item.description: p.description;
    p.code = item.code? item.code: p.code;
    p.photo = item.photo? item.photo: p.photo;
    p.price = item.price? item.price: p.price;
    p.stock = item.stock? item.stock: p.stock;

    const result = await containerCarts.updateById(req, p)
    return res.json({ message: 'Product updated', product: result });
}



export const deleteProductCart = async(req:Request, res:Response)=>{

}