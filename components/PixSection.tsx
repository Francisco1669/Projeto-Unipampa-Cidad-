'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Copy, Check } from 'lucide-react'
import QRCode from 'qrcode'

interface PixSectionProps {
  pixKey: string
  pixCopiaECola?: string
  pixQrCodeUrl?: string
}

export default function PixSection({ pixKey, pixCopiaECola, pixQrCodeUrl }: PixSectionProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (pixCopiaECola?.trim()) {
      QRCode.toDataURL(pixCopiaECola, { width: 256, margin: 2 })
        .then(setQrDataUrl)
        .catch(() => setQrDataUrl(null))
    } else {
      setQrDataUrl(null)
    }
  }, [pixCopiaECola])

  const handleCopyKey = async () => {
    if (!pixKey.trim()) return
    try {
      await navigator.clipboard.writeText(pixKey.trim())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  const hasPixData = pixKey.trim() || pixCopiaECola?.trim() || pixQrCodeUrl?.trim()

  if (!hasPixData) {
    return (
      <div className="card-elevated p-8 text-center">
        <p className="text-gray-500">Informações de doação via PIX em breve.</p>
      </div>
    )
  }

  return (
    <div className="card-elevated p-8">
      <h2 className="text-xl font-semibold mb-2">Doação via PIX</h2>
      <p className="text-gray-600 text-sm mb-6">
        Escaneie o QR Code com o app do seu banco ou copie a chave PIX para fazer sua doação.
      </p>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-shrink-0">
          {qrDataUrl ? (
            <div className="w-64 h-64 rounded-lg overflow-hidden bg-white border border-gray-100 p-2">
              <img
                src={qrDataUrl}
                alt="QR Code PIX"
                className="w-full h-full object-contain"
              />
            </div>
          ) : pixQrCodeUrl?.trim() ? (
            <div className="relative w-64 h-64 rounded-lg overflow-hidden bg-white border border-gray-100">
              <Image
                src={pixQrCodeUrl}
                alt="QR Code PIX"
                fill
                className="object-contain p-2"
                sizes="256px"
              />
            </div>
          ) : (
            <div className="w-64 h-64 rounded-lg bg-gray-100 flex items-center justify-center">
              <p className="text-gray-400 text-sm">Adicione PIX Copia e Cola ou URL do QR no Admin</p>
            </div>
          )}
        </div>

        {pixKey.trim() && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-700 mb-2">Chave PIX</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-4 py-3 bg-gray-50 rounded-lg text-sm break-all">
                {pixKey.trim()}
              </code>
              <button
                type="button"
                onClick={handleCopyKey}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-3 bg-accent-200 text-white rounded-lg font-medium hover:bg-accent-400 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copiar
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
