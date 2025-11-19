import mongoose, { Schema, model, models, Document } from 'mongoose'
import type { Dog as DogType } from '@/types/dog'

export interface IDog extends Omit<DogType, 'id'>, Document {
  _id: string
}

const DogSchema = new Schema<IDog>(
  {
    name: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      trim: true,
      minlength: [2, 'Nome deve ter pelo menos 2 caracteres'],
      maxlength: [50, 'Nome deve ter no máximo 50 caracteres'],
    },
    age: {
      type: String,
      required: [true, 'Idade é obrigatória'],
      enum: {
        values: ['Filhote', 'Adulto', 'Idoso'],
        message: 'Idade deve ser Filhote, Adulto ou Idoso',
      },
    },
    size: {
      type: String,
      required: [true, 'Porte é obrigatório'],
      enum: {
        values: ['Pequeno', 'Médio', 'Grande'],
        message: 'Porte deve ser Pequeno, Médio ou Grande',
      },
    },
    personality: {
      type: String,
      required: [true, 'Personalidade é obrigatória'],
      enum: {
        values: [
          'Brincalhão',
          'Calmo',
          'Energético',
          'Carinhoso',
          'Independente',
          'Protetor',
          'Sociável',
          'Tímido',
        ],
        message: 'Personalidade inválida',
      },
    },
    city: {
      type: String,
      required: [true, 'Cidade é obrigatória'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Descrição é obrigatória'],
      minlength: [10, 'Descrição deve ter pelo menos 10 caracteres'],
      maxlength: [500, 'Descrição deve ter no máximo 500 caracteres'],
    },
    story: {
      type: String,
      required: [true, 'História é obrigatória'],
      minlength: [20, 'História deve ter pelo menos 20 caracteres'],
      maxlength: [2000, 'História deve ter no máximo 2000 caracteres'],
    },
    image: {
      type: String,
      required: [true, 'Imagem é obrigatória'],
      validate: {
        validator: function (v: string) {
          return /^https?:\/\/.+/.test(v)
        },
        message: 'URL da imagem inválida',
      },
    },
    adopted: {
      type: Boolean,
      default: false,
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

// Índices para melhor performance
DogSchema.index({ adopted: 1 })
DogSchema.index({ city: 1 })
DogSchema.index({ size: 1 })
DogSchema.index({ age: 1 })
DogSchema.index({ name: 'text', description: 'text' })

// Evitar recompilação do modelo em desenvolvimento
const Dog = models.Dog || model<IDog>('Dog', DogSchema)

export default Dog
