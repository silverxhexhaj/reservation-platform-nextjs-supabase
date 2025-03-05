"use client";

import { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Button } from "./components/ui/button";
import { Search, X, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { CategoryIcon } from './components/CategoryIcon';
import { motion } from 'framer-motion'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/app/components/ui/command"
import { businessCategories, BusinessCategory } from '@/app/models/supabase.models';
import { categoryToIcon } from '@/data';
import { BusinessCard } from './components/business/BusinessCard';
import { OfferCard } from './components/OfferCard';
import { itemVariants } from '@/app/models/transitionEffects.models';
import { fetchHomePageBusinesses } from './service/business/business.service';
import { HomePageBusinesses } from './models/functions/homePageBusinesses.models';
import { AnimatedGradient } from './components/gradient/AnimatedGradient';
import { FooterWrapper } from './components/FooterWrapper';



export default function HomePage() {

  const [searchTerm, setSearchTerm] = useState('');
  const [homePageBusinesses, setHomePageBusinesses] = useState<HomePageBusinesses | null>(null);
  const [showCategorySearch, setShowCategorySearch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const businesses = await fetchHomePageBusinesses();
        setHomePageBusinesses(businesses);
      } catch (error) {
        console.error('Error fetching businesses:', error);
      }
    };

    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowCategorySearch(false);
      }
    }

    fetchBusinesses();

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {

  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setHomePageBusinesses(null);
  };

  const handleInputFocus = () => {
    setShowCategorySearch(true);
  };


  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="relative">
        {/* Hero Section */}
        <div className="px-4 md:px-8 pt-32 pb-16 w-full relative justify-center">
          <motion.div
            className='relative z-10 flex flex-col space-y-12'
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className='flex flex-col justify-end items-center space-y-4 flex-1'>
              <div
                className="flex justify-center"
              >
                <span className="px-4 py-1.5 bg-white bg-opacity-10 backdrop-blur-xs rounded-full text-white text-sm font-medium transition-all duration-300 hover:bg-opacity-20">
                  1# Choice in Albania
                </span>
              </div>
              <div className=''>
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-white flex flex-col space-y-2">
                  <span>Discover, Book, Relax</span>
                  <span>Beauty and Wellness Made Easy.</span>
                </h1>
              </div>
              <div className="relative w-full md:w-[500px]">
                <div className="relative w-full flex items-center justify-center" ref={searchContainerRef}>
                  <Command className="rounded-full border bg-white shadow-md">
                    <div className="flex items-center px-3 space-x-2">
                      <Search className="h-4 w-4 shrink-0 opacity-50" />
                      <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                        onFocus={handleInputFocus}
                        className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder={'Search businesses...'}
                      />
                      {(searchTerm || selectedCategory) && (
                        <button
                          onClick={clearSearch}
                          className="text-muted-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    {showCategorySearch && (
                      <div className="absolute top-[calc(100%+4px)] left-0 right-0 rounded-2xl border bg-white shadow-md z-50 overflow-hidden">
                        <CommandList className="max-h-[300px] overflow-auto py-1">
                          <CommandEmpty>No results found.</CommandEmpty>
                          <CommandGroup heading="Categories">
                            {businessCategories.map((category, index) => (
                              <CommandItem
                                key={category}
                                value={category}
                                onSelect={(value) => {
                                  setSelectedCategory(value);
                                  setShowCategorySearch(false);
                                  handleSearch();
                                }}
                                className="flex items-center gap-2 cursor-pointer px-2 py-2 hover:bg-gray-50 border-b last:border-b-0 border-gray-200"
                              >
                                <CategoryIcon icon={categoryToIcon[category]} className="h-4 w-4" />
                                <span>{category}</span>
                                {selectedCategory === category && (
                                  <CheckCircle className="h-4 w-4 ml-auto text-green-500" />
                                )}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </div>
                    )}
                  </Command>
                  <Button
                    onClick={handleSearch}
                    className="absolute right-1.5 bg-black hover:bg-gray-900 text-white font-medium px-5 rounded-full"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
            {/* Categories Section */}
            <div
              className="flex-1 w-full flex justify-center items-end md:items-start"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-12 gap-4">
                {businessCategories.slice(0, 11).map((category, index) => {
                  const slug = category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-');
                  return (
                    <div
                      key={category}
                      className="flex-shrink-0"
                    >
                      <Link
                        href={`/pages/public/explore?category=${slug}`}
                        className="flex-shrink-0 w-[120px] lg:w-auto"
                      >
                        <Button
                          variant="outline"
                          className="w-full h-[80px] flex flex-col items-center justify-center p-2 space-y-2 transition-all duration-300 hover:scale-105 border bg-white bg-opacity-10 backdrop-blur-xs hover:bg-opacity-20 border-white border-opacity-20"
                        >
                          <CategoryIcon icon={categoryToIcon[category as BusinessCategory]} className="w-5 h-5 text-white" />
                          <span className="text-xs font-medium text-white text-center truncate w-full">
                            {category.replace(/_/g, ' ')}
                          </span>
                        </Button>
                      </Link>
                    </div>
                  );
                })}
                <div className="flex-shrink-0">
                  <Link href="/pages/public/explore" className="block w-[120px] lg:w-auto">
                    <Button
                      variant="outline"
                      className="w-full h-[80px] flex flex-col items-center justify-center p-2 space-y-2 transition-all duration-300 hover:scale-105 border bg-white bg-opacity-10 backdrop-blur-xs hover:bg-opacity-20 border-white border-opacity-20"
                    >
                      <LayoutGrid className="w-5 h-5 text-white" />
                      <span className="text-xs font-medium text-white text-center truncate w-full">
                        All Categories
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
          <div className='absolute inset-0'>
            <div className="relative w-full h-full">
              <AnimatedGradient />
              <div
                className="absolute inset-0 mix-blend-overlay opacity-40"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
              />
            </div>
          </div>
        </div>
        {/* Business Sections */}
        <div className="px-4 md:px-8 py-16">
          <div className="space-y-12">

            <section>
              <div>
                <h2 className="text-3xl font-bold mb-6 text-neutral-900">
                  New on Platform
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                  {homePageBusinesses?.new_businesses?.map((business) => (
                    <BusinessCard key={business.id} business={business} />
                  ))}
                </div>
              </div>
            </section>
            <section>
              <div>
                <h2 className="text-3xl font-bold mb-6 text-neutral-900">
                  Our Top Businesses
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                  {homePageBusinesses?.top_businesses?.map((business) => (
                    <BusinessCard key={business.id} business={business} />
                  ))}
                </div>
              </div>
            </section>

            <section>
              <div>
                <h2 className="text-3xl font-bold mb-6 text-neutral-900">
                  Special Offers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                  {homePageBusinesses?.special_offers?.map((offer) => (
                    <OfferCard key={offer?.deal?.id} offer={offer?.deal} business={offer?.business} />
                  ))}
                </div>
              </div>
            </section>

            <section>
              <div>
                <h2 className="text-3xl font-bold mb-6 text-neutral-900">
                  Best Rated
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                  {homePageBusinesses?.best_rated?.map((business) => (
                    <BusinessCard key={business.id} business={business} />
                  ))}
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
      <FooterWrapper />
    </div>
  );
}
