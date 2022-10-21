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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = void 0;
const container_1 = __importDefault(require("./container"));
const product_1 = __importDefault(require("../models/product"));
const containerProducts = new container_1.default('../api/dist/product.txt');
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield containerProducts.getById(req, res);
    if (!product) {
        return res.json({ message: 'Product not found' });
    }
    return res.json(product);
});
exports.getProductById = getProductById;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let item = req.body;
    const product = new product_1.default("", Date.now(), item.name, item.description, item.code, item.photo, item.price, item.stock);
    const result = yield containerProducts.save(product);
    return res.json({ message: 'Product created', product: result });
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let item = req.body;
    let p = yield containerProducts.getById(req, res);
    p.id = req.params.id;
    p.timestamp = item.timestamp ? item.timestamp : p.timestamp;
    p.name = item.name ? item.name : p.name;
    p.description = item.description ? item.description : p.description;
    p.code = item.code ? item.code : p.code;
    p.photo = item.photo ? item.photo : p.photo;
    p.price = item.price ? item.price : p.price;
    p.stock = item.stock ? item.stock : p.stock;
    const result = yield containerProducts.updateById(req, res, p);
    return res.json({ message: 'Product updated', product: result });
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield containerProducts.deleteById(req, res);
    if (!result) {
        return res.json({ message: 'The product you want to delete does not exist.' });
    }
    return res.json({ message: `Deleted product with id: ${req.params.id}` });
});
exports.deleteProduct = deleteProduct;
