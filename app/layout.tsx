import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Amigo de 4 Patas - Adoção de Cães',
  description: 'Plataforma de adoção de cães abandonados. Encontre seu novo melhor amigo!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="font-sans">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="border-t border-gray-100 py-8 mt-16">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            <p>© 2025 Amigo de 4 Patas - Todos os direitos reservados</p>
            <p className="mt-2">Feito com carinho para ajudar cães a encontrarem um lar</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
