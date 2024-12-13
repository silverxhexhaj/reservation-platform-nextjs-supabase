"use client";

import { useState } from 'react';
import { businesses } from '@/data/mock';
import { Header } from '@/app/components/Header';
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Star, Search, X } from 'lucide-react';
import Link from 'next/link';
import { Badge } from "@/app/components/ui/badge";
import Image from 'next/image';

interface PageProps {
  params: {
    category: string;
  }
}

export default function CategoryPage({ params }: PageProps) {
  const [user, setUser] = useState<{ username: string } | null>(null);
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
      <Header user={user} />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[400px]">
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
              <div 
                className="absolute inset-0 mix-blend-overlay opacity-40"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-red-700/40 to-pink-700/40 flex items-center justify-center opacity-80">
                <div className="text-center space-y-4">
                  <h1 className="text-4xl font-bold text-white mb-4">{categoryName}</h1>
                  <div className="w-full max-w-2xl mx-auto px-4">
                    <div className="relative flex items-center bg-white rounded-full">
                      <div className="relative flex-grow">
                        <input
                          type="text"
                          placeholder={`Search ${categoryName.toLowerCase()}...`}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full rounded-full px-4 py-3 pl-10 pr-10 text-black bg-white border border-transparent focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
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
        <div className="max-w-screen-2xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {filteredBusinesses.length > 0 ? (
              filteredBusinesses.map((business) => (
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
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Can&apos;t find what you&apos;re looking for? Try adjusting your filters or search terms.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 