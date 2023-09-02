import express from 'express'
import { AuthRoute } from '../modules/auth/auth.route'
import { UserRoutes } from '../modules/user/user.route'
import { CategoryRoutes } from '../modules/category/category.route'
import { BookRoutes } from '../modules/book/book.route'
import { OrderRoutes } from '../modules/order/order.route'
const router = express.Router()

const allModulesRoutes = [
  {
    path: '/auth',
    routers: AuthRoute,
  },
  {
    path: '/users',
    routers: UserRoutes,
  },
  {
    path: '/categories',
    routers: CategoryRoutes,
  },
  {
    path: '/books',
    routers: BookRoutes,
  },
  {
    path: '/orders',
    routers: OrderRoutes,
  },
]

allModulesRoutes.forEach(route => router.use(route.path, route.routers))

export const RootRoute = router
