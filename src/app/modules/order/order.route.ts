import express from 'express'
import { OrderController } from './order.controller'

const router = express.Router()
router.post('/create-order', OrderController.insertIntoDB)
router.get('/:id', OrderController.getByIdFromDB)
router.patch('/:id', OrderController.updateIntoDB)
router.get('/:id', OrderController.deleteByIdFromDB)
router.get('/', OrderController.getAllFromDB)

export const OrderRoutes = router
