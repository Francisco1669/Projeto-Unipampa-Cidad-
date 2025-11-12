'use client'

import { useState, useMemo } from 'react'
import DogCard from '@/components/DogCard'
import DogFilters from '@/components/DogFilters'
import { getAllDogs, filterDogs, getCities } from '@/lib/dogs'

export default function Home() {
  const allDogs = getAllDogs()
  const cities = getCities()

  const [filters, setFilters] = useState({
    size: 'all',
    age: 'all',
    city: 'all',
    search: '',
  })

  const filteredDogs = useMemo(() => {
    return filterDogs(allDogs, filters)
  }, [allDogs, filters])

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
            {filteredDogs.length} {filteredDogs.length === 1 ? 'cão encontrado' : 'cães encontrados'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDogs.map((dog) => (
              <DogCard key={dog.id} dog={dog} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
