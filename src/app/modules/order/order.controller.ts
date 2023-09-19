import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'

import sendResponse from '../../../shared/sendResponse'
import { StatusCodes } from 'http-status-codes'
import { OrderService } from './order.service'

import apiError from '../../../error/apiError'
import { verifyToken } from '../../../shared/jwthelper'
import { env_config } from '../../../config'
import { Secret } from 'jsonwebtoken'

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

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const token: string | undefined = req.headers.authorization

  try {
    if (!token) {
      throw new apiError(StatusCodes.UNAUTHORIZED, 'Token not provided')
    }

    const verifiedUser = verifyToken(token, env_config.token as Secret)

    if (verifiedUser.role === 'admin') {
      throw new apiError(
        StatusCodes.UNAUTHORIZED,
        'Admins cannot create orders. Please login as a customer account.',
      )
    }
    const { orderedBooks } = req.body

    const result = await OrderService.createOrder(
      orderedBooks,
      verifiedUser?.id,
    )

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Order created successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
})

const allOrder = catchAsync(async (req: Request, res: Response) => {
  const token: string | undefined = req.headers.authorization

  try {
    if (!token) {
      throw new apiError(StatusCodes.UNAUTHORIZED, 'Token not provided')
    }

    const verifiedUser = verifyToken(token, env_config.token as Secret)

    const result = await OrderService.allOrders(verifiedUser)

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Order retrieved successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
})

const singleOrder = catchAsync(async (req: Request, res: Response) => {
  const token: string | undefined = req.headers.authorization

  try {
    if (!token) {
      throw new apiError(StatusCodes.UNAUTHORIZED, 'Token not provided')
    }

    const verifiedUser = verifyToken(
      token as string,
      env_config.token as Secret,
    )

    const result = await OrderService.singleOrder(verifiedUser, req.params.id)

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Order retrieved successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
})

export const OrderController = {
  allOrder,
  singleOrder,
  updateIntoDB,
  deleteByIdFromDB,
  createOrder,
}
