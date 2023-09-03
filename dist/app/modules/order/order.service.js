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
exports.OrderService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../../prisma/prisma");
const apiError_1 = __importDefault(require("../../../error/apiError"));
const http_status_codes_1 = require("http-status-codes");
const insertIntoDB = (user, data) => __awaiter(void 0, void 0, void 0, function* () {
    const orderCreate = yield prisma_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield transactionClient.order.create({
            data: {
                userId: user === null || user === void 0 ? void 0 : user.userId,
            },
            include: {
                orderedBooks: true,
            },
        });
        for (let i = 0; i < data.orderedBooks.length; i++) {
            yield transactionClient.orderedBooks.create({
                data: {
                    orderId: order.id,
                    bookId: data.orderedBooks[i].bookId,
                    quantity: data.orderedBooks[i].quantity,
                },
                include: {
                    order: true,
                },
            });
        }
        return order;
    }));
    const userOrder = yield prisma_1.prisma.order.findFirst({
        where: {
            id: orderCreate.id,
        },
        include: {
            orderedBooks: true,
        },
    });
    return userOrder;
});
const getAllFromDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if ((user === null || user === void 0 ? void 0 : user.role) == client_1.UserRole.customer) {
        return yield prisma_1.prisma.order.findMany({
            where: {
                userId: user.userId,
            },
            include: {
                orderedBooks: true,
            },
        });
    }
    return yield prisma_1.prisma.order.findMany({
        include: {
            orderedBooks: true,
        },
    });
});
const getByIdFromDB = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield prisma_1.prisma.order.findFirst({
        where: { id },
        include: {
            orderedBooks: true,
        },
    });
    if ((user === null || user === void 0 ? void 0 : user.role) == client_1.UserRole.customer) {
        if ((order === null || order === void 0 ? void 0 : order.userId) !== (user === null || user === void 0 ? void 0 : user.userId)) {
            throw new apiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `Its Not your order id ${id}`);
        }
    }
    return order;
});
const updateIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.order.update({
        where: {
            id,
        },
        include: {
            orderedBooks: true,
        },
        data: payload,
    });
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.order.delete({
        where: { id },
        include: {
            orderedBooks: true,
        },
    });
});
exports.OrderService = {
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteByIdFromDB,
    insertIntoDB,
};
