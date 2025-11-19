import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connection'
import Dog from '@/models/Dog'

// GET /api/dogs - Listar todos os cães com filtros opcionais
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const size = searchParams.get('size')
    const age = searchParams.get('age')
    const city = searchParams.get('city')
    const search = searchParams.get('search')
    const adoptedOnly = searchParams.get('adopted')

    // Construir filtros
    const filter: Record<string, unknown> = {}

    if (size && size !== 'all') {
      filter.size = size
    }

    if (age && age !== 'all') {
      filter.age = age
    }

    if (city && city !== 'all') {
      filter.city = city
    }

    if (adoptedOnly !== null) {
      filter.adopted = adoptedOnly === 'true'
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { personality: { $regex: search, $options: 'i' } },
      ]
    }

    const dogs = await Dog.find(filter).sort({ createdAt: -1 }).lean()

    // Transformar _id para id
    const dogsFormatted = dogs.map((dog) => ({
      ...dog,
      id: dog._id.toString(),
      _id: undefined,
      __v: undefined,
    }))

    return NextResponse.json(dogsFormatted, { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar cães:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar cães' },
      { status: 500 }
    )
  }
}

// POST /api/dogs - Criar um novo cão
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()

    // Validar dados obrigatórios
    const requiredFields = ['name', 'age', 'size', 'personality', 'city', 'description', 'story', 'image']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Campo ${field} é obrigatório` },
          { status: 400 }
        )
      }
    }

    const dog = await Dog.create(body)

    return NextResponse.json(
      {
        ...dog.toJSON(),
        id: dog._id.toString(),
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erro ao criar cão:', error)

    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erro ao criar cão' },
      { status: 500 }
    )
  }
}
