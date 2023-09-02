import express from 'express'
import { BookController } from './book.controller'

const router = express.Router()
router.post('/create-Book', BookController.insertIntoDB)
router.get('/:id', BookController.getByIdFromDB)
router.get('/:id/category', BookController.getAllByCategoryIdFromDB)
router.patch('/:id', BookController.updateIntoDB)
router.delete('/:id', BookController.deleteByIdFromDB)
router.get('/', BookController.getAllFromDB)

export const BookRoutes = router