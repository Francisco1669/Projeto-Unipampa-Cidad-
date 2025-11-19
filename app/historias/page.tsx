import Image from 'next/image'
import Link from 'next/link'
import connectDB from '@/lib/mongodb/connection'
import HappyStory from '@/models/HappyStory'

export const revalidate = 60

export default async function HappyStoriesPage() {
  await connectDB()

  const storiesData = await HappyStory.find({})
    .sort({ date: -1 })
    .lean()

  const stories = storiesData.map((story) => ({
    ...story,
    id: story._id.toString(),
    _id: undefined,
    __v: undefined,
  }))

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">
          Histórias Felizes
        </h1>
        <p className="text-gray-600 text-lg">
          Histórias reais de cães que encontraram um lar cheio de amor
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-12">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-gray-50 border border-gray-100 rounded-lg overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    Antes
                  </span>
                  <div className="relative aspect-square rounded-lg overflow-hidden mt-2">
                    <Image
                      src={story.beforeImage}
                      alt={`${story.dogName} antes da adoção`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    Depois
                  </span>
                  <div className="relative aspect-square rounded-lg overflow-hidden mt-2">
                    <Image
                      src={story.afterImage}
                      alt={`${story.dogName} depois da adoção`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 pb-8">
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-1">{story.dogName}</h2>
                <p className="text-gray-600">
                  Adotado por <strong>{story.adopterName}</strong>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(story.date).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>

              <div className="bg-white border border-gray-100 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed italic">
                  &ldquo;{story.story}&rdquo;
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto mt-16 text-center">
        <div className="bg-black text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-3">
            Sua história pode ser a próxima!
          </h2>
          <p className="text-gray-300 mb-6">
            Há muitos cães esperando por uma família. Que tal fazer a diferença na vida de um deles?
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-black py-3 px-8 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Ver cães disponíveis
          </Link>
        </div>
      </div>
    </div>
  )
}
