import { createResponse } from './createResponse'
import { StatusCodes } from 'http-status-codes'
import {
  DuplicatedKeyError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from '../library/errors'

export const responseHandler = (handler: (req: Request, context: any) => Promise<Response>) => {
  return async (req: Request, context: any) => {
    try {
      return await handler(req, context)
    } catch (error) {
      if (error instanceof ValidationError) {
        return createResponse(StatusCodes.BAD_REQUEST, null, error.message, error.errors)
      }
      if (error instanceof UnauthorizedError) {
        return createResponse(StatusCodes.UNAUTHORIZED, null, error.message)
      }
      if (error instanceof NotFoundError) {
        return createResponse(StatusCodes.NOT_FOUND, null, error.message)
      }
      if (error instanceof DuplicatedKeyError) {
        return createResponse(StatusCodes.BAD_REQUEST, null, error.message)
      }
      return createResponse(StatusCodes.INTERNAL_SERVER_ERROR, null, error.message)
    }
  }
}

// export const responseHandler = (handler: Function) => async (req: Request) => {
//   try {
//     return await handler(req)
//   } catch (error) {
//     if (error instanceof ValidationError) {
//       return createResponse(StatusCodes.BAD_REQUEST, null, error.message, error.errors)
//     }
//     if (error instanceof NotFoundError) {
//       return createResponse(StatusCodes.NOT_FOUND, null, error.message)
//     }
//     if (error instanceof DuplicatedKeyError) {
//       return createResponse(StatusCodes.BAD_REQUEST, null, error.message)
//     }
//     return createResponse(StatusCodes.INTERNAL_SERVER_ERROR, null, error.message)
//   }
// }
