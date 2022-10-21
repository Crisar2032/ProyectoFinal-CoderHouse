"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = __importDefault(require("../middlewares/"));
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const productsRouter = (0, express_1.Router)();
productsRouter.get('/:id?', product_controller_1.getProductById);
productsRouter.post('/', middlewares_1.default, product_controller_1.createProduct);
productsRouter.put('/:id', middlewares_1.default, product_controller_1.updateProduct);
productsRouter.delete('/:id', middlewares_1.default, product_controller_1.deleteProduct);
exports.default = productsRouter;
