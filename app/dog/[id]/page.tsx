import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import connectDB from '@/lib/mongodb/connection'
import Dog from '@/models/Dog'
import mongoose from 'mongoose'

export const revalidate = 60

export async function generateStaticParams() {
  await connectDB()
  const dogs = await Dog.find({}).select('_id').lean()

  return dogs.map((dog) => ({
    id: dog._id.toString(),
  }))
}

export default async function DogPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // Validar se é um ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound()
  }

  await connectDB()
  const dogData = await Dog.findById(id).lean()

  if (!dogData) {
    notFound()
  }

  const dog = {
    ...dogData,
    id: dogData._id.toString(),
    _id: undefined,
    __v: undefined,
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center text-gray-600 hover:text-black transition-colors mb-8"
      >
        <ChevronLeft className="w-5 h-5 mr-2" />
        Voltar para todos os cães
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl">
        <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50">
          <Image
            src={dog.image}
            alt={dog.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2">{dog.name}</h1>
            <div className="flex gap-2 text-sm text-gray-600">
              <span className="bg-gray-50 px-3 py-1 rounded">{dog.age}</span>
              <span className="bg-gray-50 px-3 py-1 rounded">{dog.size}</span>
              <span className="bg-gray-50 px-3 py-1 rounded">{dog.city}</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
              Personalidade
            </h2>
            <p className="text-xl font-medium">{dog.personality}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
              Sobre mim
            </h2>
            <p className="text-gray-700 leading-relaxed">{dog.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
              Minha história
            </h2>
            <p className="text-gray-700 leading-relaxed">{dog.story}</p>
          </div>

          {!dog.adopted ? (
            <Link
              href={`/adotar/${dog.id}`}
              className="w-full bg-black text-white py-4 px-8 rounded-lg font-medium text-center hover:bg-gray-800 transition-colors"
            >
              Quero Adotar {dog.name}
            </Link>
          ) : (
            <div className="w-full bg-gray-100 text-gray-600 py-4 px-8 rounded-lg font-medium text-center">
              Este cão já foi adotado
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
