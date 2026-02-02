'use client'

import { useState, use, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Heart, Loader2 } from 'lucide-react'
import type { Dog } from '@/types/dog'

export default function AdoptionPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [dog, setDog] = useState<Dog | null>(null)
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    async function fetchDog() {
      try {
        const res = await fetch(`/api/dogs/${id}`)
        if (res.ok) {
          const data = await res.json()
          setDog(data)
        } else {
          setDog(null)
        }
      } catch (error) {
        console.error('Erro ao buscar cão:', error)
        setDog(null)
      } finally {
        setLoading(false)
      }
    }
    fetchDog()
  }, [id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Formulário enviado:', formData)
    setSubmitted(true)

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      </div>
    )
  }

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

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-accent-200 rounded-full flex items-center justify-center shadow-medium">
                <Heart className="w-12 h-12 text-white fill-white" />
              </div>
            </div>
            <h1 className="headline-section mb-4">Que notícia incrível!</h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Seu interesse em adotar <strong className="text-accent-500">{dog.name}</strong> foi enviado com sucesso!
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 mb-8 shadow-soft">
            <p className="text-gray-700 leading-relaxed text-lg">
              Em breve nossa equipe entrará em contato para dar continuidade ao processo de adoção.
              Prepare-se para receber muito amor e carinho!
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
        className="inline-flex items-center text-gray-600 hover:text-black transition-hover mb-12 group"
      >
        <ChevronLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-hover" />
        <span className="text-sm font-medium">Voltar</span>
      </Link>

      <div className="max-w-3xl mx-auto">
        <div className="mb-12 flex items-center gap-6 pb-8 border-b border-gray-100">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 shadow-soft">
            <Image
              src={dog.image}
              alt={dog.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div>
            <h1 className="headline-section mb-2">Adotar {dog.name}</h1>
            <p className="text-gray-600 leading-relaxed">
              Estamos felizes que você quer dar um lar para {dog.name}! 
              Preencha o formulário abaixo para iniciar o processo de adoção.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white border border-gray-100 rounded-lg p-8 shadow-soft">
            <h2 className="text-xl font-semibold mb-2">Seus dados</h2>
            <p className="text-sm text-gray-600 mb-6">
              Precisamos dessas informações para entrar em contato com você.
            </p>

            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus-ring-subtle bg-white transition-hover hover:border-gray-300"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus-ring-subtle bg-white transition-hover hover:border-gray-300"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus-ring-subtle bg-white transition-hover hover:border-gray-300"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço completo *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Rua, número, bairro, cidade"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus-ring-subtle bg-white transition-hover hover:border-gray-300"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-lg p-8 shadow-soft">
            <h2 className="text-xl font-semibold mb-2">Sobre sua casa</h2>
            <p className="text-sm text-gray-600 mb-6">
              Conte um pouco sobre o ambiente onde {dog.name} vai viver.
            </p>

            <div className="space-y-5">
              <div>
                <label htmlFor="hasYard" className="block text-sm font-medium text-gray-700 mb-2">
                  Você tem quintal ou área externa? *
                </label>
                <select
                  id="hasYard"
                  name="hasYard"
                  required
                  value={formData.hasYard}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus-ring-subtle bg-white transition-hover hover:border-gray-300 appearance-none cursor-pointer"
                >
                  <option value="yes">Sim</option>
                  <option value="no">Não</option>
                </select>
              </div>

              <div>
                <label htmlFor="hasPets" className="block text-sm font-medium text-gray-700 mb-2">
                  Você já tem outros pets em casa? *
                </label>
                <select
                  id="hasPets"
                  name="hasPets"
                  required
                  value={formData.hasPets}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus-ring-subtle bg-white transition-hover hover:border-gray-300 appearance-none cursor-pointer"
                >
                  <option value="yes">Sim</option>
                  <option value="no">Não</option>
                </select>
              </div>

              <div>
                <label htmlFor="petExperience" className="block text-sm font-medium text-gray-700 mb-2">
                  Você já teve pets antes? Conte um pouco sobre sua experiência *
                </label>
                <textarea
                  id="petExperience"
                  name="petExperience"
                  required
                  rows={4}
                  value={formData.petExperience}
                  onChange={handleChange}
                  placeholder="Conte sobre suas experiências anteriores com animais..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus-ring-subtle bg-white transition-hover hover:border-gray-300 resize-none"
                />
              </div>

              <div>
                <label htmlFor="whyAdopt" className="block text-sm font-medium text-gray-700 mb-2">
                  Por que você quer adotar {dog.name}? *
                </label>
                <textarea
                  id="whyAdopt"
                  name="whyAdopt"
                  required
                  rows={5}
                  value={formData.whyAdopt}
                  onChange={handleChange}
                  placeholder="O que te chamou atenção em {dog.name}? O que você espera dessa adoção?"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus-ring-subtle bg-white transition-hover hover:border-gray-300 resize-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-accent-200 text-white py-4 px-8 rounded-lg font-semibold hover:bg-accent-300 transition-hover shadow-medium hover:shadow-large"
          >
            Enviar formulário de adoção
          </button>
        </form>
      </div>
    </div>
  )
}
