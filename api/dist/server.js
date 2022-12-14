"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use('/', routes_1.default);
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => { console.log(`Server runing and listening on port ${PORT}`); });
server.on('error', (error) => console.log(`Error ${error}`));
