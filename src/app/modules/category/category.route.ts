import express from 'express'
import { CategoryController } from './category.controller'
import auth from '../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enum/user'

const router = express.Router()
router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.insertIntoDB,
)
router.get('/:id', CategoryController.getByIdFromDB)
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.updateIntoDB,
)
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteByIdFromDB,
)
router.get('/', CategoryController.getAllFromDB)

export const CategoryRoutes = router
