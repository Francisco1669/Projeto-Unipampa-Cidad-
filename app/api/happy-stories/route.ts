import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connection'
import HappyStory from '@/models/HappyStory'

// GET /api/happy-stories - Listar todas as histórias felizes
export async function GET() {
  try {
    await connectDB()

    const stories = await HappyStory.find({})
      .sort({ date: -1 })
      .lean()

    // Transformar _id para id
    const storiesFormatted = stories.map((story) => ({
      ...story,
      id: story._id.toString(),
      _id: undefined,
      __v: undefined,
    }))

    return NextResponse.json(storiesFormatted, { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar histórias:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar histórias felizes' },
      { status: 500 }
    )
  }
}

// POST /api/happy-stories - Criar nova história feliz
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()

    // Validar dados obrigatórios
    const requiredFields = ['dogName', 'adopterName', 'story', 'beforeImage', 'afterImage', 'date']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Campo ${field} é obrigatório` },
          { status: 400 }
        )
      }
    }

    const story = await HappyStory.create(body)

    return NextResponse.json(
      {
        ...story.toJSON(),
        id: story._id.toString(),
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erro ao criar história:', error)

    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erro ao criar história feliz' },
      { status: 500 }
    )
  }
}
