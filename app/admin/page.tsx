'use client'

import { useState } from 'react'
import Image from 'next/image'
import { getAllDogs } from '@/lib/dogs'
import { Dog } from '@/types/dog'

export default function AdminPage() {
  const [dogs, setDogs] = useState<Dog[]>(getAllDogs())
  const [isEditing, setIsEditing] = useState(false)
  const [currentDog, setCurrentDog] = useState<Dog | null>(null)
  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState<Partial<Dog>>({
    name: '',
    age: 'Adulto',
    size: 'Médio',
    personality: 'Carinhoso',
    city: '',
    description: '',
    story: '',
    image: '',
    adopted: false,
  })

  const handleEdit = (dog: Dog) => {
    setCurrentDog(dog)
    setFormData(dog)
    setIsEditing(true)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este cão?')) {
      setDogs(dogs.filter((dog) => dog.id !== id))
      alert('Cão excluído com sucesso! (Nota: isso não persiste após recarregar a página)')
    }
  }

  const handleToggleAdopted = (id: string) => {
    setDogs(
      dogs.map((dog) =>
        dog.id === id ? { ...dog, adopted: !dog.adopted } : dog
      )
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isEditing && currentDog) {
      setDogs(
        dogs.map((dog) =>
          dog.id === currentDog.id ? { ...dog, ...formData } : dog
        )
      )
      alert('Cão atualizado com sucesso! (Nota: isso não persiste após recarregar a página)')
    } else {
      const newDog: Dog = {
        ...formData,
        id: String(Date.now()),
      } as Dog
      setDogs([...dogs, newDog])
      alert('Cão adicionado com sucesso! (Nota: isso não persiste após recarregar a página)')
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: '',
      age: 'Adulto',
      size: 'Médio',
      personality: 'Carinhoso',
      city: '',
      description: '',
      story: '',
      image: '',
      adopted: false,
    })
    setIsEditing(false)
    setCurrentDog(null)
    setShowForm(false)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Painel Admin</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            {showForm ? 'Cancelar' : '+ Adicionar Cão'}
          </button>
        </div>

        {showForm && (
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {isEditing ? 'Editar Cão' : 'Adicionar Novo Cão'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Cidade *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Idade *</label>
                  <select
                    name="age"
                    required
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black appearance-none bg-white"
                  >
                    <option value="Filhote">Filhote</option>
                    <option value="Adulto">Adulto</option>
                    <option value="Idoso">Idoso</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Porte *</label>
                  <select
                    name="size"
                    required
                    value={formData.size}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black appearance-none bg-white"
                  >
                    <option value="Pequeno">Pequeno</option>
                    <option value="Médio">Médio</option>
                    <option value="Grande">Grande</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Personalidade *</label>
                  <select
                    name="personality"
                    required
                    value={formData.personality}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black appearance-none bg-white"
                  >
                    <option value="Brincalhão">Brincalhão</option>
                    <option value="Calmo">Calmo</option>
                    <option value="Energético">Energético</option>
                    <option value="Carinhoso">Carinhoso</option>
                    <option value="Independente">Independente</option>
                    <option value="Protetor">Protetor</option>
                    <option value="Sociável">Sociável</option>
                    <option value="Tímido">Tímido</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">URL da Imagem *</label>
                  <input
                    type="url"
                    name="image"
                    required
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descrição *</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">História *</label>
                <textarea
                  name="story"
                  required
                  rows={4}
                  value={formData.story}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="adopted"
                  name="adopted"
                  checked={formData.adopted}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <label htmlFor="adopted" className="text-sm font-medium">
                  Já foi adotado
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  {isEditing ? 'Salvar Alterações' : 'Adicionar Cão'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 text-black px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-bold">Foto</th>
                  <th className="text-left px-6 py-4 text-sm font-bold">Nome</th>
                  <th className="text-left px-6 py-4 text-sm font-bold">Cidade</th>
                  <th className="text-left px-6 py-4 text-sm font-bold">Idade</th>
                  <th className="text-left px-6 py-4 text-sm font-bold">Porte</th>
                  <th className="text-left px-6 py-4 text-sm font-bold">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-bold">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dogs.map((dog) => (
                  <tr key={dog.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="relative w-12 h-12 rounded overflow-hidden">
                        <Image
                          src={dog.image}
                          alt={dog.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{dog.name}</td>
                    <td className="px-6 py-4 text-gray-600">{dog.city}</td>
                    <td className="px-6 py-4 text-gray-600">{dog.age}</td>
                    <td className="px-6 py-4 text-gray-600">{dog.size}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleAdopted(dog.id)}
                        className={`text-xs px-3 py-1 rounded font-medium ${
                          dog.adopted
                            ? 'bg-gray-200 text-gray-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {dog.adopted ? 'Adotado' : 'Disponível'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(dog)}
                          className="text-sm text-black hover:underline"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(dog.id)}
                          className="text-sm text-red-600 hover:underline"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-100 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Nota:</strong> Esta é uma versão de demonstração. As alterações não são persistidas
            e serão perdidas ao recarregar a página. Para persistência real, integre com um banco de dados.
          </p>
        </div>
      </div>
    </div>
  )
}
