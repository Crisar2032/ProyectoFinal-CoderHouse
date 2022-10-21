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
exports.deleteProductCart = exports.addProductCart = exports.getProductsCart = exports.deleteCart = exports.createCart = void 0;
const path_1 = __importDefault(require("path"));
const container_1 = __importDefault(require("./container"));
const cart_1 = __importDefault(require("../models/cart"));
const product_1 = __importDefault(require("../models/product"));
const containerCarts = new container_1.default(path_1.default.join(__dirname, '../cart.txt'));
const containerProducts = new container_1.default(path_1.default.join(__dirname, '../product.txt'));
const createCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let item = req.body;
    const cart = new cart_1.default("", Date.now(), item.products);
    const result = yield containerCarts.save(cart);
    return res.json({ message: 'Cart created', cart: result });
});
exports.createCart = createCart;
const deleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield containerCarts.deleteById(req, res);
    if (!result) {
        return res.json({ message: 'The cart you want to delete does not exist.' });
    }
    return res.json({ message: `Deleted cart with id: ${req.params.id}` });
});
exports.deleteCart = deleteCart;
const getProductsCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield containerCarts.getById(req, res);
    if (!result) {
        return res.json({ message: 'Cart not found' });
    }
    return res.json(result);
});
exports.getProductsCart = getProductsCart;
const addProductCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cartId = req.params.id;
    let productId = req.params.id_prod;
    let c = yield containerCarts.getById(req, res);
    req.params.id = productId;
    let p = yield containerProducts.getById(req, res);
    const cart = new cart_1.default(c.id, c.timestamp, c.products);
    const product = new product_1.default(p.id, p.timestamp, p.name, p.description, p.code, p.photo, p.price, p.stock);
    cart.products.push(product);
    req.body = cart;
    req.params.id = cartId;
    const result = yield containerCarts.updateById(req, res);
    if (!result) {
        return res.json({ message: 'Cart not found' });
    }
    return res.json({ message: 'Product updated', product: cart.products[cart.products.length - 1] });
});
exports.addProductCart = addProductCart;
const deleteProductCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cartId = req.params.id;
    let productId = req.params.id_prod;
    let c = yield containerCarts.getById(req, res);
    const cart = new cart_1.default(c.id, c.timestamp, c.products);
    let idx = cart.products.findIndex((i) => i.id == productId);
    if (idx === -1) {
        return res.json({ message: 'Product not found' });
    }
    cart.products.splice(idx, 1);
    req.body = cart;
    const result = yield containerCarts.deleteById(req, res);
    return res.json({ message: 'Product deleted', actualCart: cart.products });
});
exports.deleteProductCart = deleteProductCart;
