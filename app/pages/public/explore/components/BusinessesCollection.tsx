"use client";

import { businesses, businessOffers } from "@/data/mock"
import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Star, Crown, Sparkles, Percent, Users, Clock, User, Heart, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion";
import { useState } from "react"

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

// Helper function to check if a business is new (less than 30 days old)
function isNewBusiness(createdAt: Date): boolean {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return createdAt > thirtyDaysAgo;
}

const tiranaLocations = [
  "Rruga Myslym Shyri",
  "Blloku",
  "Rruga e Kavajës",
  "Rruga e Durrësit",
  "Rruga Ibrahim Rugova",
  "Rruga Sami Frashëri",
  "21 Dhjetori",
  "Selita",
  "Kombinat",
  "Rruga e Elbasanit",
  "Tirana e Re",
  "Kodra e Diellit",
  "Porcelan",
  "Xhamlliku",
  "Ali Demi"
];

// Helper function to get a random location
function getRandomLocation(): string {
  return tiranaLocations[Math.floor(Math.random() * tiranaLocations.length)];
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

  // Get businesses with offers
  const businessesWithOffers = filteredBusinesses
    .filter(business => businessOffers.some(offer => offer.businessId === business.id))
    .slice(0, 6);

  // Get most popular businesses (based on review count)
  const mostPopularBusinesses = [...filteredBusinesses]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 6);

  // Get premium businesses
  const premiumBusinesses = filteredBusinesses
    .filter(business => business.isPremium)
    .slice(0, 6);

  // Get luxury experiences (high-end, premium services)
  const luxuryBusinesses = filteredBusinesses
    .filter(business => business.priceRange.length >= 3 && business.rating >= 4.5)
    .slice(0, 6);

  // Get 24/7 services
  const alwaysOpenBusinesses = filteredBusinesses
    .filter(business => business.hours?.["24/7"])
    .slice(0, 6);

  // Get services for men
  const menServices = filteredBusinesses
    .filter(business => 
      business.category === "Barbershop" || 
      business.tags?.includes("For Men") ||
      business.category === "Personal Trainer"
    )
    .slice(0, 6);

  // Get services for women
  const womenServices = filteredBusinesses
    .filter(business => 
      business.category === "Beauty Salon" || 
      business.tags?.includes("For Women") ||
      business.category === "Nail Salon"
    )
    .slice(0, 6);

  // Get all businesses (limited to 6 for the preview)
  const previewBusinesses = filteredBusinesses.slice(0, 6);

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

  const BusinessCard = ({ business }: { business: typeof businesses[0] }) => {
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = (e: React.MouseEvent) => {
      e.preventDefault(); // Prevent Link navigation
      setIsSaved(!isSaved);
    };

    return (
    <motion.div variants={itemVariants}>
      <Link 
        href={`/pages/private/business/dashboard/${business.id}`} 
        className="group block h-full"
      >
        <Card className={`overflow-hidden h-full transition-all duration-300 hover:shadow-lg border ${
          business.isPremium ? 'border-amber-200 hover:border-amber-300' : 'border-gray-100 hover:border-gray-200'
        }`}>
          <div className="aspect-[4/3] overflow-hidden relative border-b border-gray-100">
            <Image 
              src={business.imageUrl} 
              alt={business.name} 
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-3 right-3 z-10">
              <Badge 
                variant="secondary"
                onClick={handleSave}
                className={`w-6 h-6 rounded-full p-0 justify-center bg-white/40 hover:bg-white/80 backdrop-blur-sm font-medium text-xs flex items-center cursor-pointer transition-colors ${
                  isSaved ? 'text-rose-600' : 'text-neutral-900 hover:text-rose-600'
                }`}
              >
                <Heart className="w-3.5 h-3.5" fill={isSaved ? "currentColor" : "none"} />
              </Badge>
            </div>
            <div className="absolute bottom-3 left-3 z-10">
              <Badge 
                variant="secondary"
                className="bg-white/90 backdrop-blur-sm text-neutral-900 border-neutral-200/50 font-medium text-xs flex items-center px-2 py-1"
              >
                {business.category}
              </Badge>
            </div>
            <div className="absolute bottom-3 right-3 z-10 flex flex-row gap-2">
              {isNewBusiness(new Date(business.createdAt)) && (
                <Badge 
                  variant="secondary"
                  className="bg-emerald-100/90 backdrop-blur-sm text-emerald-800 border-emerald-200/50 font-medium text-xs flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> New
                </Badge>
              )}
              {!business.isPremium && businessOffers.some(offer => offer.businessId === business.id) && (
                <Badge 
                  variant="secondary"
                  className="w-6 h-6 rounded-full px-1 justify-center bg-blue-100/90 backdrop-blur-sm text-blue-800 border-blue-200/50 font-medium text-xs flex items-center"
                >
                  <Percent className="w-3 h-3" />
                </Badge>
              )}
              {business.isPremium && (
                <Badge 
                  variant="secondary"
                  className="w-6 h-6 rounded-full px-1 justify-center bg-amber-100/90 backdrop-blur-sm text-amber-800 border-amber-200/50 font-medium text-xs flex items-center"
                >
                  <Crown className="w-3 h-3" />
                </Badge>
              )}
            </div>
          </div>

          <CardContent className={`p-3 ${business.isPremium ? 'bg-gradient-to-b from-amber-50/50 to-transparent' : ''}`}>
            <div className="space-y-3">
              <div className="space-y-2">
                <h3 className="text-sm md:text-base font-semibold line-clamp-1">
                  {business.name}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center space-x-1 text-neutral-500 max-w-[200px]">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="text-xs truncate">{getRandomLocation()}, {business.location.city}</span>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-neutral-600 line-clamp-2 min-h-[2.5rem] md:min-h-[3rem] leading-[1.25rem] md:leading-[1.5rem]">
                  {business.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-medium text-neutral-900">
                    {business.rating.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-neutral-500">
                  <Users className="w-3 h-3" />
                  <span className="text-xs">{business.reviewCount}</span>
                </div>
              </div>

              <div className="flex items-center space-x-0.5">
                {Array.from(business.priceRange).map((_, index) => (
                  <span
                    key={index}
                    className={`text-[10px] font-medium ${
                      business.isPremium ? 'text-amber-600' : 'text-neutral-900'
                    }`}
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
  );
};

  return (
    <div className="space-y-8">
      {premiumBusinesses.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Premium Businesses</h2>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                <Crown className="w-3 h-3 mr-1" /> 
                {filteredBusinesses.filter(b => b.isPremium).length} Premium
              </Badge>
            </div>
            <Link 
              href="/pages/public/explore/premium" 
              className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1 transition-colors"
            >
              View all
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6"
          >
            {premiumBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </motion.div>
        </section>
      )}

      {businessesWithOffers.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Special Offers</h2>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <Percent className="w-3 h-3 mr-1" /> 
                {filteredBusinesses.filter(b => businessOffers.some(o => o.businessId === b.id)).length} Offers
              </Badge>
            </div>
            <Link 
              href="/pages/public/explore/offers" 
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors"
            >
              View all
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6"
          >
            {businessesWithOffers.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </motion.div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Most Popular</h2>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              <Users className="w-3 h-3 mr-1" /> 
              {filteredBusinesses.length} Total
            </Badge>
          </div>
          <Link 
            href="/pages/public/explore/popular" 
            className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1 transition-colors"
          >
            View all
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6"
        >
          {mostPopularBusinesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </motion.div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">All Businesses</h2>
            <Badge variant="secondary" className="bg-neutral-100 text-neutral-800">
              {filteredBusinesses.length} Total
            </Badge>
          </div>
          <Link 
            href="/pages/public/explore/all" 
            className="text-sm text-neutral-600 hover:text-neutral-700 font-medium flex items-center gap-1 transition-colors"
          >
            View all
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6"
        >
          {previewBusinesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </motion.div>
      </section>

      {luxuryBusinesses.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Luxury Experiences</h2>
              <Badge variant="secondary" className="bg-rose-100 text-rose-800">
                <Star className="w-3 h-3 mr-1 fill-rose-800" /> 
                Premium Services
              </Badge>
            </div>
            <Link 
              href="/pages/public/explore/luxury" 
              className="text-sm text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1 transition-colors"
            >
              View all
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6"
          >
            {luxuryBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </motion.div>
        </section>
      )}

      {alwaysOpenBusinesses.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">24/7 Services</h2>
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
                <Clock className="w-3 h-3 mr-1" /> 
                Always Open
              </Badge>
            </div>
            <Link 
              href="/pages/public/explore/24-7" 
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 transition-colors"
            >
              View all
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6"
          >
            {alwaysOpenBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </motion.div>
        </section>
      )}

      {menServices.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">For Men</h2>
              <Badge variant="secondary" className="bg-slate-100 text-slate-800">
                <User className="w-3 h-3 mr-1" /> 
                Men&apos;s Services
              </Badge>
            </div>
            <Link 
              href="/pages/public/explore/men" 
              className="text-sm text-slate-600 hover:text-slate-700 font-medium flex items-center gap-1 transition-colors"
            >
              View all
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6"
          >
            {menServices.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </motion.div>
        </section>
      )}

      {womenServices.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">For Women</h2>
              <Badge variant="secondary" className="bg-pink-100 text-pink-800">
                <User className="w-3 h-3 mr-1" /> 
                Women&apos;s Services
              </Badge>
            </div>
            <Link 
              href="/pages/public/explore/women" 
              className="text-sm text-pink-600 hover:text-pink-700 font-medium flex items-center gap-1 transition-colors"
            >
              View all
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6"
          >
            {womenServices.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </motion.div>
        </section>
      )}
    </div>
  )
} 