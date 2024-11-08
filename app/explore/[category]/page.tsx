"use client";

import { useState } from 'react';
import { businesses } from '@/data/businesses';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Search, X } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: {
    category: string;
  }
}

export default function CategoryPage({ params }: PageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const categorySlug = params.category;
  const categoryName = categorySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace('And', '&');

  const categoryBusinesses = businesses.filter(
    business => business.category.toLowerCase() === categoryName.toLowerCase()
  );

  const filteredBusinesses = categoryBusinesses.filter(business =>
    business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[400px] bg-gray-500">
          <div className="absolute inset-0">
            <div className="relative w-full h-full">
              <video 
                className="absolute inset-0 w-full h-full object-cover" 
                crossOrigin="" 
                playsInline 
                muted 
                autoPlay
                loop
                src="https://videos.pexels.com/video-files/3753716/3753716-uhd_2560_1440_25fps.mp4" 
                preload="metadata"
              >
                <track kind="metadata" label="cuepoints" />
              </video>
              <div className="absolute inset-0 bg-black bg-opacity-40">
                <div className="h-full flex flex-col items-center justify-center px-4">
                  <h1 className="text-4xl font-bold text-white mb-8">{categoryName}</h1>
                  <div className="w-full max-w-2xl">
                    <div className="relative flex items-center bg-white rounded-full">
                      <div className="relative flex-grow">
                        <input
                          type="text"
                          placeholder={`Search ${categoryName.toLowerCase()}...`}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="rounded-full w-full px-4 py-3 pl-10 pr-10 text-black bg-white border border-transparent focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" size={20} />
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm('')}
                            className="absolute right-24 top-1/2 transform -translate-y-1/2 text-black"
                          >
                            <X size={20} />
                          </button>
                        )}
                      </div>
                      <Button 
                        className="absolute right-1.5 bg-black hover:bg-gray-900 text-white font-medium px-5 rounded-full"
                      >
                        Search
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Cards Section */}
        <div className="px-8 py-12 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredBusinesses.length > 0 ? (
              filteredBusinesses.map((business) => (
                <Card key={business.id} className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                  <div className="h-48 overflow-hidden relative">
                    <img src={business.imageUrl} alt={business.name} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="pt-4">
                    <CardTitle className="text-xl pb-2">{business.name}</CardTitle>
                    <p className="text-gray-600 mb-4">{business.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        {business.rating.toFixed(1)}
                      </span>
                      <span className="flex items-center space-x-1">
                        {['$', '$$', '$$$', '$$$$'].map((price, index) => (
                          <span
                            key={index}
                            className={`${
                              business.priceRange.length > index
                                ? 'font-bold text-gray-600'
                                : 'text-gray-400'
                            }`}
                          >
                            $
                          </span>
                        ))}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/business/${business.id}`} className="w-full">
                      <Button className="w-full">
                        Book Now
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
                <p className="text-gray-500">Try adjusting your search to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 