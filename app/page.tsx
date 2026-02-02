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
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="section-spacing">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="headline-hero mb-6 text-balance">
            Encontre seu novo melhor amigo
          </h1>
          <p className="subtitle-hero max-w-2xl mx-auto text-balance">
            Cada um desses cães tem uma história e está esperando por uma família. 
            Dê uma chance para eles e descubra o amor incondicional que só um cão pode oferecer.
          </p>
        </div>
      </section>

      {/* Dogs Grid */}
      <section className="pb-16">
        <DogGrid initialDogs={dogsFormatted} cities={cities} />
      </section>
    </div>
  )
}
