import { NextResponse } from 'next/server'

export const createResponse = (
  status: number,
  data: any = null,
  error: string | null = null,
  metadata: Record<string, any> = {},
) => {
  return NextResponse.json(
    {
      status,
      data,
      error,
      metadata,
    },
    { status },
  )
}
