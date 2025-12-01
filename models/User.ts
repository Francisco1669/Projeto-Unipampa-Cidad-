import mongoose, { Schema, model, models, Document } from 'mongoose'

export type UserRole = 'admin' | 'moderator' | 'viewer'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email é obrigatório'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Senha é obrigatória'],
      minlength: [6, 'Senha deve ter no mínimo 6 caracteres'],
    },
    role: {
      type: String,
      enum: ['admin', 'moderator', 'viewer'],
      default: 'viewer',
    },
  },
  {
    timestamps: true,
  }
)

// Índices
// UserSchema.index({ email: 1 })

const User = models.User || model<IUser>('User', UserSchema)

export default User