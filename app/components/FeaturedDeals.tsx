"use client";

import { FeaturedDealCard } from "./FeaturedDealCard";
import { businesses } from "@/data/mock";
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
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

export function FeaturedDeals() {
  // Get businesses with offers
  const businessesWithOffers = businesses.filter(business => business.offers && business.offers.length > 0);

  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-16 bg-white"
    >
      <div className="max-w-screen-2xl mx-auto px-8">
        <motion.h2 
          variants={itemVariants}
          className="text-3xl font-bold text-center mb-12 text-neutral-900"
        >
          Featured Deals
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businessesWithOffers.map((business) => (
            business.offers?.map((offer) => (
              <motion.div 
                key={`${business.id}-${offer.id}`}
                variants={itemVariants}
              >
                <FeaturedDealCard 
                  business={business} 
                  offer={offer}
                />
              </motion.div>
            ))
          ))}
        </div>
      </div>
    </motion.section>
  );
} 