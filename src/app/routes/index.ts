import express from 'express'
import { AuthRoute } from '../modules/auth/auth.route'
import { UserRoutes } from '../modules/user/user.route'
import { CategoryRoutes } from '../modules/category/category.route'
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
]

allModulesRoutes.forEach(route => router.use(route.path, route.routers))

export const RootRoute = router
