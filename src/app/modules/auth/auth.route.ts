import express from 'express'
import { AuthController } from './auth.controller'
const router = express.Router()
router.post('/singup', AuthController.userSingUp)
router.post('/singin', AuthController.userSingIn)

export const AuthRoute = router
