import { NextRequest } from 'next/server'
import { ForbiddenError } from '../../library/errors'

export async function roleGuard(req: NextRequest, allowedRoles: string[]) {
  const user = (req as any).user

  if (!user || !user.roles) {
    throw new ForbiddenError('User roles not found')
  }

  const hasRole = allowedRoles.some((role) => user.roles.includes(role))
  if (!hasRole) {
    throw new ForbiddenError(
      `Access denied. Requires one of the following roles: ${allowedRoles.join(', ')}`,
    )
  }
}
