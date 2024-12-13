import { ZodError } from 'zod'

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}

export class DuplicatedKeyError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DuplicatedKeyError'
  }
}

export class ValidationError extends Error {
  public errors: Record<string, string>

  constructor(zodError: ZodError) {
    super('Validation Error')
    this.name = 'ValidationError'

    this.errors = zodError.errors.reduce((acc, err) => {
      const field = err.path.join('.')
      acc[field] = err.message
      return acc
    }, {} as Record<string, string>)
  }
}
