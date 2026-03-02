import DogGrid from '@/components/DogGrid'
import connectDB from '@/lib/mongodb/connection'
import Dog from '@/models/Dog'
import { getAllDogs } from '@/lib/dogs'

export const revalidate = 60 // Revalidar a cada 60 segundos

export default async function Home() {
  let dogsFormatted: Array<Record<string, unknown>> = []
  let cities: string[] = []

  try {
    await connectDB()
    const dogs = await Dog.find({ adopted: false })
      .sort({ createdAt: -1 })
      .lean()

    dogsFormatted = dogs.map((dog) => ({
      ...dog,
      _id: dog._id.toString(),
      id: dog._id.toString(),
      __v: undefined,
    }))
    cities = Array.from(new Set(dogsFormatted.map((d) => d.city as string))).sort()
  } catch {
    // MongoDB indisponível: usar dados mockados
    const mockDogs = getAllDogs().filter((d) => !d.adopted)
    dogsFormatted = mockDogs.map((d) => ({
      ...d,
      _id: d.id,
      id: d.id,
    }))
    cities = Array.from(new Set(mockDogs.map((d) => d.city))).sort()
  }

  return (
    <>
      {/* Hero com fundo em gradiente */}
      <div className="relative bg-gradient-to-br from-accent-50/60 via-white to-accent-50/40 overflow-hidden">
        <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 md:mb-6 tracking-tight bg-gradient-to-r from-gray-900 via-accent-400 to-accent-500 bg-clip-text text-transparent px-3 pb-1">
              Encontre seu novo melhor amigo
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto px-2">
              Cada um desses cães tem uma história e está esperando por uma família. 
              Dê uma chance para eles e descubra o amor incondicional que só um cão pode oferecer.
            </p>
          </div>
        </div>
      </div>

      {/* Grid de Cães */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <DogGrid initialDogs={dogsFormatted} cities={cities} />
      </div>
    </>
  )
}
