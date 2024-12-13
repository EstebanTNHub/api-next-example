type Guard = (req: Request, context: any) => Promise<void>

export const withGuards = (
  handler: (req: Request, context: any) => Promise<Response>,
  guards: Guard[],
) => {
  return async (req: Request, context: any) => {
    for (const guard of guards) {
      await guard(req, context)
    }
    return await handler(req, context)
  }
}
