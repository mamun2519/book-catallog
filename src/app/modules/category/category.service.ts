import { Category } from '@prisma/client'
import { prisma } from '../../../prisma/prisma'

const insertIntoDB = async (data: Category): Promise<Category> => {
  return await prisma.category.create({ data })
}

const getAllFromDB = async (): Promise<Category[]> => {
  return await prisma.category.findMany({
    include: {
      books: true,
    },
  })
}

const getByIdFromDB = async (id: string): Promise<Category | null> => {
  return await prisma.category.findFirst({
    where: { id },
    include: {
      books: true,
    },
  })
}

const updateIntoDB = async (
  id: string,
  payload: Partial<Category>,
): Promise<Category | null> => {
  return await prisma.category.update({
    where: {
      id,
    },
    include: {
      books: true,
    },
    data: payload,
  })
}

const deleteByIdFromDB = async (id: string): Promise<Category | null> => {
  return await prisma.category.delete({
    where: { id },
    include: {
      books: true,
    },
  })
}

export const CategoryService = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteByIdFromDB,
  insertIntoDB,
}
