import express from 'express'
import { AuthController } from './auth.controller'
const router = express.Router()
router.post('/signup', AuthController.userSingUp)
router.post('/signin', AuthController.userSingIn)

export const AuthRoute = router
