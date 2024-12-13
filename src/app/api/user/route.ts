import { createUser, getAllUsers } from './user.service'
import { createResponse } from '../utils/createResponse'
import { StatusCodes } from 'http-status-codes'
import { ValidationError } from '../library/errors'
import { ZodError } from 'zod'
import { responseHandler } from '../utils/responseHandler'
import CreateUserDto from '../common/dto/user.createUser.dto'

const handlerGET = async () => {
  const users = await getAllUsers()

  return createResponse(StatusCodes.OK, users)
}

export const GET = responseHandler(handlerGET)

const handlerPOST = async (req: Request) => {
  try {
    const body = await req.json()

    const validatedBody = CreateUserDto.parse(body)

    const newUser = await createUser(validatedBody)

    return createResponse(StatusCodes.CREATED, newUser)
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError(error)
    }
    throw error
  }
}

export const POST = responseHandler(handlerPOST)

// export async function POST(req: Request) {
//   try {
//     const body = await req.json()

//     const validatedBody = CreateUserDto.parse(body)

//     const newUser = await createUser(validatedBody)

//     return createResponse(StatusCodes.CREATED, newUser)
//   } catch (error) {
//     if (error instanceof ZodError) {
//       const formattedErrors = error.errors.map((err) => ({
//         field: err.path.join('.'),
//         message: err.message,
//       }))
//       return createResponse(StatusCodes.BAD_REQUEST, null, 'Invalid Params', formattedErrors)
//     }

//     if (error instanceof DuplicatedKeyError) {
//       return createResponse(StatusCodes.BAD_REQUEST, null, error.message)
//     }

//     return createResponse(StatusCodes.INTERNAL_SERVER_ERROR, null, error.message)
//   }
// }
