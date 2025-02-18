"use client";

import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Search } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { AnimatedGradient } from "@/app/components/gradient/AnimatedGradient";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { CategoryIcon } from "@/app/components/CategoryIcon";
import { categoryToIcon } from "@/data";
import { businessCategories, BusinessCategory } from '@/app/models/supabase.models';
import { motion } from "framer-motion";
import { Command } from "@/app/components/ui/command";
import { itemVariants } from "@/app/models/transitionEffects.models";
import { useState, useEffect } from "react";

// Static data for deals
const DEALS = [
  {
    id: 1,
    title: "Summer Special Massage",
    description: "60-minute relaxation massage with aromatherapy",
    originalPrice: 120,
    discountedPrice: 89,
    category: "Wellness",
    expiresAt: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours from now
    business: {
      name: "Zen Spa & Wellness",
      rating: 4.8,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=60"
    }
  },
  {
    id: 2,
    title: "Haircut & Style Package",
    description: "Professional haircut, wash, and styling",
    originalPrice: 85,
    discountedPrice: 59,
    category: "Hair",
    expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    business: {
      name: "Elite Hair Studio",
      rating: 4.9,
      reviews: 243,
      image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&auto=format&fit=crop&q=60"
    }
  },
  {
    id: 3,
    title: "Dental Cleaning Special",
    description: "Complete dental cleaning and check-up",
    originalPrice: 200,
    discountedPrice: 149,
    category: "Dental",
    expiresAt: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
    business: {
      name: "Bright Smile Dental",
      rating: 4.7,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&auto=format&fit=crop&q=60"
    }
  },
  {
    id: 4,
    title: "Full Body Facial",
    description: "Luxurious facial treatment with premium products",
    originalPrice: 150,
    discountedPrice: 99,
    category: "Beauty",
    expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
    business: {
      name: "Glow Beauty Lab",
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=60"
    }
  },
  {
    id: 5,
    title: "Personal Training Sessions",
    description: "5 sessions with certified personal trainer",
    originalPrice: 300,
    discountedPrice: 199,
    category: "Fitness",
    expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    business: {
      name: "Peak Performance Gym",
      rating: 4.8,
      reviews: 92,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=60"
    }
  },
  {
    id: 6,
    title: "Teeth Whitening Treatment",
    description: "Professional grade teeth whitening session",
    originalPrice: 250,
    discountedPrice: 175,
    category: "Dental",
    expiresAt: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
    business: {
      name: "Pearl Dental Care",
      rating: 4.6,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop&q=60"
    }
  },
  {
    id: 7,
    title: "Hot Stone Massage",
    description: "90-minute therapeutic hot stone massage",
    originalPrice: 160,
    discountedPrice: 119,
    category: "Wellness",
    expiresAt: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), // 25 days from now
    business: {
      name: "Tranquility Spa",
      rating: 4.9,
      reviews: 214,
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=60"
    }
  },
  {
    id: 8,
    title: "Hair Color & Highlights",
    description: "Full color treatment with partial highlights",
    originalPrice: 180,
    discountedPrice: 129,
    category: "Hair",
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    business: {
      name: "Color Bar Studio",
      rating: 4.7,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=60"
    }
  },
  {
    id: 9,
    title: "CrossFit Membership",
    description: "1-month unlimited CrossFit classes",
    originalPrice: 200,
    discountedPrice: 149,
    category: "Fitness",
    expiresAt: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000), // 35 days from now
    business: {
      name: "CrossFit Zone",
      rating: 4.8,
      reviews: 143,
      image: "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=800&auto=format&fit=crop&q=60"
    }
  },
  {
    id: 10,
    title: "Anti-Aging Facial",
    description: "Premium anti-aging treatment with collagen boost",
    originalPrice: 180,
    discountedPrice: 135,
    category: "Beauty",
    expiresAt: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000), // 40 days from now
    business: {
      name: "Eternal Beauty Spa",
      rating: 4.9,
      reviews: 198,
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&auto=format&fit=crop&q=60"
    }
  },
  {
    id: 11,
    title: "Deep Tissue Massage",
    description: "75-minute therapeutic deep tissue massage",
    originalPrice: 140,
    discountedPrice: 99,
    category: "Wellness",
    expiresAt: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
    business: {
      name: "Healing Hands Massage",
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&auto=format&fit=crop&q=60"
    }
  },
  {
    id: 12,
    title: "Invisalign Consultation",
    description: "Comprehensive consultation with 3D scanning",
    originalPrice: 300,
    discountedPrice: 199,
    category: "Dental",
    expiresAt: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000), // 50 days from now
    business: {
      name: "Modern Orthodontics",
      rating: 4.8,
      reviews: 112,
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=60"
    }
  }
];

