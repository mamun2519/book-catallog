import { User } from '@prisma/client'
import { prisma } from '../../../prisma/prisma'

const getAllFromDB = async (): Promise<User[]> => {
  return await prisma.user.findMany({})
}

const getByIdFromDB = async (id: string): Promise<User | null> => {
  return await prisma.user.findFirst({
    where: { id },
  })
}

const updateIntoDB = async (
  id: string,
  payload: Partial<User>,
): Promise<User | null> => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  })
}

const deleteByIdFromDB = async (id: string): Promise<User | null> => {
  return await prisma.user.delete({
    where: { id },
  })
}

export const UserService = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteByIdFromDB,
}
