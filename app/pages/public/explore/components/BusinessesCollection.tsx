import { businesses } from "@/data/mock"
import { Card, CardContent, CardFooter, CardHeader } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BusinessesCollectionProps {
  searchParams?: {
    category?: string
    search?: string
  }
}

export async function BusinessesCollection({ searchParams }: BusinessesCollectionProps) {
  // Filter businesses based on search params
  const filteredBusinesses = businesses.filter(business => {
    const matchesCategory = !searchParams?.category || 
      searchParams.category === 'all' || 
      business.category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-') === searchParams.category

    const matchesSearch = !searchParams?.search ||
      business.name.toLowerCase().includes(searchParams.search.toLowerCase()) ||
      business.description.toLowerCase().includes(searchParams.search.toLowerCase())

    return matchesCategory && matchesSearch
  })

  if (filteredBusinesses.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No businesses found</h3>
        <p className="text-muted-foreground">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {filteredBusinesses.map((business) => (
        <Link 
          href={`/pages/private/business/dashboard/${business.id}`} 
          key={business.id} 
          className="group block h-full"
        >
          <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg border border-gray-100 hover:border-gray-200">
            <div className="aspect-[4/3] overflow-hidden relative border-b border-gray-100">
              <Image 
                src={business.imageUrl} 
                alt={business.name} 
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <Badge 
                  variant="secondary" 
                  className="bg-white/90 backdrop-blur-sm text-neutral-900 font-medium border border-gray-100/50"
                >
                  {business.category}
                </Badge>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="text-base font-semibold line-clamp-1">
                  {business.name}
                </h3>
                <p className="text-sm text-neutral-600 line-clamp-2">
                  {business.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium text-neutral-900">
                    {business.rating.toFixed(1)}
                  </span>
                </div>

                <div className="flex items-center space-x-0.5">
                  {Array.from(business.priceRange).map((_, index) => (
                    <span
                      key={index}
                      className="text-sm font-medium text-neutral-900"
                    >
                      $
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
} 