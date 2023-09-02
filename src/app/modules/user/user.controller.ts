import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { UserService } from './user.service'
import sendResponse from '../../../shared/sendResponse'
import { StatusCodes } from 'http-status-codes'

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllFromDB()
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User fetched Successfully',
    data: result,
  })
})
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getByIdFromDB(req.params.id)
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User fetched Successfully',
    data: result,
  })
})

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateIntoDB(req.params.id, req.body)
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User update Successfully',
    data: result,
  })
})

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteByIdFromDB(req.params.id)
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User delete Successfully',
    data: result,
  })
})

export const UseController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteByIdFromDB,
}
