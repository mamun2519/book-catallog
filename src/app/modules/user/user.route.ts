import express from 'express'
import { UseController } from './user.controller'
import auth from '../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enum/user'

const router = express.Router()
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UseController.getByIdFromDB)
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), UseController.updateIntoDB)
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UseController.deleteByIdFromDB,
)
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UseController.getAllFromDB)

export const UserRoutes = router
