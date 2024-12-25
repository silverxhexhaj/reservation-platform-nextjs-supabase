"use client";

import { useState, Suspense } from "react"
import { Header } from "@/app/components/Header"
import { BusinessesCollection } from "./components/BusinessesCollection"
import { ExploreFilters } from "./components/ExploreFilters"
import { categoryToIcon } from "@/data";

import { Button } from "@/app/components/ui/button";
import { CategoryIcon } from "@/app/components/CategoryIcon";
import Link from "next/link";
import { motion } from "framer-motion";
import { BusinessCategory, businessCategories } from "@/app/models/supabase.models";
import { containerVariants, itemVariants } from "@/app/models/transitionEffects.models";
export default function ExplorePage() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  // Select some popular categories to display
  const popularCategories: BusinessCategory[] = [
    "gym_and_fitness",
    "spa",
    "hair_salon",
    "beauty_salon",
    "massage",
    "nail_salon"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} />
      <main className="flex-grow pt-20">
        {/* Main Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-screen-2xl mx-auto px-4 py-4 md:py-8 space-y-4 md:space-y-6"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-neutral-900">Discover all services</h2>
          </motion.div>
          
          {/* Filters */}
          <motion.div variants={itemVariants} className="w-full">
            <Suspense fallback={<div>Loading filters...</div>}>
              <ExploreFilters categories={[...businessCategories]} />
            </Suspense>
          </motion.div>

          {/* Quick Categories */}
          <motion.div variants={itemVariants} className="w-full">
            <div className="flex overflow-x-auto md:overflow-x-visible pb-2 -mb-2 scrollbar-hide space-x-4 md:space-x-6">
              {popularCategories.map((category, index) => {
                const slug = category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-');
                return (
                  <motion.div
                    key={category}
                    variants={itemVariants}
                    custom={index}
                    className="flex-shrink-0"
                  >
                    <Link 
                      href={`/pages/public/explore/${slug}`}
                      className="block w-[120px]"
                    >
                      <Button
                        variant="outline"
                        className="w-full h-[80px] flex flex-col items-center justify-center p-2 space-y-2 hover:bg-gray-50 border-gray-200 transition-all duration-300 hover:scale-105"
                      >
                        <CategoryIcon icon={categoryToIcon[category as BusinessCategory]} className="w-5 h-5" />
                        <span className="text-xs font-medium text-gray-700 text-center truncate w-full">{category}</span>
                      </Button>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Business Collection */}
          <motion.div variants={itemVariants} className="w-full">
            <Suspense fallback={<div>Loading businesses...</div>}>
              <BusinessesCollection searchParams={{
                category: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('category') ?? undefined : undefined,
                search: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('search') ?? undefined : undefined
              }} />
            </Suspense>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
} 