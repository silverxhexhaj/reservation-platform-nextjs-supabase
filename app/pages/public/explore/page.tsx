"use client";

import { useState, Suspense } from "react"
import { Header } from "@/app/components/Header"
import { BusinessesCollection } from "./components/BusinessesCollection"
import { ExploreFilters } from "./components/ExploreFilters"
import { categories } from "@/data";

export default function ExplorePage() {
  const [user, setUser] = useState<{ username: string } | null>(null);

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
                  <h1 className="text-4xl font-bold text-white mb-4">Explore Businesses</h1>
                  <p className="text-xl text-white/90 max-w-2xl mx-auto px-4">
                    Discover and book services from local businesses
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-screen-2xl mx-auto px-4 py-12 space-y-8">
          {/* Filters */}
          <div className="w-full">
            <Suspense fallback={<div>Loading filters...</div>}>
              <ExploreFilters categories={[...categories]} />
            </Suspense>
          </div>

          {/* Business Collection */}
          <div className="w-full">
            <Suspense fallback={<div>Loading businesses...</div>}>
              <BusinessesCollection searchParams={{
                category: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('category') ?? undefined : undefined,
                search: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('search') ?? undefined : undefined
              }} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
} 