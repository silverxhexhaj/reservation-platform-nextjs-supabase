"use client";

import { businesses } from "@/data/mock"
import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

interface BusinessesCollectionProps {
  searchParams?: {
    category?: string
    search?: string
  }
}

export function BusinessesCollection({ searchParams }: BusinessesCollectionProps) {
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
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-12"
      >
        <h3 className="text-lg font-medium">No businesses found</h3>
        <p className="text-muted-foreground">Try adjusting your filters</p>
      </motion.div>
    )
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6"
    >
      {filteredBusinesses.map((business) => (
        <motion.div
          key={business.id}
          variants={itemVariants}
        >
          <Link 
            href={`/pages/private/business/dashboard/${business.id}`} 
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
                <div className="absolute top-2 md:top-4 left-2 md:left-4">
                  <Badge 
                    variant="secondary" 
                    className="bg-white/90 backdrop-blur-sm text-neutral-900 font-medium border border-gray-100/50 text-xs md:text-sm"
                  >
                    {business.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="text-sm md:text-base font-semibold line-clamp-1">
                    {business.name}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-600 line-clamp-2 min-h-[2.5rem] md:min-h-[3rem] leading-[1.25rem] md:leading-[1.5rem]">
                    {business.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs md:text-sm font-medium text-neutral-900">
                      {business.rating.toFixed(1)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-0.5">
                    {Array.from(business.priceRange).map((_, index) => (
                      <span
                        key={index}
                        className="text-xs md:text-sm font-medium text-neutral-900"
                      >
                        $
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
} 