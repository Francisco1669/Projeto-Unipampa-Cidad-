export function DogCardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-6 space-y-3">
        <div className="flex justify-between items-start">
          <div className="h-6 bg-gray-200 rounded w-24" />
          <div className="h-5 bg-gray-200 rounded w-20" />
        </div>
        <div className="flex gap-2">
          <div className="h-5 bg-gray-200 rounded w-16" />
          <div className="h-5 bg-gray-200 rounded w-16" />
        </div>
        <div className="h-5 bg-gray-200 rounded w-28" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      </div>
    </div>
  )
}

export function DogGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <DogCardSkeleton key={i} />
      ))}
    </div>
  )
}
