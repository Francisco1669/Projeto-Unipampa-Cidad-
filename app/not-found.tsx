import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Página não encontrada</h2>
        <p className="text-gray-600 mb-8">
          Ops! Parece que este cãozinho fugiu. Vamos voltar para casa?
        </p>
        <Link
          href="/"
          className="inline-block bg-black text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  )
}
