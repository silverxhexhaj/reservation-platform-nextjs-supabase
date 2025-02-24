"use client";

import { useState, Suspense, useEffect } from "react"
import { Header } from "@/app/components/Header"
import { BusinessesCollection } from "../../../components/business/BusinessesCollection"
import { ExploreFilters } from "../../../components/business/ExploreFilters"
import { categoryToIcon } from "@/data";

import { Button } from "@/app/components/ui/button";
import { CategoryIcon } from "@/app/components/CategoryIcon";
import Link from "next/link";
import { BusinessCategory, businessCategories } from "@/app/models/supabase.models";
import { categoryBackgrounds, categoryBorders } from "@/app/lib/color.utils";
import { FooterWrapper } from "@/app/components/FooterWrapper";
import { useSearchParams } from "next/navigation"

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

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
    setSelectedCategory(searchParams.get('category'));
    setSearchTerm(searchParams.get('search'));
  }, [searchParams]);

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Header />
      <main className="flex-grow pt-20 pb-16">
        <div
          className="space-y-6 md:space-y-8"
        >
        
          <div
            className={`h-[380px] relative mb-8 transition-colors duration-500 flex flex-col justify-center
              ${selectedCategory ? categoryBackgrounds[selectedCategory as BusinessCategory] : 'bg-gradient-to-r from-neutral-50 to-neutral-100'}`}
          >
            <div className="space-y-8">
              <div className="px-4 md:px-8 space-y-2 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
                  Find and Book Local Services
                </h1>
                <p className="text-neutral-600 text-lg">
                  Discover and connect with the best service providers in your area
                </p>
              </div>

              <div className="w-full max-w-2xl mx-auto">
                <Suspense fallback={<div>Loading filters...</div>}>
                  <ExploreFilters categories={[...businessCategories]} />
                </Suspense>
              </div>

              <div className="w-full px-4 md:px-8">
                <div className="flex overflow-x-auto md:overflow-x-visible pb-2 -mb-2 scrollbar-hide space-x-4 md:space-x-6">
                  <div className="flex-shrink-0">
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
                  </div>
                  {popularCategories.map((category, index) => {
                    const slug = category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-');
                    const isActive = selectedCategory === slug;
                    return (
                      <div
                        key={category}
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
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px-4 md:px-8">
            <Suspense fallback={<div>Loading businesses...</div>}>
              <BusinessesCollection searchParams={{
                category: selectedCategory,
                search: searchTerm
              }} />
            </Suspense>
          </div>
        </div>
      </main>
      <FooterWrapper />
    </div>
  )
} 