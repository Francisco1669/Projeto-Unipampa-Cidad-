'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getDogById } from '@/lib/dogs'

export default function AdoptionPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const dog = getDogById(id)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    hasYard: 'no',
    hasPets: 'no',
    petExperience: '',
    whyAdopt: '',
  })

  if (!dog) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Cão não encontrado</p>
        <Link href="/" className="text-black underline mt-4 inline-block">
          Voltar para Home
        </Link>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você pode adicionar lógica para enviar para um backend
    console.log('Formulário enviado:', formData)
    setSubmitted(true)

    // Redirecionar após 3 segundos
    setTimeout(() => {
      router.push('/')
    }, 3000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">🐾</div>
            <h1 className="text-4xl font-bold mb-4">Uau! Que notícia incrível!</h1>
            <p className="text-xl text-gray-700">
              Seu interesse em adotar <strong>{dog.name}</strong> foi enviado com sucesso!
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 mb-6">
            <p className="text-gray-700">
              Em breve nossa equipe entrará em contato para dar continuidade ao processo de adoção.
              Prepare-se para receber muito amor! ❤️
            </p>
          </div>

          <p className="text-gray-500 text-sm">
            Redirecionando para a página inicial...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href={`/dog/${dog.id}`}
        className="inline-flex items-center text-gray-600 hover:text-black transition-colors mb-8"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Voltar
      </Link>

      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center gap-6">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={dog.image}
              alt={dog.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-1">Adotar {dog.name}</h1>
            <p className="text-gray-600">
              Preencha o formulário abaixo para iniciar o processo de adoção
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Seus dados</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nome completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-2">
                  Endereço completo *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Sobre sua casa</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="hasYard" className="block text-sm font-medium mb-2">
                  Você tem quintal ou área externa? *
                </label>
                <select
                  id="hasYard"
                  name="hasYard"
                  required
                  value={formData.hasYard}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black appearance-none bg-white"
                >
                  <option value="yes">Sim</option>
                  <option value="no">Não</option>
                </select>
              </div>

              <div>
                <label htmlFor="hasPets" className="block text-sm font-medium mb-2">
                  Você já tem outros pets em casa? *
                </label>
                <select
                  id="hasPets"
                  name="hasPets"
                  required
                  value={formData.hasPets}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black appearance-none bg-white"
                >
                  <option value="yes">Sim</option>
                  <option value="no">Não</option>
                </select>
              </div>

              <div>
                <label htmlFor="petExperience" className="block text-sm font-medium mb-2">
                  Você já teve pets antes? Conte um pouco sobre sua experiência *
                </label>
                <textarea
                  id="petExperience"
                  name="petExperience"
                  required
                  rows={3}
                  value={formData.petExperience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                />
              </div>

              <div>
                <label htmlFor="whyAdopt" className="block text-sm font-medium mb-2">
                  Por que você quer adotar {dog.name}? *
                </label>
                <textarea
                  id="whyAdopt"
                  name="whyAdopt"
                  required
                  rows={4}
                  value={formData.whyAdopt}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 px-8 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Enviar formulário de adoção
          </button>
        </form>
      </div>
    </div>
  )
}
