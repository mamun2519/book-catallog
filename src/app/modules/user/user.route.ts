import express from 'express'
import { UseController } from './user.controller'

const router = express.Router()
router.get('/:id', UseController.getByIdFromDB)
router.patch('/:id', UseController.updateIntoDB)
router.get('/:id', UseController.deleteByIdFromDB)
router.get('/', UseController.getAllFromDB)

export const UserRoutes = router
