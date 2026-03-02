'use client'

import { useState } from 'react'
import { Share2, MessageCircle, Twitter, Facebook, Link2, Check } from 'lucide-react'

interface ShareButtonsProps {
  url?: string
  title?: string
  text?: string
}

export default function ShareButtons({
  url,
  title = 'Amigo de 4 Patas - Adoção de Cães',
  text = 'Conheça o Amigo de 4 Patas e ajude cães a encontrarem um lar!',
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = url ?? (typeof window !== 'undefined' ? window.location.href : '')
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedText = encodeURIComponent(text)

  const whatsappUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        })
      } catch {
        window.open(whatsappUrl, '_blank')
      }
    } else {
      window.open(whatsappUrl, '_blank')
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={handleNativeShare}
        className="inline-flex items-center gap-2 px-5 py-3 bg-accent-200 text-white rounded-lg font-medium hover:bg-accent-400 transition-colors"
      >
        <Share2 className="w-5 h-5" />
        Compartilhar
      </button>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        <MessageCircle className="w-5 h-5" />
        WhatsApp
      </a>

      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        <Twitter className="w-5 h-5" />
        X (Twitter)
      </a>

      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-3 bg-[#1877F2] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        <Facebook className="w-5 h-5" />
        Facebook
      </a>

      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex items-center gap-2 px-5 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-5 h-5" />
            Link copiado!
          </>
        ) : (
          <>
            <Link2 className="w-5 h-5" />
            Copiar link
          </>
        )}
      </button>
    </div>
  )
}
