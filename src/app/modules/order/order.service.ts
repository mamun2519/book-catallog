import { Order, OrderedBooks } from '@prisma/client'
import { prisma } from '../../../prisma/prisma'

import { JwtPayload } from 'jsonwebtoken'

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

const createOrder = async (payload: OrderedBooks[], id: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const orderCreate: any = await prisma.$transaction(async orderTransaction => {
    const order = await orderTransaction.order.create({
      data: {
        userId: id,
      },
    })

    for (let i = 0; i < payload.length; i++) {
      await orderTransaction.orderedBooks.create({
        data: {
          orderId: order.id,
          bookId: payload[i].bookId,
          quantity: payload[i].quantity,
        },
      })
    }
    return order
  })

  const result = await prisma.order.findMany({
    where: {
      id: orderCreate.id,
    },
    include: {
      orderedBooks: true,
    },
  })

  return result
}

const allOrders = async (user: JwtPayload) => {
  if (user.role === 'customer') {
    const result = await prisma.order.findMany({
      where: { userId: user.id },
    })
    return result
  } else {
    const result = user.role === 'admin' && (await prisma.order.findMany({}))
    return result
  }
}

const singleOrder = async (user: JwtPayload, id: string) => {
  if (user.role === 'customer') {
    const result = await prisma.order.findUnique({
      where: {
        userId: user.id,
        id,
      },
    })
    return result
  }
  const result = await prisma.order.findUnique({
    where: { id },
  })
  return result
}

export const OrderService = {
  updateIntoDB,
  deleteByIdFromDB,
  createOrder,
  allOrders,
  singleOrder,
}
