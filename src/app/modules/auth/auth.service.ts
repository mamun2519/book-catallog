import { User } from '@prisma/client'
import { prisma } from '../../../prisma/prisma'
import apiError from '../../../error/apiError'
import { StatusCodes } from 'http-status-codes'
import { generateToken } from '../../../shared/jwthelper'
import { env_config } from '../../../config'
import { Secret } from 'jsonwebtoken'

const userSingUpFromDB = async (data: User): Promise<User> => {
  const isExistUser = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  })
  if (isExistUser) {
    throw new apiError(StatusCodes.BAD_REQUEST, 'User Already exist')
  }

  return await prisma.user.create({
    data,
  })
}

const userSingInFromDB = async (data: Partial<User>): Promise<string> => {
  const isExistUser = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  })
  if (!isExistUser) {
    throw new apiError(StatusCodes.BAD_REQUEST, 'User Not Found')
  }
  if (isExistUser?.password !== data?.password) {
    throw new apiError(StatusCodes.BAD_REQUEST, 'Password In correct')
  }

  const token = generateToken(
    {
      userId: isExistUser?.id,
      role: isExistUser?.role,
    },
    env_config.token as Secret,
    env_config.expireDate as string,
  )

  return token
}

export const AuthService = {
  userSingUpFromDB,
  userSingInFromDB,
}
