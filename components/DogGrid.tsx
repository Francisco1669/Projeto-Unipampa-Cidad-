'use client'

import { useState, useMemo } from 'react'
import DogCard from '@/components/DogCard'
import DogFilters from '@/components/DogFilters'
import type { Dog } from '@/types/dog'

interface DogGridProps {
  initialDogs: Dog[]
  cities: string[]
}

export default function DogGrid({ initialDogs, cities }: DogGridProps) {
  const [filters, setFilters] = useState({
    size: 'all',
    age: 'all',
    city: 'all',
    search: '',
  })

  const filteredDogs = useMemo(() => {
    let filtered = initialDogs

    if (filters.size && filters.size !== 'all') {
      filtered = filtered.filter((dog) => dog.size === filters.size)
    }

    if (filters.age && filters.age !== 'all') {
      filtered = filtered.filter((dog) => dog.age === filters.age)
    }

    if (filters.city && filters.city !== 'all') {
      filtered = filtered.filter((dog) => dog.city === filters.city)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (dog) =>
          dog.name.toLowerCase().includes(searchLower) ||
          dog.description.toLowerCase().includes(searchLower) ||
          dog.personality.toLowerCase().includes(searchLower)
      )
    }

    return filtered
  }, [initialDogs, filters])

  return (
    <>
      <DogFilters cities={cities} onFilterChange={setFilters} />

      {filteredDogs.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            Nenhum cão encontrado com esses filtros. Tente ajustar sua busca!
          </p>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            {filteredDogs.length}{' '}
            {filteredDogs.length === 1 ? 'cão encontrado' : 'cães encontrados'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDogs.map((dog) => (
              <DogCard key={dog.id} dog={dog} />
            ))}
          </div>
        </>
      )}
    </>
  )
}
