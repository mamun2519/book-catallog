import { Order } from '@prisma/client'
import { prisma } from '../../../prisma/prisma'

const insertIntoDB = async (data: Order): Promise<Order> => {
  return await prisma.order.create({ data })
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
