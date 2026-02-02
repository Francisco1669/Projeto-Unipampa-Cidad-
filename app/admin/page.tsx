'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Loader2, Plus, X } from 'lucide-react'
import type { Dog } from '@/types/dog'

export default function AdminPage() {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
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

  // Buscar cães ao carregar a página
  useEffect(() => {
    fetchDogs()
  }, [])

  async function fetchDogs() {
    try {
      setLoading(true)
      const res = await fetch('/api/dogs')
      if (res.ok) {
        const data = await res.json()
        setDogs(data)
      }
    } catch (error) {
      console.error('Erro ao buscar cães:', error)
      alert('Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (dog: Dog) => {
    setCurrentDog(dog)
    setFormData(dog)
    setIsEditing(true)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este cão? Esta ação não pode ser desfeita.')) return

    try {
      const res = await fetch(`/api/dogs/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setDogs(dogs.filter((dog) => dog.id !== id))
        alert('Cão excluído com sucesso!')
      } else {
        const error = await res.json()
        alert(`Erro ao excluir: ${error.error}`)
      }
    } catch (error) {
      console.error('Erro ao excluir cão:', error)
      alert('Erro ao excluir cão')
    }
  }

  const handleToggleAdopted = async (id: string) => {
    const dog = dogs.find((d) => d.id === id)
    if (!dog) return

    try {
      const res = await fetch(`/api/dogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adopted: !dog.adopted }),
      })

      if (res.ok) {
        const updatedDog = await res.json()
        setDogs(dogs.map((d) => (d.id === id ? updatedDog : d)))
      } else {
        alert('Erro ao atualizar status')
      }
    } catch (error) {
      console.error('Erro ao atualizar:', error)
      alert('Erro ao atualizar status')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (isEditing && currentDog) {
        // Atualizar cão existente
        const res = await fetch(`/api/dogs/${currentDog.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        if (res.ok) {
          const updatedDog = await res.json()
          setDogs(dogs.map((dog) => (dog.id === currentDog.id ? updatedDog : dog)))
          alert('Cão atualizado com sucesso!')
          resetForm()
        } else {
          const error = await res.json()
          alert(`Erro: ${error.error}`)
        }
      } else {
        // Criar novo cão
        const res = await fetch('/api/dogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        if (res.ok) {
          const newDog = await res.json()
          setDogs([newDog, ...dogs])
          alert('Cão adicionado com sucesso!')
          resetForm()
        } else {
          const error = await res.json()
          alert(`Erro: ${error.error}`)
        }
      }
    } catch (error) {
      console.error('Erro ao salvar:', error)
      alert('Erro ao salvar dados')
    } finally {
      setSubmitting(false)
    }
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-10 h-10 animate-spin text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">Carregando cães...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12 pb-8 border-b border-gray-200">
          <div>
            <h1 className="headline-section mb-2">Painel Admin</h1>
            <p className="text-gray-600">Gerencie os cães disponíveis para adoção</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-accent-200 text-white px-6 py-3 rounded-lg hover:bg-accent-300 transition-hover font-semibold inline-flex items-center gap-2 shadow-medium"
          >
            {showForm ? (
              <>
                <X className="w-5 h-5" />
                Cancelar
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Adicionar Cão
              </>
            )}
          </button>
        </div>

        {showForm && (
          <div className="bg-white border border-gray-100 rounded-lg p-8 mb-12 shadow-soft">
            <h2 className="text-2xl font-semibold mb-2">
              {isEditing ? 'Editar Cão' : 'Adicionar Novo Cão'}
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              {isEditing ? 'Atualize as informações do cão abaixo.' : 'Preencha os dados do novo cão para adicioná-lo à plataforma.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus-ring-subtle bg-white transition-hover hover:border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cidade *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus-ring-subtle bg-white transition-hover hover:border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Idade *</label>
                  <select
                    name="age"
                    required
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus-ring-subtle bg-white transition-hover hover:border-gray-300 appearance-none cursor-pointer"
                  >
                    <option value="Filhote">Filhote</option>
                    <option value="Adulto">Adulto</option>
                    <option value="Idoso">Idoso</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Porte *</label>
                  <select
                    name="size"
                    required
                    value={formData.size}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus-ring-subtle bg-white transition-hover hover:border-gray-300 appearance-none cursor-pointer"
                  >
                    <option value="Pequeno">Pequeno</option>
                    <option value="Médio">Médio</option>
                    <option value="Grande">Grande</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Personalidade *</label>
                  <select
                    name="personality"
                    required
                    value={formData.personality}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus-ring-subtle bg-white transition-hover hover:border-gray-300 appearance-none cursor-pointer"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL da Imagem *</label>
                  <input
                    type="url"
                    name="image"
                    required
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus-ring-subtle bg-white transition-hover hover:border-gray-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição *</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus-ring-subtle bg-white transition-hover hover:border-gray-300 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">História *</label>
                <textarea
                  name="story"
                  required
                  rows={5}
                  value={formData.story}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus-ring-subtle bg-white transition-hover hover:border-gray-300 resize-none"
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

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-accent-200 text-white px-8 py-3 rounded-lg hover:bg-accent-300 transition-hover font-semibold disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2 shadow-medium"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isEditing ? 'Salvar Alterações' : 'Adicionar Cão'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition-hover font-medium"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Foto</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Nome</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Cidade</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Idade</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Porte</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dogs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <p className="text-gray-500 mb-2">Nenhum cão cadastrado</p>
                      <p className="text-sm text-gray-400">Clique em "Adicionar Cão" para começar</p>
                    </td>
                  </tr>
                ) : (
                  dogs.map((dog) => (
                    <tr key={dog.id} className="hover:bg-gray-50 transition-hover">
                      <td className="px-6 py-4">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden shadow-soft">
                          <Image
                            src={dog.image}
                            alt={dog.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold">{dog.name}</td>
                      <td className="px-6 py-4 text-gray-600">{dog.city}</td>
                      <td className="px-6 py-4 text-gray-600">{dog.age}</td>
                      <td className="px-6 py-4 text-gray-600">{dog.size}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleAdopted(dog.id)}
                          className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-hover ${
                            dog.adopted
                              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              : 'bg-accent-100 text-accent-500 hover:bg-accent-200'
                          }`}
                        >
                          {dog.adopted ? 'Adotado' : 'Disponível'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-4">
                          <button
                            onClick={() => handleEdit(dog)}
                            className="text-sm font-medium text-gray-700 hover:text-accent-500 transition-hover"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(dog.id)}
                            className="text-sm font-medium text-red-600 hover:text-red-700 transition-hover"
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 bg-accent-50 border border-accent-100 rounded-lg p-6">
          <p className="text-sm text-accent-700">
            <strong className="font-semibold">Persistência ativada!</strong> Todas as alterações são salvas no MongoDB e persistem após recarregar a página.
          </p>
        </div>
      </div>
    </div>
  )
}
