"use client";

import { useState, useEffect, useRef, ReactElement, Suspense } from 'react';
import { Header } from './components/Header';
import { Button } from "./components/ui/button";
import { Search, Star, X,  LayoutGrid, Music, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'
import { businesses } from '@/data/mock';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog"
import { Calendar, Shield, CheckCircle, Lock } from 'lucide-react';
import { CategoryIcon } from './components/CategoryIcon';
import { motion } from 'framer-motion'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/app/components/ui/command"
import { Business, BusinessCategory, businessCategories } from '@/app/models/supabase.models';
import { categoryToIcon } from '@/data';
import { BusinessCard } from './components/BusinessCard';
import { OfferCard } from './components/OfferCard';
import { containerVariants, itemVariants } from '@/app/models/transitionEffects.models';
import { supabase } from '@/lib/supabase';

// Add these statistics
const platformStats = [
  { label: 'Active Users', value: '10,000+' },
  { label: 'Partner Businesses', value: '500+' },
  { label: 'Cities Covered', value: '15+' },
  { label: 'Bookings Made', value: '50,000+' }
];

// Add these features
const platformFeatures = [
  {
    title: 'Easy Booking',
    description: 'Book your favorite services in just a few clicks',
    icon: <Calendar className="w-6 h-6" />
  },
  {
    title: 'Verified Partners',
    description: 'All our partners are verified and trusted professionals',
    icon: <Shield className="w-6 h-6" />
  },
  {
    title: 'Instant Confirmation',
    description: 'Get immediate confirmation for your bookings',
    icon: <CheckCircle className="w-6 h-6" />
  },
  {
    title: 'Secure Payments',
    description: 'Safe and secure payment processing',
    icon: <Lock className="w-6 h-6" />
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Regular Customer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
    content: "Nooor has transformed how I book my beauty appointments. The platform is so intuitive and reliable!",
    rating: 5
  },
  {
    name: "Mark Davis",
    role: "Fitness Enthusiast",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    content: "Finding the right personal trainer was super easy with Nooor. The booking process is seamless.",
    rating: 5
  },
  {
    name: "Emma Wilson",
    role: "Beauty Professional",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
    content: "As a salon owner, Nooor has helped me reach more clients and manage my bookings efficiently.",
    rating: 5
  }
];

const socialProof = [
  { platform: "Instagram", followers: "50K+", handle: "@nooor" },
  { platform: "Facebook", followers: "35K+", handle: "NooorOfficial" },
  { platform: "TikTok", followers: "25K+", handle: "@nooor" }
];

// Update the businessOffers data with reliable image URLs
const businessOffers: BusinessOffer[] = [
  {
    id: '1',
    businessId: businesses[0].id,
    title: 'Summer Spa Package',
    description: 'Full body massage + facial treatment',
    originalPrice: 150,
    discountedPrice: 99,
    discountPercentage: 34,
    validUntil: '2024-08-31',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop'
  },
  {
    id: '2',
    businessId: businesses[1].id,
    title: 'Hair Transformation',
    description: 'Haircut + color + treatment',
    originalPrice: 200,
    discountedPrice: 149,
    discountPercentage: 25,
    validUntil: '2024-07-31',
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop'
  },
  {
    id: '3',
    businessId: businesses[2].id,
    title: 'Fitness Starter Pack',
    description: '1 month membership + 3 PT sessions',
    originalPrice: 300,
    discountedPrice: 199,
    discountPercentage: 33,
    validUntil: '2024-06-30',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop'
  }
];



export default function HomePage() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>(businesses);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState('Search businesses...');
  const [fadeOut, setFadeOut] = useState(false);
  const placeholderTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isClientSide, setIsClientSide] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCategorySearch, setShowCategorySearch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Add click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowCategorySearch(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Add this effect to handle client-side initialization
  useEffect(() => {
    setIsClientSide(true);
  }, []);

  useEffect(() => {
    if (!isClientSide) return;

    const changePlaceholder = () => {
      if (!isInputFocused) {
        setFadeOut(true);
        placeholderTimeoutRef.current = setTimeout(() => {
          setPlaceholderIndex((prevIndex) => (prevIndex + 1) % businessCategories.length);
          setPlaceholder(`Search for ${businessCategories[(placeholderIndex + 1) % businessCategories.length]}...`);
          setFadeOut(false);
        }, 200);
      }
    };

    const intervalId = setInterval(changePlaceholder, 1500);

    return () => {
      clearInterval(intervalId);
      if (placeholderTimeoutRef.current) {
        clearTimeout(placeholderTimeoutRef.current);
      }
    };
  }, [placeholderIndex, isInputFocused, isClientSide]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser({ username: user.user_metadata.username || user.email });
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setUser({ username: session.user.user_metadata.username || session.user.email });
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSearch = () => {
    const filtered = businesses.filter(business => 
      business?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (selectedCategory && business?.category?.toLowerCase() === selectedCategory.toLowerCase())
    );
    setFilteredBusinesses(filtered);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setFilteredBusinesses(businesses);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    setShowCategorySearch(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredBusinesses(businesses);
    }
  }, [searchTerm]);

  const topBusinesses = filteredBusinesses.sort((a, b) => b?.rating - a?.rating).slice(0, 5);


  return (
    <div className="min-h-screen font-sans bg-white flex flex-col">
      <Header user={user} />
      <main className="relative">
        {/* Hero Section */}
        <div className="p-8 flex relative h-screen">
          <motion.div 
            className='relative z-10 flex flex-col space-y-6 max-w-screen-2xl mx-auto'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className='flex flex-col justify-end items-center mx-auto space-y-4 flex-1'>
              <motion.div 
                variants={itemVariants}
                className="flex justify-center"
              >
                <span className="px-4 py-1.5 bg-white bg-opacity-10 backdrop-blur-xs rounded-full text-white text-sm font-medium transition-all duration-300 hover:bg-opacity-20">
                  1# Choice in Albania
                </span>
              </motion.div>
              <motion.div variants={itemVariants} className=''>
                <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center text-white flex flex-col space-y-2">
                  <span>Discover, Book, Relax</span>
                  <span>Beauty and Wellness Made Easy.</span>
                </h1>
              </motion.div>
              <motion.div variants={itemVariants} className="relative w-full md:w-[500px]">
                <div className="relative w-full flex items-center justify-center" ref={searchContainerRef}>
                  <Command className="rounded-full border bg-white shadow-md">
                    <div className="flex items-center px-3 space-x-2">
                      <Search className="h-4 w-4 shrink-0 opacity-50" />
                      <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder={isClientSide ? placeholder : 'Search businesses...'}
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
              </motion.div>
            </div>
            {/* Categories Section */}
            <motion.div 
              variants={itemVariants}
              className="max-w-screen-2xl mx-auto flex-1 pt-16 w-full flex justify-center items-end md:items-start"
            >
              <div className="space-y-6 w-full">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  {businessCategories.slice(0, 8).map((category, index) => {
                    const slug = category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-');
                    return (
                      <motion.div
                        key={category}
                        variants={itemVariants}
                        custom={index}
                      >
                        <Link 
                          href={`/pages/public/explore?category=${slug}`}
                          className="w-full h-[60px] flex items-center justify-center group bg-white bg-opacity-10 backdrop-blur-xs hover:bg-opacity-20 border border-white border-opacity-20 rounded-lg p-4 transition-all duration-300 hover:scale-105"
                        >
                          <div className="flex flex-col items-center text-center space-y-3">
                            <span className="text-white font-medium text-sm truncate">
                              {category}
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
                
                <motion.div 
                  variants={itemVariants}
                  className="flex justify-center"
                >
                  <Link href="/pages/public/explore">
                    <Button
                      variant="outline"
                      className="bg-white bg-opacity-5 hover:bg-opacity-10 text-white border-white border-opacity-20"
                    >
                      <LayoutGrid className="mr-2 h-4 w-4" /> All Categories
                    </Button>
                  </Link>
                </motion.div>

                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogContent className="max-w-4xl w-full h-[100dvh] p-0 md:h-auto md:max-h-[80vh] md:p-6 overflow-y-auto bg-white">
                    <div className="flex flex-col h-full md:h-auto">
                      {/* Header - Fixed at top */}
                      <DialogHeader className="sticky top-0 z-10 bg-white border-b p-4 md:p-0 md:border-none">
                        <div className="flex items-center justify-between">
                          <DialogTitle className="text-xl font-bold">All Categories</DialogTitle>
                          <button
                            onClick={() => setIsModalOpen(false)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                          >
                            <X className="h-5 w-5 text-gray-500" />
                          </button>
                        </div>
                      </DialogHeader>

                      {/* Content - Scrollable */}
                      <div className="flex-1 overflow-y-auto p-4 md:p-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {businessCategories.map(category => {
                            const slug = category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-');
                            return (
                              <Link 
                                key={category}
                                href={`/explore/${slug}`}
                                onClick={() => setIsModalOpen(false)}
                                className="flex items-center p-4 group bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-105 border border-gray-100 hover:border-gray-200"
                              >
                                <div className="flex items-center space-x-4">
                                  <span className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                                    <CategoryIcon icon={categoryToIcon[category as BusinessCategory]} />
                                  </span>
                                  <span className="font-medium text-gray-900">
                                    {category}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          </motion.div>
          <div className='absolute inset-0'>
            <div className="relative w-full h-full">
              <Suspense fallback={
                <div className="absolute inset-0 bg-gradient-to-b from-red-700/40 to-pink-700/40" />
              }>
                <video 
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover" 
                  crossOrigin="" 
                  playsInline 
                  muted 
                  autoPlay
                  loop
                  src="/video/nooor_home_cover_video.mp4" 
                >
                  <track kind="metadata" label="cuepoints" />
                </video>
              </Suspense>
              <div 
                className="absolute inset-0 mix-blend-overlay opacity-40"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-red-700/40 to-pink-700/40 flex items-center justify-center opacity-80">
              </div>
            </div>
          </div>
        </div>

        {/* Platform Statistics Section - Commented out
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gradient-to-r from-pink-600 to-red-600 py-16"
        >
          <div className="px-8">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-bold text-center mb-12 text-white"
            >
              Platform Statistics
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {platformStats.map((stat, index) => (
                <motion.div key={index} variants={itemVariants} className="text-center">
                  <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
                  <p className="text-white/80">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        */}

        {/* Platform Features Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16 bg-white"
        >
          <div className="px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {platformFeatures.map((feature, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className="p-6 hover:bg-gray-50 transition-colors duration-200 rounded-lg border border-gray-100"
                >
                  <div className="text-gray-900 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Business Sections */}
        <div className="px-8 py-16 max-w-screen-2xl mx-auto">
          <div className="space-y-12">
            <motion.section
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="">
                <motion.h2 
                  variants={itemVariants}
                  className="text-3xl font-bold mb-6 text-neutral-900"
                >
                  Our Top Businesses
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {topBusinesses.map((business, index) => (
                    <motion.div key={business.id} variants={itemVariants}>
                      <BusinessCard business={business} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            <motion.section
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="">
                <motion.h2 
                  variants={itemVariants}
                  className="text-3xl font-bold mb-6 text-neutral-900"
                >
                  Special Offers
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {businessOffers.map((offer, index) => (
                    <motion.div key={offer.id} variants={itemVariants}>
                      <OfferCard offer={offer} business={businesses.find(business => business.id === offer.businessId)} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            <motion.section
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="">
                <motion.h2 
                  variants={itemVariants}
                  className="text-3xl font-bold mb-6 text-neutral-900"
                >
                  New on Platform
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {filteredBusinesses
                    .sort((a, b) => b.id.localeCompare(a.id))
                    .slice(0, 5)
                    .map((business, index) => (
                      <motion.div key={business.id} variants={itemVariants}>
                        <BusinessCard business={business} />
                      </motion.div>
                    ))}
                </div>
              </div>
            </motion.section>

            <motion.section
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="">
                <motion.h2 
                  variants={itemVariants}
                  className="text-3xl font-bold mb-6 text-neutral-900"
                >
                  Best Rated
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {filteredBusinesses
                    .filter(business => business.rating >= 4.5)
                    .slice(0, 5)
                    .map((business, index) => (
                      <motion.div key={business.id} variants={itemVariants}>
                        <BusinessCard business={business} />
                      </motion.div>
                    ))}
                </div>
              </div>
            </motion.section>

          </div>
        </div>

        {/* Testimonials Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16 bg-gradient-to-br from-purple-50 to-indigo-50"
        >
          <div className="max-w-screen-2xl mx-auto px-8">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-bold text-center mb-12 text-neutral-900"
            >
              What Our Users Say
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-gray-700">{testimonial.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Social Proof Section */}
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
              Join Our Community
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {socialProof.map((social, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className="text-center p-6 rounded-xl border border-gray-200 hover:border-red-500 transition-colors"
                >
                  <div className="mb-4">
                    {social.platform === "Instagram" && <Instagram className="w-8 h-8 mx-auto text-pink-500" />}
                    {social.platform === "Facebook" && <Facebook className="w-8 h-8 mx-auto text-blue-600" />}
                    {social.platform === "TikTok" && <Music className="w-8 h-8 mx-auto text-black" />}
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{social.followers}</h3>
                  <p className="text-gray-600 mb-4">{social.platform} Followers</p>
                  <p className="text-sm font-medium text-gray-800">{social.handle}</p>
                </motion.div>
              ))}
            </div>
            <motion.div 
              variants={itemVariants}
              className="mt-12 text-center"
            >
              <Button variant="outline" className="mr-4">
                <Instagram className="w-4 h-4 mr-2" />
                Follow on Instagram
              </Button>
              <Button variant="outline" className="mr-4">
                <Facebook className="w-4 h-4 mr-2" />
                Like on Facebook
              </Button>
              <Button variant="outline">
                <Music className="w-4 h-4 mr-2" />
                Follow on TikTok
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Newsletter Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16 bg-gradient-to-br from-purple-50 to-indigo-50"
        >
          <div className="max-w-screen-2xl mx-auto px-8">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-bold text-center mb-12 text-neutral-900"
            >
              Stay Updated
            </motion.h2>
            <motion.div 
              variants={itemVariants}
              className="max-w-2xl mx-auto text-center"
            >
              <p className="text-gray-600 mb-8">
                Subscribe to our newsletter for the latest beauty trends, wellness tips, and exclusive offers.
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <Button>Subscribe</Button>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
