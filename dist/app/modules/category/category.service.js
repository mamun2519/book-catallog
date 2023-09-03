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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const prisma_1 = require("../../../prisma/prisma");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.category.create({ data });
});
const getAllFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.category.findMany({
        include: {
            books: true,
        },
    });
});
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.category.findFirst({
        where: { id },
        include: {
            books: true,
        },
    });
});
const updateIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.category.update({
        where: {
            id,
        },
        include: {
            books: true,
        },
        data: payload,
    });
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.category.delete({
        where: { id },
        include: {
            books: true,
        },
    });
});
exports.CategoryService = {
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteByIdFromDB,
    insertIntoDB,
};
