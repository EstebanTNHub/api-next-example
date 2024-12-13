import { z } from 'zod'

export const CreateUserDto = z
  .object({
    name: z.string().min(3, 'The name must be at least 3 characters.'),
    password: z.string().min(6, 'The name must be at least 6 characters.'),
    email: z.string().email('Must be a valid email.'),
  })
  //   .strict() // Additional parameters are not allowed
  .strip() // Additional parameters will be removed

export type CreateUserDtoType = z.infer<typeof CreateUserDto>

export default CreateUserDto
