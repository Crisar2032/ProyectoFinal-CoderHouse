import { Router } from "express";
import { addProductCart, createCart, deleteCart, deleteProductCart, getProductsCart } from '../controllers/cart.controller'
const routerCarritos = Router();


routerCarritos.post('/', createCart);

routerCarritos.delete('/:id', deleteCart);

routerCarritos.get('/:id/productos', getProductsCart);

routerCarritos.post('/:id/productos/:id_prod', addProductCart);

routerCarritos.delete('/:id/productos/:id_prod', deleteProductCart);

export default routerCarritos;
