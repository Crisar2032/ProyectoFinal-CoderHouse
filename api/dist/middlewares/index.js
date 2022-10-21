"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware = (req, res, next) => {
    if (req.headers.rol == "admin") {
        next();
    }
    else {
        res.json({ error: -1, description: `route ${req.originalUrl} method ${req.method} unauthorized` });
    }
};
exports.default = authMiddleware;
