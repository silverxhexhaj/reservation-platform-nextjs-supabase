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
  weight_loss: 'bg-cyan-900/10',
  yoga_studio: 'bg-green-900/10',
  pilates_studio: 'bg-lime-900/10',
  dental_clinic: 'bg-blue-900/10',
  chiropractor: 'bg-sky-900/10',
  physiotherapy: 'bg-red-900/10',
  acupuncture: 'bg-yellow-900/10',
  meditation_centre: 'bg-purple-800/10',
  wellness_centre: 'bg-emerald-800/10',
  makeup_artist: 'bg-pink-800/10',
  hair_removal: 'bg-rose-800/10'
};

const categoryBorders: Record<BusinessCategory, string> = {
  hair_salon: 'border-amber-900',
  nail_salon: 'border-pink-900',
  waxing_salon: 'border-purple-900',
  beauty_salon: 'border-rose-900',
  barbershop: 'border-orange-900',
  eyebrows_and_lashes: 'border-fuchsia-900',
  massage: 'border-violet-900',
  spa: 'border-emerald-900',
  gym_and_fitness: 'border-neutral-900',
  personal_trainer: 'border-slate-900',
  therapy_centre: 'border-teal-900',
  tattoo_and_piercing: 'border-zinc-900',
  tanning_studio: 'border-amber-800',
  aesthetics: 'border-indigo-900',
  weight_loss: 'border-cyan-900',
  yoga_studio: 'border-green-900',
  pilates_studio: 'border-lime-900',
  dental_clinic: 'border-blue-900',
  chiropractor: 'border-sky-900',
  physiotherapy: 'border-red-900',
  acupuncture: 'border-yellow-900',
  meditation_centre: 'border-purple-800',
  wellness_centre: 'border-emerald-800',
  makeup_artist: 'border-pink-800',
  hair_removal: 'border-rose-800'
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
    "nail_salon",
    "yoga_studio",
    "dental_clinic",
    "wellness_centre",
    "makeup_artist"
  ];

  useEffect(() => {
    setSelectedCategory(searchParams.category || null);
    setSearchTerm(searchParams.search || null);
  }, [searchParams.category, searchParams.search]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <Header user={user} />
      </div>
      <main className="flex-grow pt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 md:space-y-8"
        >
          {/* Hero Section */}
          <motion.div 
            variants={itemVariants}
            className={`h-[380px] relative mb-8 transition-colors duration-500 flex flex-col justify-center
              ${selectedCategory ? categoryBackgrounds[selectedCategory as BusinessCategory] : 'bg-gradient-to-r from-neutral-50 to-neutral-100'}`}
          >
            <div className="space-y-8">
              <motion.div variants={itemVariants} className="px-8 space-y-2 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
                  Find and Book Local Services
                </h1>
                <p className="text-neutral-600 text-lg">
                  Discover and connect with the best service providers in your area
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="w-full max-w-2xl mx-auto">
                <Suspense fallback={<div>Loading filters...</div>}>
                  <ExploreFilters categories={[...businessCategories]} />
                </Suspense>
              </motion.div>

              {/* Categories Section */}
              <motion.div variants={itemVariants} className="w-full px-8">
                <div className="flex overflow-x-auto md:overflow-x-visible pb-2 -mb-2 scrollbar-hide space-x-4 md:space-x-6">
                  <motion.div variants={itemVariants} custom={-1} className="flex-shrink-0">
                    <Link href="/pages/public/explore" className="block w-[120px]">
                      <Button 
                        variant="outline" 
                        className={`w-full h-[80px] flex flex-col items-center justify-center p-2 space-y-2 transition-all duration-300 hover:scale-105 border bg-white
                          ${!selectedCategory ? 'border-neutral-900' : 'border-gray-200 hover:bg-gray-50'}`}
                      >
                        <CategoryIcon icon="heart" className="w-5 h-5" />
                        <span className="text-xs font-medium text-gray-700 text-center truncate w-full">All Services</span>
                      </Button>
                    </Link>
                  </motion.div>
                  {popularCategories.map((category, index) => {
                    const slug = category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-');
                    const isActive = selectedCategory === slug;
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
                            className={`w-full h-[80px] flex flex-col items-center justify-center p-2 space-y-2 transition-all duration-300 hover:scale-105 border bg-white
                              ${isActive 
                                ? `${categoryBorders[category as BusinessCategory]}` 
                                : 'border-gray-200 hover:bg-gray-50'}`}
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
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full px-8">
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