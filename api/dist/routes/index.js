"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartsRouter_1 = __importDefault(require("./cartsRouter"));
const productsRouter_1 = __importDefault(require("./productsRouter"));
const router = express_1.default.Router();
router.use('/api/productos', productsRouter_1.default);
router.use('/api/carritos', cartsRouter_1.default);
router.get('/', (req, res, next) => {
    res.send('Api funcionando correctamente');
});
router.use((req, res) => {
    {
        return res.status(404).send({
            error: -2, description: `route ${req.originalUrl} method ${req.method} not implemented`
        });
    }
});
exports.default = router;
