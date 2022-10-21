"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(id, timestamp, name, description, code, photo, price, stock) {
        this.id = id;
        this.timestamp = timestamp;
        this.name = name;
        this.description = description;
        this.code = code;
        this.photo = photo;
        this.price = price;
        this.stock = stock;
    }
}
exports.default = Product;
