import express from 'express'
import { BookController } from './book.controller'
import auth from '../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enum/user'

const router = express.Router()
router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.insertIntoDB,
)
router.get('/:id', BookController.getByIdFromDB)
router.get('/:id/category', BookController.getAllByCategoryIdFromDB)
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.updateIntoDB)
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.deleteByIdFromDB,
)
router.get('/', BookController.getAllFromDB)

export const BookRoutes = router
