'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Loader2, ArrowLeft, Save } from 'lucide-react'

interface DonationConfig {
  pixKey: string
  pixCopiaECola: string
  pixQrCodeUrl: string
  itemsNeeded: string[]
  deliveryInfo: string
  deliveryAddress: string
}

const defaultConfig: DonationConfig = {
  pixKey: '',
  pixCopiaECola: '',
  pixQrCodeUrl: '',
  itemsNeeded: [],
  deliveryInfo: '',
  deliveryAddress: '',
}

export default function AdminDoacoesPage() {
  const [config, setConfig] = useState<DonationConfig>(defaultConfig)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [itemsText, setItemsText] = useState('')

  useEffect(() => {
    fetchConfig()
  }, [])

  async function fetchConfig() {
    try {
      setLoading(true)
      const res = await fetch('/api/donation-config')
      if (res.ok) {
        const data = await res.json()
        setConfig({
          pixKey: data.pixKey ?? '',
          pixCopiaECola: data.pixCopiaECola ?? '',
          pixQrCodeUrl: data.pixQrCodeUrl ?? '',
          itemsNeeded: data.itemsNeeded ?? [],
          deliveryInfo: data.deliveryInfo ?? '',
          deliveryAddress: data.deliveryAddress ?? '',
        })
        setItemsText((data.itemsNeeded ?? []).join('\n'))
      }
    } catch (error) {
      console.error('Erro ao buscar config:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const items = itemsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)

      const res = await fetch('/api/donation-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...config,
          itemsNeeded: items,
        }),
      })

      if (res.ok) {
        alert('Configuração salva com sucesso!')
      } else {
        const err = await res.json()
        alert(`Erro: ${err.error ?? 'Falha ao salvar'}`)
      }
    } catch (error) {
      console.error('Erro ao salvar:', error)
      alert('Erro ao salvar configuração')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setConfig((prev) => ({ ...prev, [name]: value }))
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar ao Admin
      </Link>

      <h1 className="text-3xl font-bold mb-2">Configuração de Doações</h1>
      <p className="text-gray-600 mb-8">
        Configure PIX, itens necessários e informações de entrega para a página &quot;Como Ajudar&quot;.
      </p>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
        <div className="card-elevated p-6">
          <h2 className="text-lg font-semibold mb-4">PIX</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="pixKey" className="block text-sm font-medium text-gray-700 mb-2">
                Chave PIX (ex: email, telefone, CPF)
              </label>
              <input
                type="text"
                id="pixKey"
                name="pixKey"
                value={config.pixKey}
                onChange={handleChange}
                placeholder="email@exemplo.com ou 11999999999"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-accent-500 bg-white"
              />
            </div>
            <div>
              <label htmlFor="pixCopiaECola" className="block text-sm font-medium text-gray-700 mb-2">
                PIX Copia e Cola (string do banco)
              </label>
              <textarea
                id="pixCopiaECola"
                name="pixCopiaECola"
                value={config.pixCopiaECola}
                onChange={handleChange}
                rows={4}
                placeholder="Cole aqui a string PIX Copia e Cola do seu banco..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-accent-500 bg-white resize-none font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Se preenchido, o QR Code será gerado automaticamente. Caso contrário, use a URL abaixo.
              </p>
            </div>
            <div>
              <label htmlFor="pixQrCodeUrl" className="block text-sm font-medium text-gray-700 mb-2">
                URL do QR Code (opcional, se não usar Copia e Cola)
              </label>
              <input
                type="url"
                id="pixQrCodeUrl"
                name="pixQrCodeUrl"
                value={config.pixQrCodeUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-accent-500 bg-white"
              />
            </div>
          </div>
        </div>

        <div className="card-elevated p-6">
          <h2 className="text-lg font-semibold mb-4">Doação de ração e materiais</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="itemsText" className="block text-sm font-medium text-gray-700 mb-2">
                Itens necessários (um por linha)
              </label>
              <textarea
                id="itemsText"
                value={itemsText}
                onChange={(e) => setItemsText(e.target.value)}
                rows={6}
                placeholder="Ração para cães adultos&#10;Cobertores&#10;Remédios&#10;..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-accent-500 bg-white resize-none"
              />
            </div>
            <div>
              <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700 mb-2">
                Endereço para entrega
              </label>
              <input
                type="text"
                id="deliveryAddress"
                name="deliveryAddress"
                value={config.deliveryAddress}
                onChange={handleChange}
                placeholder="Rua, número, bairro, cidade"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-accent-500 bg-white"
              />
            </div>
            <div>
              <label htmlFor="deliveryInfo" className="block text-sm font-medium text-gray-700 mb-2">
                Informações de entrega (horários, contato, etc.)
              </label>
              <textarea
                id="deliveryInfo"
                name="deliveryInfo"
                value={config.deliveryInfo}
                onChange={handleChange}
                rows={4}
                placeholder="Entre em contato antes de levar. Horário de recebimento..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-accent-500 bg-white resize-none"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-200 text-white rounded-lg font-semibold hover:bg-accent-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            Salvar
          </button>
          <Link
            href="/ajudar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
          >
            Ver página Como Ajudar
          </Link>
        </div>
      </form>
    </div>
  )
}
