import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'

import sendResponse from '../../../shared/sendResponse'
import { StatusCodes } from 'http-status-codes'
import { BookService } from './book.service'
import pickArrayAndConvertObject from '../../../shared/pick'
import { bookFilterableFiled } from './book.constant'

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.insertIntoDB(req.body)
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Book create Successfully',
    data: result,
  })
})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filters: any = pickArrayAndConvertObject(req.query, bookFilterableFiled)
  const options = pickArrayAndConvertObject(req.query, [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
  ])
  const result = await BookService.getAllFromDB(filters, options)
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Book fetched Successfully',
    meta: result.meta,
    data: result.data,
  })
})
const getAllByCategoryIdFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const options = pickArrayAndConvertObject(req.query, [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
    ])
    const result = await BookService.getAllByCategoryIdFromDB(
      req.params.id,
      options,
    )
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Book fetched Successfully',
      meta: result.meta,
      data: result.data,
    })
  },
)
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getByIdFromDB(req.params.id)
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Book fetched Successfully',
    data: result,
  })
})

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.updateIntoDB(req.params.id, req.body)
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Book update Successfully',
    data: result,
  })
})

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.deleteByIdFromDB(req.params.id)
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Book delete Successfully',
    data: result,
  })
})

export const BookController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteByIdFromDB,
  insertIntoDB,
  getAllByCategoryIdFromDB,
}
