import { Order, UserRole } from '@prisma/client'
import { prisma } from '../../../prisma/prisma'
import { IDecodedToken } from '../../../interface/tokenUser'
import { JwtPayload } from 'jsonwebtoken'
import { IOrderRequest } from './order.interface'
import apiError from '../../../error/apiError'
import { StatusCodes } from 'http-status-codes'

const insertIntoDB = async (
  user: IDecodedToken | JwtPayload | null,
  data: IOrderRequest,
): Promise<Order> => {
  const orderCreate = await prisma.$transaction(async transactionClient => {
    const order = await transactionClient.order.create({
      data: {
        userId: user?.userId,
      },
      include: {
        orderedBooks: true,
      },
    })
    for (let i = 0; i < data.orderedBooks.length; i++) {
      await transactionClient.orderedBooks.create({
        data: {
          orderId: order.id,
          bookId: data.orderedBooks[i].bookId,
          quantity: data.orderedBooks[i].quantity,
        },
        include: {
          order: true,
        },
      })
    }
    return order
  })
  return orderCreate
}

const getAllFromDB = async (
  user: IDecodedToken | JwtPayload | null,
): Promise<Order[]> => {
  if (user?.role == UserRole.customer) {
    return await prisma.order.findMany({
      where: {
        userId: user.userId,
      },
      include: {
        orderedBooks: true,
      },
    })
  }
  return await prisma.order.findMany({
    include: {
      orderedBooks: true,
    },
  })
}

const getByIdFromDB = async (
  user: IDecodedToken | JwtPayload | null,
  id: string,
): Promise<Order | null> => {
  const order = await prisma.order.findFirst({
    where: { id },
    include: {
      orderedBooks: true,
    },
  })
  if (user?.role == UserRole.customer) {
    if (order?.userId !== user?.userId) {
      throw new apiError(StatusCodes.BAD_REQUEST, `Its Not your order id ${id}`)
    }
  }

  return order
}

const updateIntoDB = async (
  id: string,
  payload: Partial<Order>,
): Promise<Order | null> => {
  return await prisma.order.update({
    where: {
      id,
    },
    include: {
      orderedBooks: true,
    },
    data: payload,
  })
}

const deleteByIdFromDB = async (id: string): Promise<Order | null> => {
  return await prisma.order.delete({
    where: { id },
    include: {
      orderedBooks: true,
    },
  })
}

export const OrderService = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteByIdFromDB,
  insertIntoDB,
}
