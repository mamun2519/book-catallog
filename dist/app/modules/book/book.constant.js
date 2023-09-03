"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRelationalFieldsMapper = exports.bookSearchableFiled = exports.BookRelationalFields = exports.bookFilterableFiled = void 0;
exports.bookFilterableFiled = [
    'search',
    'minPrice',
    'maxPrice',
    'category',
];
exports.BookRelationalFields = ['categoryId'];
exports.bookSearchableFiled = ['title', 'genre', 'price', 'author'];
exports.BookRelationalFieldsMapper = {
    categoryId: 'category',
};
