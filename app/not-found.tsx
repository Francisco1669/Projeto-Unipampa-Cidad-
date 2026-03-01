import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-8xl font-semibold mb-4 text-gray-200">404</h1>
          <h2 className="headline-section mb-4">Página não encontrada</h2>
          <p className="subtitle-hero max-w-md mx-auto">
            Ops! Parece que este cãozinho fugiu. Vamos voltar para casa?
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-accent-200 text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-300 transition-hover shadow-medium"
        >
          <Home className="w-5 h-5" />
          Voltar para Home
        </Link>
      </div>
    </div>
  )
}
