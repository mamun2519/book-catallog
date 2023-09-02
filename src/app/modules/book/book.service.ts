/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book, Prisma } from '@prisma/client'
import { prisma } from '../../../prisma/prisma'
import { IBookFilterRequest } from './book.interface'
import { IPaginationOptions } from '../../../interface/paginationOptions'
import calculatePagination from '../../../shared/calulatePaginatio'
import {
  BookRelationalFields,
  BookRelationalFieldsMapper,
  bookSearchableFiled,
} from './book.constant'
import { IGenericResponse } from '../../../interface/common'

const insertIntoDB = async (data: Book): Promise<Book> => {
  return await prisma.book.create({ data, include: { category: true } })
}

const getAllFromDB = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Book[]>> => {
  const { page, skip, limit } = calculatePagination(options)
  const { search, ...filterData }: any = filters

  const andConditions = []
  if (search) {
    andConditions.push({
      OR: bookSearchableFiled.map(filed => ({
        [filed]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    })
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (['maxPrice'].includes(key)) {
          return {
            ['price']: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              gt: Number((filterData as any)[key]),
            },
          }
        } else if (['minPrice'].includes(key)) {
          return {
            ['price']: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              lt: Number((filterData as any)[key]),
            },
          }
        } else if (BookRelationalFields.includes(key)) {
          return {
            [BookRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          }
        } else {
          return {
            [key]: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              equals: (filterData as any)[key],
            },
          }
        }
      }),
    })
  }
  const whereCondition: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}
  const result = await prisma.book.findMany({
    skip,
    take: limit,
    where: whereCondition,
    include: {
      category: true,
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {},
  })
  const total = await prisma.book.count({
    where: whereCondition,
  })

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getAllByCategoryIdFromDB = async (
  id: string,
  options: IPaginationOptions,
): Promise<IGenericResponse<Book[]>> => {
  const { page, skip, limit } = calculatePagination(options)
  const result = await prisma.book.findMany({
    skip,
    take: limit,
    where: {
      categoryId: id,
    },
  })
  const total = await prisma.book.count()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
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
  getAllByCategoryIdFromDB,
}
