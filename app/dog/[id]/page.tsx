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
        className="inline-flex items-center text-gray-600 hover:text-black transition-hover mb-12 group"
      >
        <ChevronLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-hover" />
        <span className="text-sm font-medium">Voltar para todos os cães</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl">
        <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 shadow-medium">
          <Image
            src={dog.image}
            alt={dog.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h1 className="headline-section mb-4">{dog.name}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full font-medium">
                {dog.age}
              </span>
              <span className="text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full font-medium">
                {dog.size}
              </span>
              <span className="text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full font-medium">
                {dog.city}
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Personalidade
            </h2>
            <p className="text-xl font-semibold text-accent-500 bg-accent-50 inline-block px-4 py-2 rounded-full">
              {dog.personality}
            </p>
          </div>

          <div className="prose-width">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Sobre mim
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">{dog.description}</p>
          </div>

          <div className="prose-width">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Minha história
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">{dog.story}</p>
          </div>

          <div className="pt-4">
            {!dog.adopted ? (
              <Link
                href={`/adotar/${dog.id}`}
                className="w-full bg-accent-200 text-white py-4 px-8 rounded-lg font-semibold text-center hover:bg-accent-300 transition-hover shadow-medium hover:shadow-large inline-block"
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
    </div>
  )
}
