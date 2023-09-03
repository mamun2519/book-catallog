"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const category_route_1 = require("../modules/category/category.route");
const book_route_1 = require("../modules/book/book.route");
const order_route_1 = require("../modules/order/order.route");
const profile_route_1 = require("../modules/profile/profile.route");
const router = express_1.default.Router();
const allModulesRoutes = [
    {
        path: '/auth',
        routers: auth_route_1.AuthRoute,
    },
    {
        path: '/users',
        routers: user_route_1.UserRoutes,
    },
    {
        path: '/categories',
        routers: category_route_1.CategoryRoutes,
    },
    {
        path: '/books',
        routers: book_route_1.BookRoutes,
    },
    {
        path: '/orders',
        routers: order_route_1.OrderRoutes,
    },
    {
        path: '/profile',
        routers: profile_route_1.ProfileRoutes,
    },
];
allModulesRoutes.forEach(route => router.use(route.path, route.routers));
exports.RootRoute = router;
