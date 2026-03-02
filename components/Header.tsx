'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <Link 
            href="/" 
            className="text-3xl font-semibold tracking-tight hover:opacity-80 transition-hover"
          >
            Amigo de 4 Patas
          </Link>

          <div className="h-6 w-px bg-gray-200 mx-8 hidden md:block" />

          <ul className="flex gap-10 text-sm font-medium">
            <li>
              <Link 
                href="/" 
                className={`relative transition-hover ${
                  isActive('/') 
                    ? 'text-black after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-accent-200' 
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                Cães
              </Link>
            </li>
            <li>
              <Link 
                href="/historias" 
                className={`relative transition-hover ${
                  isActive('/historias') 
                    ? 'text-black after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-accent-200' 
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                Histórias Felizes
              </Link>
            </li>
            <li>
              <Link 
                href="/ajudar" 
                className={`relative transition-hover ${
                  isActive('/ajudar') 
                    ? 'text-black after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-accent-200' 
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                Como Ajudar
              </Link>
            </li>
            <li>
              <Link 
                href="/admin" 
                className={`relative transition-hover ${
                  isActive('/admin') 
                    ? 'text-black after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-accent-200' 
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                Admin
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}