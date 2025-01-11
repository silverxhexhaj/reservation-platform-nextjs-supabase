"use client";


import { Badge } from "@/app/components/ui/badge"
import { Star, Crown, Sparkles, Percent, Users, Clock, User, Heart, MapPin } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion";
import { useEffect, useState } from "react"
import { containerVariants } from "@/app/models/transitionEffects.models";
import { BusinessCard } from "@/app/components/business/BusinessCard";


import { fetchBusinessesWithFilters, loadInitialBusinesses } from "@/app/service/business/business.service";
import { BusinessSummary, LoadInitialBusinessesResponse } from "@/app/models/functions/businessSummary.model";

interface BusinessesCollectionProps {
  searchParams?: {
    category: string | null
    search: string | null
  }
}


export function BusinessesCollection({ searchParams }: BusinessesCollectionProps) {

  const [filteredBusinesses, setFilteredBusinesses] = useState<BusinessSummary[]>([]);
  const [businesses, setBusinesses] = useState<LoadInitialBusinessesResponse>({
    popular: [],
    all_businesses: [],
    for_women: [],
    for_men: [],
    premium: []
  });


  useEffect(() => {
    const debouncedFetch = async () => {
      const businesses = await fetchBusinessesWithFilters({
        searchTerm: searchParams?.search,
        selectedCategory: searchParams?.category,
        limit: 25,
        offset: 0
      });

      if (!!searchParams?.category || !!searchParams?.search) {
        setFilteredBusinesses(businesses);
      }
    }

    const timeoutId = setTimeout(debouncedFetch, 500);
    return () => clearTimeout(timeoutId);
  }, [searchParams?.category, searchParams?.search]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      const businesses = await loadInitialBusinesses();
      setBusinesses(businesses);
    }

    if (!searchParams?.category && !searchParams?.search) {
      fetchBusinesses();
    }
  }, []);


  if (businesses?.all_businesses?.length === 0 && filteredBusinesses?.length === 0) {
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
          {(businesses?.premium?.length ?? 0) > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">Premium Businesses</h2>
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                    <Crown className="w-3 h-3 mr-1" />
                    {businesses.premium?.length} Premium
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
                {businesses.premium?.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </motion.div>
            </section>
          )}

          {(businesses?.popular?.length ?? 0) > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">Most Popular</h2>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    <Users className="w-3 h-3 mr-1" />
                    {businesses.popular?.length} Total
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
                {businesses.popular?.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </motion.div>
            </section>
          )}

          {(businesses?.all_businesses?.length ?? 0) > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">All Businesses</h2>
                  <Badge variant="secondary" className="bg-neutral-100 text-neutral-800">
                    {businesses.all_businesses?.length} Total
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
                {businesses.all_businesses?.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </motion.div>
            </section>
          )}

          {(businesses?.for_men?.length ?? 0) > 0 && (
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
                {businesses.for_men?.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </motion.div>
            </section>
          )}

          {(businesses?.for_women?.length ?? 0) > 0 && (
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
                {businesses.for_women?.map((business) => (
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
            {filteredBusinesses?.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </motion.div>
        </>
      )}
    </div>
  )
} 