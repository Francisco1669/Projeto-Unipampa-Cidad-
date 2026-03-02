import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import Header from '@/components/Header'
import { Providers } from './providers'

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
        <footer className="border-t border-gray-100 bg-gray-50 mt-24">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Nossa Missão</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Conectar cães abandonados com famílias que querem dar amor. 
                    Cada adoção é uma nova chance de felicidade. Sua ajuda faz diferença —{' '}
                    <Link href="/ajudar" className="text-accent-500 hover:underline font-medium">
                      saiba como ajudar
                    </Link>.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Como Funciona</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Explore nossos cães disponíveis, conheça suas histórias e 
                    preencha o formulário de interesse. Nossa equipe entrará em contato.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contato</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Dúvidas ou sugestões? Entre em contato através do formulário 
                    de adoção ou visite nossa página de histórias felizes.
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-gray-500 text-sm">
                    © 2025 Amigo de 4 Patas - Todos os direitos reservados
                  </p>
                  <p className="text-gray-500 text-sm italic">
                    Feito com carinho para ajudar cães a encontrarem um lar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}