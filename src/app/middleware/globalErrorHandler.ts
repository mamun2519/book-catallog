/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { env_config } from '../../config'
import { IErrorMessage } from '../../interface/error'
import apiError from '../../error/apiError'
import { Prisma } from '@prisma/client'
import handleValidationError from '../../error/validationError'
import handleClientRequestError from '../../error/clientRequsetError'
import { ZodError } from 'zod'
import handleZodValidationError from '../../error/zodValidationError'

const globalErrorHandler: ErrorRequestHandler = (
  error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  _next: NextFunction,
) => {
  env_config.env === 'development'
    ? console.log('Global Error-----', { error })
    : console.log('Global Error---', { error })
  let statusCode = 500
  let message = 'Something is wrong'
  let errorMessages: IErrorMessage[] = []

  if (error instanceof apiError) {
    statusCode = error.statusCode
    message = error.message
    errorMessages = error.message ? [{ path: '', message: error.message }] : []
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    const findingError = handleValidationError(error)
    statusCode = findingError.statusCode
    message = findingError.message
    errorMessages = findingError.errorMessages
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const findingError = handleClientRequestError(error)
    statusCode = findingError.statusCode
    message = findingError.message
    errorMessages = findingError.errorMessages
  } else if (error instanceof ZodError) {
    const findingError = handleZodValidationError(error)
    statusCode = findingError.statusCode
    message = findingError.message
    errorMessages = findingError.errorMessages
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: env_config.env !== 'production' ? error.stack : undefined,
  })
}

export default globalErrorHandler
