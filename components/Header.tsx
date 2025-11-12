'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path ? 'text-black' : 'text-gray-500 hover:text-black'
  }

  return (
    <header className="border-b border-gray-100 sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity">
            Amigo de 4 Patas
          </Link>

          <ul className="flex gap-8 text-sm font-medium">
            <li>
              <Link href="/" className={`transition-colors ${isActive('/')}`}>
                Cães
              </Link>
            </li>
            <li>
              <Link href="/historias" className={`transition-colors ${isActive('/historias')}`}>
                Histórias Felizes
              </Link>
            </li>
            <li>
              <Link href="/admin" className={`transition-colors ${isActive('/admin')}`}>
                Admin
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
