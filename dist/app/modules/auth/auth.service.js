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
exports.AuthService = void 0;
const prisma_1 = require("../../../prisma/prisma");
const apiError_1 = __importDefault(require("../../../error/apiError"));
const http_status_codes_1 = require("http-status-codes");
const jwthelper_1 = require("../../../shared/jwthelper");
const config_1 = require("../../../config");
const userSingUpFromDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield prisma_1.prisma.user.findFirst({
        where: {
            email: data.email,
        },
    });
    if (isExistUser) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'User Already exist');
    }
    return yield prisma_1.prisma.user.create({
        data,
    });
});
const userSingInFromDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield prisma_1.prisma.user.findFirst({
        where: {
            email: data.email,
        },
    });
    if (!isExistUser) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'User Not Found');
    }
    if ((isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.password) !== (data === null || data === void 0 ? void 0 : data.password)) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Password In correct');
    }
    const token = (0, jwthelper_1.generateToken)({
        userId: isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.id,
        role: isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.role,
    }, config_1.env_config.token, config_1.env_config.expireDate);
    return token;
});
exports.AuthService = {
    userSingUpFromDB,
    userSingInFromDB,
};
