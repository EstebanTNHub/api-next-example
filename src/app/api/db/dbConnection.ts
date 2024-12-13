import mongoose, { Mongoose } from 'mongoose'
import logger from '../library/logger'

const { MONGODB_URI } = process.env

interface MongooseCache {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}

declare global {
  var mongoose: MongooseCache | undefined
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null }

if (process.env.NODE_ENV === 'development') {
  global.mongoose = cached
}

export const connectDB = async (): Promise<Mongoose> => {
  if (cached.conn && cached.conn.connection.readyState === 1) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongooseInstance) => {
        return mongooseInstance
      })
      .catch((error) => {
        logger.error(`Error in DB connection: ${error.message}`)
        throw error
      })
  }

  cached.conn = await cached.promise
  return cached.conn
}
