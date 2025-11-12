import { Dog, HappyStory } from '@/types/dog'
import dogsData from '@/data/dogs.json'

export function getAllDogs(): Dog[] {
  return dogsData.dogs as Dog[]
}

export function getDogById(id: string): Dog | undefined {
  return getAllDogs().find((dog) => dog.id === id)
}

export function filterDogs(
  dogs: Dog[],
  filters: {
    size?: string
    age?: string
    city?: string
    search?: string
  }
): Dog[] {
  let filtered = dogs

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
}

export function getHappyStories(): HappyStory[] {
  return dogsData.happyStories as HappyStory[]
}

export function getCities(): string[] {
  const cities = getAllDogs().map((dog) => dog.city)
  return Array.from(new Set(cities)).sort()
}
