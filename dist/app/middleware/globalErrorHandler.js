"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const apiError_1 = __importDefault(require("../../error/apiError"));
const client_1 = require("@prisma/client");
const validationError_1 = __importDefault(require("../../error/validationError"));
const clientRequsetError_1 = __importDefault(require("../../error/clientRequsetError"));
const zod_1 = require("zod");
const zodValidationError_1 = __importDefault(require("../../error/zodValidationError"));
const globalErrorHandler = (error, _req, res, 
// eslint-disable-next-line no-unused-vars
_next) => {
    config_1.env_config.env === 'development'
        ? console.log('Global Error-----', { error })
        : console.log('Global Error---', { error });
    let statusCode = 500;
    let message = 'Something is wrong';
    let errorMessages = [];
    if (error instanceof apiError_1.default) {
        statusCode = error.statusCode;
        message = error.message;
        errorMessages = error.message ? [{ path: '', message: error.message }] : [];
    }
    else if (error instanceof client_1.Prisma.PrismaClientValidationError) {
        const findingError = (0, validationError_1.default)(error);
        statusCode = findingError.statusCode;
        message = findingError.message;
        errorMessages = findingError.errorMessages;
    }
    else if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        const findingError = (0, clientRequsetError_1.default)(error);
        statusCode = findingError.statusCode;
        message = findingError.message;
        errorMessages = findingError.errorMessages;
    }
    else if (error instanceof zod_1.ZodError) {
        const findingError = (0, zodValidationError_1.default)(error);
        statusCode = findingError.statusCode;
        message = findingError.message;
        errorMessages = findingError.errorMessages;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config_1.env_config.env !== 'production' ? error.stack : undefined,
    });
};
exports.default = globalErrorHandler;
