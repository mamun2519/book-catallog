import { User } from '@prisma/client'
import { prisma } from '../../../prisma/prisma'
import { IDecodedToken } from '../../../interface/tokenUser'
import { JwtPayload } from 'jsonwebtoken'

const getMyProfileFromDB = async (
  user: IDecodedToken | JwtPayload | null,
): Promise<User | null> => {
  return prisma.user.findFirst({
    where: {
      id: user?.userId,
    },
  })
}

export const ProfileService = {
  getMyProfileFromDB,
}
