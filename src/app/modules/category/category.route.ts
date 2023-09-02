import express from 'express'
import { CategoryController } from './category.controller'

const router = express.Router()
router.post('/create-category', CategoryController.insertIntoDB)
router.get('/:id', CategoryController.getByIdFromDB)
router.patch('/:id', CategoryController.updateIntoDB)
router.get('/:id', CategoryController.deleteByIdFromDB)
router.get('/', CategoryController.getAllFromDB)

export const CategoryRoutes = router
