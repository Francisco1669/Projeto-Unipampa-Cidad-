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
      className="group block bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={dog.image}
          alt={dog.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {dog.adopted && (
          <div className="absolute top-3 right-3 bg-black text-white px-3 py-1 text-xs font-medium rounded">
            Adotado
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold group-hover:text-gray-700 transition-colors">
            {dog.name}
          </h3>
          <span className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">
            {dog.city}
          </span>
        </div>

        <div className="flex gap-2 mb-3 text-sm text-gray-600">
          <span className="bg-gray-50 px-2 py-1 rounded">{dog.age}</span>
          <span className="bg-gray-50 px-2 py-1 rounded">{dog.size}</span>
        </div>

        <p className="text-gray-700 font-medium mb-2 text-sm">{dog.personality}</p>
        <p className="text-gray-600 text-sm line-clamp-2">{dog.description}</p>
      </div>
    </Link>
  )
}
