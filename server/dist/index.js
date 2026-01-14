"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const pino_http_1 = __importDefault(require("pino-http"));
const env_1 = require("./config/env");
const operations_1 = __importDefault(require("./routes/operations"));
const tickets_1 = __importDefault(require("./routes/tickets"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)({ crossOriginResourcePolicy: false }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, pino_http_1.default)());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
app.use('/api', tickets_1.default);
app.use('/api', operations_1.default);
app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(400).json({ message: error.message });
});
app.listen(env_1.env.port, () => {
    console.log(`API listening on port ${env_1.env.port}`);
});
