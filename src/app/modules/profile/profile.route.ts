import express from 'express'

import auth from '../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enum/user'
import { ProfileController } from './profile.controller'

const router = express.Router()

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  ProfileController.getMyProfileFromDB,
)

export const ProfileRoutes = router
