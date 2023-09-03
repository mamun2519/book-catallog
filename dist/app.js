"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const routes_1 = require("./app/routes");
const app = (0, express_1.default)();
// middleware
app.use([(0, cors_1.default)(), express_1.default.json(), express_1.default.urlencoded({ extended: true })]);
// Test api
app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Server start Success..' });
});
//root routes
app.use('/api/v1', routes_1.RootRoute);
//add to global error handler middleware
app.use(globalErrorHandler_1.default);
// not found routes
app.use((req, res, next) => {
    res.status(300).json({
        success: false,
        message: 'Not Found',
        errorMessages: [{ path: req.originalUrl, message: 'API Not Found' }],
    });
    next();
});
exports.default = app;
