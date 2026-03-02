import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connection'
import DonationConfig from '@/models/DonationConfig'

const CONFIG_ID = 'donation-config'

const defaultConfig = {
  id: CONFIG_ID,
  pixKey: '',
  pixCopiaECola: '',
  pixQrCodeUrl: '',
  itemsNeeded: [] as string[],
  deliveryInfo: '',
  deliveryAddress: '',
}

// GET /api/donation-config - Retorna config (público)
export async function GET() {
  try {
    await connectDB()

    const config = await DonationConfig.findById(CONFIG_ID).lean()

    if (!config) {
      return NextResponse.json(defaultConfig, { status: 200 })
    }

    const formatted = {
      id: config._id,
      pixKey: config.pixKey ?? '',
      pixCopiaECola: config.pixCopiaECola ?? '',
      pixQrCodeUrl: config.pixQrCodeUrl ?? '',
      itemsNeeded: config.itemsNeeded ?? [],
      deliveryInfo: config.deliveryInfo ?? '',
      deliveryAddress: config.deliveryAddress ?? '',
    }

    return NextResponse.json(formatted, { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar donation config:', error)
    return NextResponse.json(defaultConfig, { status: 200 })
  }
}

// PUT /api/donation-config - Atualiza config (admin)
export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()

    const update = {
      pixKey: body.pixKey ?? '',
      pixCopiaECola: body.pixCopiaECola ?? '',
      pixQrCodeUrl: body.pixQrCodeUrl ?? '',
      itemsNeeded: Array.isArray(body.itemsNeeded) ? body.itemsNeeded : [],
      deliveryInfo: body.deliveryInfo ?? '',
      deliveryAddress: body.deliveryAddress ?? '',
    }

    const config = await DonationConfig.findByIdAndUpdate(
      CONFIG_ID,
      { $set: update },
      { new: true, upsert: true }
    ).lean()

    const formatted = {
      id: config._id,
      pixKey: config.pixKey ?? '',
      pixCopiaECola: config.pixCopiaECola ?? '',
      pixQrCodeUrl: config.pixQrCodeUrl ?? '',
      itemsNeeded: config.itemsNeeded ?? [],
      deliveryInfo: config.deliveryInfo ?? '',
      deliveryAddress: config.deliveryAddress ?? '',
    }

    return NextResponse.json(formatted, { status: 200 })
  } catch (error) {
    console.error('Erro ao atualizar donation config:', error)
    return NextResponse.json(
      { error: 'Erro ao salvar configuração de doações' },
      { status: 500 }
    )
  }
}
