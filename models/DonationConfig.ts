import mongoose, { Schema, model, models, Document } from 'mongoose'

export interface IDonationConfig extends Document {
  _id: string
  pixKey: string
  pixCopiaECola?: string
  pixQrCodeUrl?: string
  itemsNeeded: string[]
  deliveryInfo: string
  deliveryAddress?: string
}

const DonationConfigSchema = new Schema<IDonationConfig>(
  {
    _id: {
      type: String,
      default: 'donation-config',
    },
    pixKey: {
      type: String,
      default: '',
      trim: true,
    },
    pixCopiaECola: {
      type: String,
      default: '',
      trim: true,
    },
    pixQrCodeUrl: {
      type: String,
      default: '',
      trim: true,
    },
    itemsNeeded: {
      type: [String],
      default: [],
    },
    deliveryInfo: {
      type: String,
      default: '',
      trim: true,
    },
    deliveryAddress: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret) {
        ret.id = ret._id
        delete ret.__v
        return ret
      },
    },
  }
)

const DonationConfig =
  models.DonationConfig || model<IDonationConfig>('DonationConfig', DonationConfigSchema)

export default DonationConfig
