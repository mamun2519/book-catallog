import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { Request, Response } from 'express'
import { IDecodedToken } from '../../../interface/tokenUser'
import { JwtPayload } from 'jsonwebtoken'
import { ProfileService } from './profile.service'

const getMyProfileFromDB = catchAsync(async (req: Request, res: Response) => {
  const user: IDecodedToken | JwtPayload | null = req.user
  const result = await ProfileService.getMyProfileFromDB(user)
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Orders retrieved successfully',
    data: result,
  })
})

export const ProfileController = {
  getMyProfileFromDB,
}
