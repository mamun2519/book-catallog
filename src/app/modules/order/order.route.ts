import express from 'express'
import { OrderController } from './order.controller'
import auth from '../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enum/user'

const router = express.Router()
router.post(
  '/create-order',
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.insertIntoDB,
)
router.get('/:id', OrderController.getByIdFromDB)
router.patch('/:id', OrderController.updateIntoDB)
router.get('/:id', OrderController.deleteByIdFromDB)
router.get('/', OrderController.getAllFromDB)

export const OrderRoutes = router
