import { NextRequest } from 'next/server'
import { UnauthorizedError } from '../../library/errors'

// TODO
const decodeToken = async (token: string) => ({ name: 'Admin', roles: ['admin'] })

export async function authGuard(req: NextRequest) {
  const token = req.headers.get('authorization')

  // if (!token) {
  //   throw new UnauthorizedError('Authentication required')
  // }

  const user = await decodeToken(token)
  if (!user) {
    throw new UnauthorizedError('Invalid token')
  }

  ;(req as any).user = user
}
