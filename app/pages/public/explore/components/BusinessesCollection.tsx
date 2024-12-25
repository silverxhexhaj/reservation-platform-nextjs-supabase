"use client";

import { businesses, businessOffers } from "@/data/mock"
import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Star, Crown, Sparkles, Percent, Users, Clock, User, Heart, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion";
import { useEffect, useState } from "react"
import { itemVariants, containerVariants } from "@/app/models/transitionEffects.models";
import { BusinessCard } from "@/app/components/BusinessCard";


interface BusinessesCollectionProps {
  searchParams?: {
    category: string | null
    search: string | null
  }
}

function isNewBusiness(createdAt: Date): boolean {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return createdAt > thirtyDaysAgo;
}

export function BusinessesCollection({ searchParams }: BusinessesCollectionProps) {

  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses);

  useEffect(() => {
    const filtered = businesses.filter(business => {
      const matchesCategory = !searchParams?.category ||
        searchParams.category === 'all' ||
        business.category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-') === searchParams.category;

      const matchesSearch = !searchParams?.search ||
        business.name.toLowerCase().includes(searchParams.search.toLowerCase()) ||
        business.description?.toLowerCase().includes(searchParams.search.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    setFilteredBusinesses(filtered);
  }, [searchParams?.category, searchParams?.search]);


  // Get businesses with offers
  const businessesWithOffers = filteredBusinesses
    .filter(business => businessOffers.some(offer => offer.business_id === business.id))
    .slice(0, 6);

  // Get most popular businesses (based on review count)
  const mostPopularBusinesses = [...filteredBusinesses]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 6);

  // Get premium businesses
  const premiumBusinesses = filteredBusinesses
    .filter(business => business.is_premium)
    .slice(0, 6);

  // Get luxury experiences (high-end, premium services)
  const luxuryBusinesses = filteredBusinesses
    .filter(business => business.price_range >= 3 && business.rating >= 4.5)
    .slice(0, 6);

  // Get 24/7 services
  const alwaysOpenBusinesses = filteredBusinesses
    .filter(business => business.hours?.["24/7"])
    .slice(0, 6);

  // Get services for men
  const menServices = filteredBusinesses
    .filter(business =>
      business.category === "barbershop" ||
      business.tags?.includes("For Men") ||
      business.category === "personal_trainer"
    )
    .slice(0, 6);

  // Get services for women
  const womenServices = filteredBusinesses
    .filter(business =>
      business.category === "beauty_salon" ||
      business.tags?.includes("for_women") ||
      business.category === "nail_salon"
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


  return (
    <div className="space-y-8">


      {(searchParams?.category == null && searchParams?.search == null) && (
        <>


          {premiumBusinesses.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">Premium Businesses</h2>
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                    <Crown className="w-3 h-3 mr-1" />
                    {filteredBusinesses.filter(b => b.is_premium).length} Premium
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
                    {businessesWithOffers.length} Offers
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
        </>
      )}

      {(searchParams?.category != null || searchParams?.search != null) && (
        <>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6"
          >
            {filteredBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </motion.div>
        </>
      )}
    </div>
  )
} 