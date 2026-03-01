import { Search, Heart } from 'lucide-react'
import Link from 'next/link'

interface EmptyStateProps {
  title?: string
  message?: string
  actionLabel?: string
  actionHref?: string
  icon?: 'search' | 'heart'
}

export default function EmptyState({
  title = 'Nenhum resultado encontrado',
  message = 'Tente ajustar seus filtros para encontrar mais cães.',
  actionLabel,
  actionHref,
  icon = 'search',
}: EmptyStateProps) {
  const IconComponent = icon === 'search' ? Search : Heart

  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <IconComponent className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>
        {actionLabel && actionHref && (
          <Link
            href={actionHref}
            className="inline-block bg-accent-200 text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-300 transition-hover"
          >
            {actionLabel}
          </Link>
        )}
      </div>
    </div>
  )
}
