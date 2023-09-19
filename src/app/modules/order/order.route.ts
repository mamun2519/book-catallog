import express from 'express'
import { OrderController } from './order.controller'

const router = express.Router()
router.post('/create-order', OrderController.createOrder)
router.get('/:id', OrderController.singleOrder)
router.patch('/:id', OrderController.updateIntoDB)
router.get('/:id', OrderController.deleteByIdFromDB)
router.get('/', OrderController.allOrder)

export const OrderRoutes = router
