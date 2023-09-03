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
const apiError_1 = __importDefault(require("../../error/apiError"));
const http_status_codes_1 = require("http-status-codes");
const jwthelper_1 = require("../../shared/jwthelper");
const config_1 = require("../../config");
const auth = (...requiredRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get authorization token
        const token = req.headers.authorization;
        if (!token) {
            throw new apiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You are not authorized');
        }
        // verify token
        let verifiedUser = null;
        verifiedUser = (0, jwthelper_1.verifyToken)(token, config_1.env_config.token);
        req.user = verifiedUser; // role  , userid
        // role diye guard korar jnno
        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
            throw new apiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Forbidden');
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = auth;
