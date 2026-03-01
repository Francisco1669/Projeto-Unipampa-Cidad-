import Image from 'next/image'
import Link from 'next/link'
import { Dog } from '@/types/dog'

interface DogCardProps {
  dog: Dog
}

export default function DogCard({ dog }: DogCardProps) {
  return (
    <Link
      href={`/dog/${dog.id}`}
      className="group block bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-card-hover transition-hover hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={dog.image}
          alt={dog.name}
          fill
          className="object-cover group-hover:scale-105 transition-hover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-hover" />
        {dog.adopted && (
          <div className="absolute top-4 right-4 bg-accent-200 text-white px-3 py-1.5 text-xs font-semibold rounded-full shadow-medium">
            Adotado
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="headline-card group-hover:text-gray-700 transition-hover">
            {dog.name}
          </h3>
          <span className="text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full font-medium">
            {dog.city}
          </span>
        </div>

        <div className="flex gap-2 mb-4">
          <span className="text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
            {dog.age}
          </span>
          <span className="text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
            {dog.size}
          </span>
        </div>

        <div className="mb-3">
          <span className="inline-block text-sm font-medium text-accent-500 bg-accent-50 px-3 py-1 rounded-full">
            {dog.personality}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {dog.description}
        </p>
      </div>
    </Link>
  )
}
