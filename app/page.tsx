import DogGrid from '@/components/DogGrid'
import connectDB from '@/lib/mongodb/connection'
import Dog from '@/models/Dog'

export const revalidate = 60 // Revalidar a cada 60 segundos

export default async function Home() {
  await connectDB()

  const dogs = await Dog.find({ adopted: false })
    .sort({ createdAt: -1 })
    .lean()

  const dogsFormatted = dogs.map((dog) => ({
    ...dog,
    _id: dog._id.toString(),
    id: dog._id.toString(),
    __v: undefined,
  }))

  // Extrair cidades únicas
  const cities = Array.from(new Set(dogsFormatted.map((dog) => dog.city))).sort()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">
          Encontre seu novo melhor amigo
        </h1>
        <p className="text-gray-600 text-lg">
          Todos esses cães estão esperando por uma família. Dê uma chance para eles!
        </p>
      </div>

      <DogGrid initialDogs={dogsFormatted} cities={cities} />
    </div>
  )
}
