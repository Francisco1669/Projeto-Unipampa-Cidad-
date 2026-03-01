'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'

interface DogFiltersProps {
  cities: string[]
  onFilterChange: (filters: {
    size: string
    age: string
    city: string
    search: string
  }) => void
}

export default function DogFilters({ cities, onFilterChange }: DogFiltersProps) {
  const [filters, setFilters] = useState({
    size: 'all',
    age: 'all',
    city: 'all',
    search: '',
  })

  const hasActiveFilters = filters.size !== 'all' || filters.age !== 'all' || filters.city !== 'all' || filters.search !== ''

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const resetFilters = {
      size: 'all',
      age: 'all',
      city: 'all',
      search: '',
    }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  return (
    <div className="bg-white border border-gray-100 rounded-lg p-6 mb-8 shadow-soft">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Buscar
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              id="search"
              placeholder="Nome, personalidade..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus-ring-subtle bg-white transition-hover hover:border-gray-300"
            />
          </div>
        </div>

        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
            Porte
          </label>
          <select
            id="size"
            value={filters.size}
            onChange={(e) => handleFilterChange('size', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus-ring-subtle bg-white transition-hover hover:border-gray-300 appearance-none cursor-pointer"
          >
            <option value="all">Todos</option>
            <option value="Pequeno">Pequeno</option>
            <option value="Médio">Médio</option>
            <option value="Grande">Grande</option>
          </select>
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
            Idade
          </label>
          <select
            id="age"
            value={filters.age}
            onChange={(e) => handleFilterChange('age', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus-ring-subtle bg-white transition-hover hover:border-gray-300 appearance-none cursor-pointer"
          >
            <option value="all">Todas</option>
            <option value="Filhote">Filhote</option>
            <option value="Adulto">Adulto</option>
            <option value="Idoso">Idoso</option>
          </select>
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
            Cidade
          </label>
          <select
            id="city"
            value={filters.city}
            onChange={(e) => handleFilterChange('city', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus-ring-subtle bg-white transition-hover hover:border-gray-300 appearance-none cursor-pointer"
          >
            <option value="all">Todas</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="mt-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-hover font-medium"
        >
          <X className="w-4 h-4" />
          Limpar filtros
        </button>
      )}
    </div>
  )
}
