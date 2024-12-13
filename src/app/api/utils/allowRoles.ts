import { NextRequest } from 'next/server'
import { roleGuard } from '../common/guards/roleGuard'

export function allowRoles(...roles: string[]) {
  return (req: NextRequest) => roleGuard(req, roles)
}
