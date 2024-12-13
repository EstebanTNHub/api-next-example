import mongoose, { Schema, Document, Model } from 'mongoose'
import validator from 'mongoose-validator'

export interface UserDocument extends Document {
  _id: string
  email: string
  password: string
  name: string
}

const UserSchema: Schema<UserDocument> = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email is invalid'],
      validate: validator({
        validator: 'isEmail',
        message: 'Invalid email format',
      }),
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
  },
  {
    timestamps: true,
  },
)

const User: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema)
export default User
