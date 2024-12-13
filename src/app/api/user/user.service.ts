import { StatusCodes } from 'http-status-codes'
import { connectDB } from '../db/dbConnection'
import User, { UserDocument } from '../db/entities/user.entity'
import logger from '../library/logger'
import * as bcrypt from 'bcrypt'
import { DuplicatedKeyError, NotFoundError } from '../library/errors'

export async function getAllUsers(): Promise<UserDocument[]> {
  try {
    await connectDB()
    const userList = await User.find().select('-password')

    return userList
  } catch (error) {
    logger.error(`Error getting user list: ${error.message}`)
    throw new Error('Error getting user list')
  }
}

export async function getOneUser(id: string): Promise<UserDocument> {
  try {
    await connectDB()
    const user = await User.findById(id).select('-password')

    if (!user) {
      throw new NotFoundError('User not found')
    }

    return user
  } catch (error) {
    logger.error(`Error getting the user: ${error.message}`)
    throw error
  }
}

export async function createUser(body: Partial<UserDocument>): Promise<UserDocument> {
  try {
    const { email, password, name } = body

    await connectDB()
    const userFound = await User.findOne({ email })
    if (userFound) {
      throw new DuplicatedKeyError('Email already exist')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      name,
      email,
      password: hashedPassword,
    })

    return await user.save()
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`)
    throw error
  }
}
