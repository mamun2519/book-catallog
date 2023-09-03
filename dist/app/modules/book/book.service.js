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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const prisma_1 = require("../../../prisma/prisma");
const calulatePaginatio_1 = __importDefault(require("../../../shared/calulatePaginatio"));
const book_constant_1 = require("./book.constant");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.book.create({ data, include: { category: true } });
});
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, skip, limit } = (0, calulatePaginatio_1.default)(options);
    const { search } = filters, filterData = __rest(filters, ["search"]);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: book_constant_1.bookSearchableFiled.map(filed => ({
                [filed]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                if (['maxPrice'].includes(key)) {
                    return {
                        ['price']: {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            gt: Number(filterData[key]),
                        },
                    };
                }
                else if (['minPrice'].includes(key)) {
                    return {
                        ['price']: {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            lt: Number(filterData[key]),
                        },
                    };
                }
                else if (book_constant_1.BookRelationalFields.includes(key)) {
                    return {
                        [book_constant_1.BookRelationalFieldsMapper[key]]: {
                            id: filterData[key],
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            equals: filterData[key],
                        },
                    };
                }
            }),
        });
    }
    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.prisma.book.findMany({
        skip,
        take: limit,
        where: whereCondition,
        include: {
            category: true,
        },
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {},
    });
    const total = yield prisma_1.prisma.book.count({
        where: whereCondition,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getAllByCategoryIdFromDB = (id, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, skip, limit } = (0, calulatePaginatio_1.default)(options);
    const result = yield prisma_1.prisma.book.findMany({
        skip,
        take: limit,
        where: {
            categoryId: id,
        },
    });
    const total = yield prisma_1.prisma.book.count();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.book.findFirst({
        where: { id },
        include: {
            category: true,
        },
    });
});
const updateIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.book.update({
        where: {
            id,
        },
        include: {
            category: true,
        },
        data: payload,
    });
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.book.delete({
        where: { id },
        include: {
            category: true,
        },
    });
});
exports.BookService = {
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteByIdFromDB,
    insertIntoDB,
    getAllByCategoryIdFromDB,
};
