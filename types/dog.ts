export type DogSize = 'Pequeno' | 'Médio' | 'Grande'
export type DogAge = 'Filhote' | 'Adulto' | 'Idoso'
export type DogPersonality =
  | 'Brincalhão'
  | 'Calmo'
  | 'Energético'
  | 'Carinhoso'
  | 'Independente'
  | 'Protetor'
  | 'Sociável'
  | 'Tímido'

export interface Dog {
  id: string
  name: string
  age: DogAge
  size: DogSize
  personality: DogPersonality
  city: string
  description: string
  story: string
  image: string
  adopted: boolean
}

export interface HappyStory {
  id: string
  dogName: string
  adopterName: string
  story: string
  beforeImage: string
  afterImage: string
  date: string
}

export interface AdoptionForm {
  name: string
  email: string
  phone: string
  address: string
  hasYard: boolean
  hasPets: boolean
  petExperience: string
  whyAdopt: string
}
