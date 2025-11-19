import mongoose, { Schema, model, models, Document } from 'mongoose'
import type { HappyStory as HappyStoryType } from '@/types/dog'

export interface IHappyStory extends Omit<HappyStoryType, 'id'>, Document {
  _id: string
}

const HappyStorySchema = new Schema<IHappyStory>(
  {
    dogName: {
      type: String,
      required: [true, 'Nome do cão é obrigatório'],
      trim: true,
    },
    adopterName: {
      type: String,
      required: [true, 'Nome do adotante é obrigatório'],
      trim: true,
    },
    story: {
      type: String,
      required: [true, 'História é obrigatória'],
      minlength: [20, 'História deve ter pelo menos 20 caracteres'],
      maxlength: [2000, 'História deve ter no máximo 2000 caracteres'],
    },
    beforeImage: {
      type: String,
      required: [true, 'Imagem "antes" é obrigatória'],
      validate: {
        validator: function (v: string) {
          return /^https?:\/\/.+/.test(v)
        },
        message: 'URL da imagem inválida',
      },
    },
    afterImage: {
      type: String,
      required: [true, 'Imagem "depois" é obrigatória'],
      validate: {
        validator: function (v: string) {
          return /^https?:\/\/.+/.test(v)
        },
        message: 'URL da imagem inválida',
      },
    },
    date: {
      type: String,
      required: [true, 'Data é obrigatória'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret) {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        return ret
      },
    },
  }
)

// Índice para ordenação por data
HappyStorySchema.index({ date: -1 })

// Evitar recompilação do modelo em desenvolvimento
const HappyStory = models.HappyStory || model<IHappyStory>('HappyStory', HappyStorySchema)

export default HappyStory
