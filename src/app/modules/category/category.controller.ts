import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'

import sendResponse from '../../../shared/sendResponse'
import { StatusCodes } from 'http-status-codes'
import { CategoryService } from './category.service'
const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.insertIntoDB(req.body)
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'category create Successfully',
    data: result,
  })
})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllFromDB()
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'category fetched Successfully',
    data: result,
  })
})
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getByIdFromDB(req.params.id)
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'category fetched Successfully',
    data: result,
  })
})

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.updateIntoDB(req.params.id, req.body)
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'category update Successfully',
    data: result,
  })
})

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.deleteByIdFromDB(req.params.id)
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'category delete Successfully',
    data: result,
  })
})

export const CategoryController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteByIdFromDB,
  insertIntoDB,
}
