import { Order } from '@prisma/client'
import { prisma } from '../../../prisma/prisma'
import { IDecodedToken } from '../../../interface/tokenUser'
import { JwtPayload } from 'jsonwebtoken'
import { IOrderRequest } from './order.interface'

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

const getAllFromDB = async (): Promise<Order[]> => {
  return await prisma.order.findMany({
    include: {
      orderedBooks: true,
    },
  })
}

const getByIdFromDB = async (id: string): Promise<Order | null> => {
  return await prisma.order.findFirst({
    where: { id },
    include: {
      orderedBooks: true,
    },
  })
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
