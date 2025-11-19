import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connection'
import Dog from '@/models/Dog'
import mongoose from 'mongoose'

// GET /api/dogs/[id] - Buscar cão por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    // Validar ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      )
    }

    const dog = await Dog.findById(id).lean()

    if (!dog) {
      return NextResponse.json(
        { error: 'Cão não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      ...dog,
      id: dog._id.toString(),
      _id: undefined,
      __v: undefined,
    })
  } catch (error) {
    console.error('Erro ao buscar cão:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar cão' },
      { status: 500 }
    )
  }
}

// PUT /api/dogs/[id] - Atualizar cão
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params
    const body = await request.json()

    // Validar ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      )
    }

    const dog = await Dog.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    )

    if (!dog) {
      return NextResponse.json(
        { error: 'Cão não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      ...dog.toJSON(),
      id: dog._id.toString(),
    })
  } catch (error) {
    console.error('Erro ao atualizar cão:', error)

    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erro ao atualizar cão' },
      { status: 500 }
    )
  }
}

// DELETE /api/dogs/[id] - Deletar cão
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    // Validar ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      )
    }

    const dog = await Dog.findByIdAndDelete(id)

    if (!dog) {
      return NextResponse.json(
        { error: 'Cão não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'Cão deletado com sucesso' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao deletar cão:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar cão' },
      { status: 500 }
    )
  }
}