// Categories with their respective icons
const CATEGORIES = [
  { name: 'All categories', icon: categoryToIcon.wellness_centre },
  ...businessCategories.slice(0, 11).map(category => ({
    name: category.replace(/_/g, ' '),
    icon: categoryToIcon[category as BusinessCategory]
  }))
];

// Add interface for Deal type
interface Deal {
  id: number;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  category: string;
  expiresAt: Date;
  business: {
    name: string;
    rating: number;
    reviews: number;
    image: string;
  };
}

// Add CountdownTimer component
function CountdownTimer({ expiresAt }: { expiresAt: Date }) {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = expiresAt.getTime() - now;

      if (distance < 0) {
        setTimeLeft('Expired');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      const formatUnit = (value: number, unit: string) => 
        `${value} ${unit}${value !== 1 ? 's' : ''}`;

      if (days > 0) {
        setTimeLeft(`${formatUnit(days, 'day')}${hours > 0 ? `, ${formatUnit(hours, 'hour')}` : ''}`);
      } else if (hours > 0) {
        setTimeLeft(`${formatUnit(hours, 'hour')}${minutes > 0 ? `, ${formatUnit(minutes, 'minute')}` : ''}`);
      } else if (minutes > 0) {
        setTimeLeft(formatUnit(minutes, 'minute'));
      } else {
        setTimeLeft('Less than a minute');
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000 * 60); // Update every minute

    return () => clearInterval(timer);
  }, [expiresAt]);

  return (
    <Badge 
      variant="outline" 
      className="absolute right-3 bottom-3 bg-gradient-to-r from-red-500 to-red-600 text-white border-red-400/20 font-medium text-xs px-2 py-1 shadow-lg shadow-red-500/20 backdrop-blur-sm"
    >
      {timeLeft}
    </Badge>
  );
}

export default function DealsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="relative">
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
                          className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-black"
                          placeholder="Search deals..."
                        />
                      </div>
                    </Command>
                    <Button
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
              {CATEGORIES.map((category) => (
                <div key={category.name} className="flex-shrink-0">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-$ lg:grid-cols-5 gap-6 mb-12">
              {DEALS.map((deal) => (
                <Card key={deal.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative h-48 w-full">
                    <img
                      src={deal.business.image}
                      alt={deal.business.name}
                      className="object-cover w-full h-full rounded-t-lg"
                    />
                    <div className="absolute bottom-3 left-3 z-10">
                      <Badge variant="outline" className="rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-secondary/80 bg-white/90 backdrop-blur-sm text-neutral-900 border-neutral-200/50 font-medium text-xs flex items-center px-2 py-1">
                        {deal.category}
                      </Badge>
                    </div>
                    <CountdownTimer expiresAt={deal.expiresAt} />
                  </div>
                  <CardHeader className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{deal.title}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {deal.business.name}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{deal.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">${deal.discountedPrice}</span>
                      <span className="text-gray-500 line-through text-sm">
                        ${deal.originalPrice}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>⭐ {deal.business.rating}</span>
                      <span>•</span>
                      <span>{deal.business.reviews} reviews</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 