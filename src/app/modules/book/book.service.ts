import { Book } from '@prisma/client'
import { prisma } from '../../../prisma/prisma'

const insertIntoDB = async (data: Book): Promise<Book> => {
  return await prisma.book.create({ data, include: { category: true } })
}

const getAllFromDB = async (): Promise<Book[]> => {
  return await prisma.book.findMany({
    include: {
      category: true,
    },
  })
}

const getByIdFromDB = async (id: string): Promise<Book | null> => {
  return await prisma.book.findFirst({
    where: { id },
    include: {
      category: true,
    },
  })
}

const updateIntoDB = async (
  id: string,
  payload: Partial<Book>,
): Promise<Book | null> => {
  return await prisma.book.update({
    where: {
      id,
    },
    include: {
      category: true,
    },
    data: payload,
  })
}

const deleteByIdFromDB = async (id: string): Promise<Book | null> => {
  return await prisma.book.delete({
    where: { id },
    include: {
      category: true,
    },
  })
}

export const BookService = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteByIdFromDB,
  insertIntoDB,
}
