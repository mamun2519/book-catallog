import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'

import sendResponse from '../../../shared/sendResponse'
import { StatusCodes } from 'http-status-codes'
import { OrderService } from './order.service'

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.insertIntoDB(req.body)
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Order create Successfully',
    data: result,
  })
})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllFromDB()
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Order fetched Successfully',
    data: result,
  })
})
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getByIdFromDB(req.params.id)
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Order fetched Successfully',
    data: result,
  })
})

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.updateIntoDB(req.params.id, req.body)
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Order update Successfully',
    data: result,
  })
})

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.deleteByIdFromDB(req.params.id)
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Order delete Successfully',
    data: result,
  })
})

export const OrderController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteByIdFromDB,
  insertIntoDB,
}
