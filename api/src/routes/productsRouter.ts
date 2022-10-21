import authMiddleware from '../middlewares/';
import { Router } from "express";
import { createProduct, deleteProduct, getProductById, updateProduct } from '../controllers/product.controller'
const productsRouter = Router();

productsRouter.get('/:id?', getProductById);

productsRouter.post('/', authMiddleware, createProduct);

productsRouter.put('/:id', authMiddleware, updateProduct);

productsRouter.delete('/:id', authMiddleware, deleteProduct);

export default productsRouter;