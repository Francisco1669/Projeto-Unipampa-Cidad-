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
    <div className="container mx-auto px-4">
      <section className="section-spacing">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="headline-hero mb-6">
            Histórias Felizes
          </h1>
          <p className="subtitle-hero max-w-2xl mx-auto">
            Histórias reais de cães que encontraram um lar cheio de amor. 
            Cada uma dessas histórias prova que a adoção transforma vidas.
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-6xl mx-auto space-y-20">
          {stories.map((story) => (
            <article
              key={story.id}
              className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-soft"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
                      Antes
                    </span>
                    <div className="relative aspect-square rounded-lg overflow-hidden shadow-medium">
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

                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
                      Depois
                    </span>
                    <div className="relative aspect-square rounded-lg overflow-hidden shadow-medium">
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

              <div className="px-10 pb-10">
                <div className="mb-6">
                  <h2 className="headline-card mb-2">{story.dogName}</h2>
                  <p className="text-gray-600 font-medium mb-1">
                    Adotado por <span className="text-black">{story.adopterName}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(story.date).toLocaleDateString('pt-BR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                <div className="bg-gray-50 border-l-4 border-accent-200 rounded-lg p-8">
                  <p className="text-gray-700 leading-relaxed text-lg italic">
                    &ldquo;{story.story}&rdquo;
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-accent-200 text-white rounded-lg p-12 text-center shadow-large">
            <h2 className="headline-section text-white mb-4">
              Sua história pode ser a próxima!
            </h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Há muitos cães esperando por uma família. Que tal fazer a diferença na vida de um deles?
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-accent-500 py-4 px-10 rounded-lg font-semibold hover:bg-gray-50 transition-hover shadow-medium"
            >
              Ver cães disponíveis
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
