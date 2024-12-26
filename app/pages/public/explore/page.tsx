"use client";

import { useState, Suspense, useEffect } from "react"
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

// Add category background color mapping
const categoryBackgrounds: Record<BusinessCategory, string> = {
  hair_salon: 'bg-amber-900/10',
  nail_salon: 'bg-pink-900/10',
  waxing_salon: 'bg-purple-900/10',
  beauty_salon: 'bg-rose-900/10',
  barbershop: 'bg-orange-900/10',
  eyebrows_and_lashes: 'bg-fuchsia-900/10',
  massage: 'bg-violet-900/10',
  spa: 'bg-emerald-900/10',
  gym_and_fitness: 'bg-neutral-900/10',
  personal_trainer: 'bg-slate-900/10',
  therapy_centre: 'bg-teal-900/10',
  tattoo_and_piercing: 'bg-zinc-900/10',
  tanning_studio: 'bg-amber-800/10',
  aesthetics: 'bg-indigo-900/10',
  weight_loss: 'bg-cyan-900/10'
};

export default function ExplorePage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string }
}) {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  // Select some popular categories to display
  const popularCategories: BusinessCategory[] = [
    "gym_and_fitness",
    "spa",
    "hair_salon",
    "beauty_salon",
    "massage",
    "nail_salon"
  ];

  useEffect(() => {
    setSelectedCategory(searchParams.category || null);
    setSearchTerm(searchParams.search || null);
  }, [searchParams.category, searchParams.search]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${selectedCategory ? categoryBackgrounds[selectedCategory as BusinessCategory] : 'bg-white'}`}>
      <div className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${selectedCategory ? categoryBackgrounds[selectedCategory as BusinessCategory] : 'bg-white'}`}>
        <Header user={user} />
      </div>
      <main className="flex-grow pt-20">
      
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-screen-2xl mx-auto px-4 py-4 md:py-8 space-y-4 md:space-y-6"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-neutral-900">Discover all services</h2>
          </motion.div>
        
          <motion.div variants={itemVariants} className="w-full">
            <Suspense fallback={<div>Loading filters...</div>}>
              <ExploreFilters categories={[...businessCategories]} />
            </Suspense>
          </motion.div>

        
          <motion.div variants={itemVariants} className="w-full">
            <div className="flex overflow-x-auto md:overflow-x-visible pb-2 -mb-2 scrollbar-hide space-x-4 md:space-x-6">
              <motion.div variants={itemVariants} custom={-1} className="flex-shrink-0">
                <Link href="/pages/public/explore" className="block w-[120px]">
                  <Button variant="outline" className="w-full h-[80px] bg-white flex flex-col items-center justify-center p-2 space-y-2 hover:bg-gray-50 border-gray-200 transition-all duration-300 hover:scale-105">
                    <CategoryIcon icon="heart" className="w-5 h-5" />
                    <span className="text-xs font-medium text-gray-700 text-center truncate w-full">All Services</span>
                  </Button>
                </Link>
              </motion.div>
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
                      href={`/pages/public/explore?category=${slug}`}
                      className="block w-[120px]"
                    >
                      <Button
                        variant="outline"
                        className="w-full h-[80px] bg-white flex flex-col items-center justify-center p-2 space-y-2 hover:bg-gray-50 border-gray-200 transition-all duration-300 hover:scale-105"
                      >
                        <CategoryIcon icon={categoryToIcon[category as BusinessCategory]} className="w-5 h-5" />
                        <span className="text-xs font-medium text-gray-700 text-center truncate w-full">{category.replace(/_/g, ' ')}</span>
                      </Button>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

    
          <motion.div variants={itemVariants} className="w-full">
            <Suspense fallback={<div>Loading businesses...</div>}>
              <BusinessesCollection searchParams={{
                category: selectedCategory,
                search: searchTerm
              }} />
            </Suspense>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
} 