"use client";

import { Header } from "@/app/components/Header";
import { Search } from "lucide-react";
import { AnimatedGradient } from "@/app/components/gradient/AnimatedGradient";
import { Button } from "@/app/components/ui/button";
import { CategoryIcon } from "@/app/components/CategoryIcon";
import { categoryToIcon } from "@/data";
import { businessCategories, BusinessCategory } from '@/app/models/supabase.models';
import { motion } from "framer-motion";
import { Command } from "@/app/components/ui/command";
import { itemVariants } from "@/app/models/transitionEffects.models";
import { useState, useEffect } from "react";
import { DealCard } from "@/app/components/DealCard";
import { DealItem } from "@/app/models/functions/searchDeals.model";
import { fetchDeals } from "@/app/service/deals/deals.service";
import { useSearchParams, useRouter } from "next/navigation";
import { FooterWrapper } from "@/app/components/FooterWrapper";

// Categories with their respective icons
const CATEGORIES = [
  { name: 'All categories', icon: categoryToIcon.wellness_centre },
  ...businessCategories.map(category => ({
    name: category,
    icon: categoryToIcon[category as BusinessCategory]
  }))
];

export default function DealsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [deals, setDeals] = useState<DealItem[]>([]);

  useEffect(() => {
    const fetchAllDeals = async () => {
      const deals = await fetchDeals(1, 50, null, searchQuery || null);
      setDeals(deals.items ?? []);
    };
    const debouncedFetch = setTimeout(() => {
      fetchAllDeals();
    }, 1000);

    return () => clearTimeout(debouncedFetch);
  }, [searchQuery]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="relative flex-grow">
        <div className="relative">
          {/* Hero Section with Gradient */}
          <div className="relative flex items-center justify-center overflow-hidden">
            <AnimatedGradient />
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="text-center z-10 space-y-4 text-white pt-32 p-16">
              <h1 className="text-4xl font-bold">Exclusive Deals</h1>
              <p className="max-w-xl mx-auto">
                Discover amazing offers from top-rated local businesses. Save big on your favorite services.
              </p>
              <div className="relative w-full md:w-[500px] mx-auto">
                <div className="relative w-full flex items-center justify-center">
                  <Command className="rounded-full border bg-white">
                    <div className="flex items-center px-3 space-x-2">
                      <Search className="h-4 w-4 shrink-0 opacity-50 text-black" />
                      <input
                        id="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-black"
                        placeholder="Search deals..."
                      />
                    </div>
                  </Command>
                  <Button
                    onClick={handleSearch}
                    className="absolute right-1.5 bg-black hover:bg-gray-900 text-white font-medium px-5 rounded-full"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="p-16 relative z-10 space-y-6">
            {/* Categories */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-12 gap-4">
              {CATEGORIES.map((category, index) => (
                <div key={index} className="flex-shrink-0">
                  <Button
                    variant="outline"
                    className="w-full h-[80px] flex flex-col items-center justify-center p-2 space-y-2 transition-all duration-300 hover:scale-105 border bg-white"
                  >
                    <CategoryIcon icon={category.icon} className="w-5 h-5" />
                    <span className="text-xs font-medium text-gray-700 text-center truncate w-full">
                      {category.name}
                    </span>
                  </Button>
                </div>
              ))}
            </div>

            {/* Deals Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
              {deals.map((deal, index) => (
                <DealCard key={index} deal={deal} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <FooterWrapper />
    </div>
  );
}