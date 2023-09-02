import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { AuthService } from './auth.service'
import sendResponse from '../../../shared/sendResponse'
import { StatusCodes } from 'http-status-codes'

const userSingUp = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.userSingUpFromDB(req.body)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  })
})

const userSingIn = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.userSingInFromDB(req.body)

  res.status(StatusCodes.OK).json({
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User signIn successfully',
    token: result,
  })
})

export const AuthController = {
  userSingUp,
  userSingIn,
}
