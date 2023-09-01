import { Prisma } from '@prisma/client'
import { IErrorMessage, IErrorResponse } from '../interface/error'

const handleValidationError = (
  error: Prisma.PrismaClientValidationError,
): IErrorResponse => {
  const statusCode = 400
  const errors: IErrorMessage[] = [
    {
      path: '',
      message: error.message,
    },
  ]

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleValidationError
