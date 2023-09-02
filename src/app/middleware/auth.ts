import { NextFunction, Request, Response } from 'express'
import apiError from '../../error/apiError'
import { StatusCodes } from 'http-status-codes'
import { verifyToken } from '../../shared/jwthelper'
import { env_config } from '../../config'
import { Secret } from 'jsonwebtoken'
const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization
      if (!token) {
        throw new apiError(StatusCodes.UNAUTHORIZED, 'You are not authorized')
      }
      // verify token
      let verifiedUser = null

      verifiedUser = verifyToken(token, env_config.token as Secret)

      req.user = verifiedUser // role  , userid

      // role diye guard korar jnno
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new apiError(StatusCodes.FORBIDDEN, 'Forbidden')
      }
      next()
    } catch (error) {
      next(error)
    }
  }

export default auth
