import { getOneUser } from '../user.service'
import { createResponse } from '../../utils/createResponse'
import { StatusCodes } from 'http-status-codes'
import { responseHandler } from '../../utils/responseHandler'
import { authGuard } from '../../common/guards/authGuard'
import { NextRequest } from 'next/server'
import { withGuards } from '../../utils/withGuards'
import { allowRoles } from '../../utils/allowRoles'

const handlerGET = async (req: NextRequest, context: { params: Promise<{ id: string }> }) => {
  // await authGuard(req)

  const { id } = await context.params
  const user = await getOneUser(id)

  return createResponse(StatusCodes.OK, user)
}

export const GET = responseHandler(
  withGuards(handlerGET, [authGuard, allowRoles('admin', 'manager')]),
)

// export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
//   try {
//     const { id } = await context.params
//     const user = await getOneUser(id)

//     return createResponse(StatusCodes.OK, user)
//   } catch (error) {
//     if (error instanceof NotFoundError) {
//       return createResponse(StatusCodes.NOT_FOUND, null, error.message)
//     }
//     return createResponse(StatusCodes.INTERNAL_SERVER_ERROR, null, error.message)
//   }
// }
