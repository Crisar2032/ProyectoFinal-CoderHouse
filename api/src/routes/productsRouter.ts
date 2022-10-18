//import authMiddleware from '../middlewares/';
import { Router } from "express";
import {createProduct, deleteProduct, getProductById, updateProduct} from '../controllers/product.controller'
const productsRouter  = Router();

productsRouter.get('/:id?', getProductById );

productsRouter.post('/' ,createProduct);

productsRouter.put('/:id', updateProduct);

productsRouter.delete('/:id' ,deleteProduct);

export default productsRouter;