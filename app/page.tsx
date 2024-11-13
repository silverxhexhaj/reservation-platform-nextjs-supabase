"use client";

import { useState, useEffect, useRef, ReactElement } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from '@/lib/supabase';
import { Search, Star, X, Scissors, Dumbbell, Heart, Syringe, Eye, Sun, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { businesses, Business } from '@/data/businesses';
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge";
import { Calendar, Shield, CheckCircle, Lock } from 'lucide-react';
import { Instagram, Facebook, Music, Apple, Smartphone } from 'lucide-react';

const categories = [
  "Hair Salon",
  "Nail Salon",
  "Waxing Salon",
  "Beauty Salon",
  "Barbershop",
  "Eyebrows & Lashes",
  "Massage",
  "Spa",
  "Gym & Fitness",
  "Personal Trainer",
  "Therapy Centre",
  "Tattoo & Piercing",
  "Tanning Studio",
  "Aesthetics",
  "Weight Loss"
];

const categoryIcons: { [key: string]: ReactElement } = {
  "Hair Salon": <Scissors className="w-4 h-4" />,
  "Nail Salon": <Heart className="w-4 h-4" />,
  "Waxing Salon": <Sun className="w-4 h-4" />,
  "Beauty Salon": <Heart className="w-4 h-4" />,
  "Barbershop": <Scissors className="w-4 h-4" />,
  "Eyebrows & Lashes": <Eye className="w-4 h-4" />,
  "Massage": <Heart className="w-4 h-4" />,
  "Spa": <Heart className="w-4 h-4" />,
  "Gym & Fitness": <Dumbbell className="w-4 h-4" />,
  "Personal Trainer": <Dumbbell className="w-4 h-4" />,
  "Therapy Centre": <Heart className="w-4 h-4" />,
  "Tattoo & Piercing": <Syringe className="w-4 h-4" />,
  "Tanning Studio": <Sun className="w-4 h-4" />,
  "Aesthetics": <Syringe className="w-4 h-4" />,
  "Weight Loss": <Dumbbell className="w-4 h-4" />,
};

const renderBusinessCard = (business: Business) => (
  <Card key={business.id} className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
    <div className="h-48 overflow-hidden relative">
      <img src={business.imageUrl} alt={business.name} className="w-full h-full object-cover" />
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
        <span className="text-white text-xs font-semibold px-2 py-1 uppercase tracking-wide">{business.category}</span>
      </div>
    </div>
    <CardContent className="pt-4 bg-white">
      <CardTitle className="text-xl text-black pb-2">{business.name}</CardTitle>
      <p className="text-gray-600 mb-4">{business.description}</p>
      <div className="flex justify-between items-center text-sm">
        <span className="flex items-center text-black">
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
    <CardFooter className="bg-white">
      <Link href={`/business/${business.id}`} className="w-full">
        <Button className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out border border-gray-300">
          Book Now
        </Button>
      </Link>
    </CardFooter>
  </Card>
);

// Import the pricing plans data
const pricingPlans = [
  {
    name: 'Basic',
    price: 29,
    features: ['Up to 5 bookings per month', 'Basic scheduling', 'Email support'],
    recommended: false,
  },
  {
    name: 'Pro',
    price: 59,
    features: ['Unlimited bookings', 'Advanced scheduling', 'Priority support', 'Performance tracking'],
    recommended: true,
  },
  {
    name: 'Enterprise',
    price: 99,
    features: ['Custom booking packages', 'Dedicated account manager', '24/7 phone support', 'API access'],
    recommended: false,
  },
];

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
    content: "Noorlife has transformed how I book my beauty appointments. The platform is so intuitive and reliable!",
    rating: 5
  },
  {
    name: "Mark Davis",
    role: "Fitness Enthusiast",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    content: "Finding the right personal trainer was super easy with Noorlife. The booking process is seamless.",
    rating: 5
  },
  {
    name: "Emma Wilson",
    role: "Beauty Professional",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
    content: "As a salon owner, Noorlife has helped me reach more clients and manage my bookings efficiently.",
    rating: 5
  }
];

const socialProof = [
  { platform: "Instagram", followers: "50K+", handle: "@noorlife" },
  { platform: "Facebook", followers: "35K+", handle: "NoorlifeOfficial" },
  { platform: "TikTok", followers: "25K+", handle: "@noorlife" }
];

export default function Home() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>(businesses);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState('Search businesses...');
  const [fadeOut, setFadeOut] = useState(false);
  const placeholderTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const displayedCategories = showAllCategories ? categories : categories.slice(0, 6);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    const changePlaceholder = () => {
      if (!isInputFocused) {
        setFadeOut(true);
        placeholderTimeoutRef.current = setTimeout(() => {
          setPlaceholderIndex((prevIndex) => (prevIndex + 1) % categories.length);
          setPlaceholder(`Search for ${categories[(placeholderIndex + 1) % categories.length]}...`);
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
  }, [placeholderIndex, isInputFocused]);

  const handleSearch = () => {
    const filtered = businesses.filter(business => 
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBusinesses(filtered);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredBusinesses(businesses);
    }
  }, [searchTerm]);

  const recommendedBusinesses = filteredBusinesses.sort((a, b) => b.rating - a.rating).slice(0, 3);
  const topBusinesses = filteredBusinesses.sort((a, b) => b.rating - a.rating).slice(3, 8); // New: Select top 5 businesses after the recommended ones
  const healthyBodyBusinesses = filteredBusinesses.filter(b => ['Gym & Fitness', 'Personal Trainer'].includes(b.category));
  const womenSectionBusinesses = filteredBusinesses.filter(b => ['Hair Salon', 'Nail Salon', 'Waxing Salon'].includes(b.category));

  const NoResultsMessage = () => (
    <div className="text-center py-10">
      <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
      <p className="text-gray-500">Try adjusting your search or filter to find what you&apos;re looking for.</p>
    </div>
  );

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredBusinesses(businesses);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div className="min-h-screen font-sans bg-white flex flex-col">
      <Header user={user} />
      <main className="relative">
        <div className="p-8 flex relative h-screen">
          <div className='relative z-10 flex flex-col space-y-6 max-w-screen-2xl mx-auto'>
            <div className='flex flex-col justify-end items-center mx-auto space-y-4 flex-1'>
              <div className="flex justify-center">
                <span className="px-4 py-1.5 bg-white bg-opacity-10 backdrop-blur-xs rounded-full text-white text-sm font-medium transition-all duration-300 hover:bg-opacity-20">
                  1# Choice in Albania
                </span>
              </div>
              <div className=''>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center text-white flex flex-col">
                  <span>Discover Local Beauty & Wellness </span>
                  <span>Book Your Perfect Service!</span>
                </h1>
              </div>
                <div className="relative flex items-center bg-white rounded-full w-full md:w-[500px]">
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder={placeholder}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={handleKeyPress}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      className={`w-full rounded-full px-4 py-3 pl-10 pr-10 text-black bg-white border border-transparent focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-opacity duration-200 ${fadeOut && !isInputFocused ? 'opacity-0' : 'opacity-100'}`}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    {searchTerm && (
                      <button
                        onClick={clearSearch}
                        className="absolute right-24 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                  <Button 
                    onClick={handleSearch}
                    className="absolute right-1.5 bg-black hover:bg-gray-900 text-white font-medium px-5 rounded-full"
                  >
                    Search
                  </Button>
                </div>
            </div>
            {/* Categories Section */}
            <div className="max-w-screen-2xl mx-auto flex-1 pt-16 w-full flex justify-center items-end md:items-start">
              <div className="space-y-6 w-full">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  {categories.slice(0, 8).map(category => {
                    const slug = category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-');
                    return (
                      <Link 
                        key={category}
                        href={`/explore/${slug}`}
                        className="w-full h-[60px] flex items-center justify-center group bg-white bg-opacity-10 backdrop-blur-xs hover:bg-opacity-20 border border-white border-opacity-20 rounded-lg p-4 transition-all duration-300 hover:scale-105"
                      >
                        <div className="flex flex-col items-center text-center space-y-3">
                          <span className="text-white font-medium text-sm truncate">
                            {category}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                
                <div className="flex justify-center">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="outline"
                    className="bg-white bg-opacity-5 hover:bg-opacity-10 text-white border-white border-opacity-20"
                  >
                    <LayoutGrid className="mr-2 h-4 w-4" /> All Categories
                  </Button>
                </div>

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
                          {categories.map(category => {
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
                                    {categoryIcons[category]}
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
            </div>
          </div>
          <div className='absolute inset-0'>
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
              <div className="absolute inset-0 bg-gradient-to-b from-red-700/40 to-pink-700/40 flex items-center justify-center opacity-80">
              </div>
            </div>
          </div>
        </div>

        {/* Platform Statistics Section */}
        <section className="bg-gradient-to-r from-pink-500 to-red-500 py-16">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {platformStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
                  <p className="text-white/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-screen-2xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Noorlife</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {platformFeatures.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Business Sections */}
        <div className="px-8 py-6 max-w-screen-2xl mx-auto">
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">Recommended by Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {recommendedBusinesses.map(renderBusinessCard)}
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">Our Top Businesses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {topBusinesses.map(renderBusinessCard)}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">Health & Wellness</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {healthyBodyBusinesses.slice(0, 5).map(renderBusinessCard)}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">Beauty & Care</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {womenSectionBusinesses.slice(0, 5).map(renderBusinessCard)}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">New on Platform</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredBusinesses
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 5)
                  .map(renderBusinessCard)}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-black">Best Rated</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredBusinesses
                  .filter(business => business.rating >= 4.5)
                  .slice(0, 5)
                  .map(renderBusinessCard)}
              </div>
            </section>
          </div>
        </div>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our community has to say about their Noorlife experience.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-16 bg-white">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
              <p className="text-gray-600">Follow us on social media for beauty tips, wellness advice, and exclusive offers</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {socialProof.map((social, index) => (
                <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:border-red-500 transition-colors">
                  <div className="mb-4">
                    {social.platform === "Instagram" && <Instagram className="w-8 h-8 mx-auto text-pink-500" />}
                    {social.platform === "Facebook" && <Facebook className="w-8 h-8 mx-auto text-blue-600" />}
                    {social.platform === "TikTok" && <Music className="w-8 h-8 mx-auto text-black" />}
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{social.followers}</h3>
                  <p className="text-gray-600 mb-4">{social.platform} Followers</p>
                  <p className="text-sm font-medium text-gray-800">{social.handle}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
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
            </div>
          </div>
        </section>

        {/* Download App Section */}
        <section className="py-16 bg-gradient-to-r from-red-500 to-pink-500 text-white">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Get the Noorlife App</h2>
                <p className="mb-8 text-white/90">
                  Book appointments on the go, get instant notifications, and manage your bookings with our mobile app.
                </p>
                <div className="flex space-x-4">
                  <Button variant="secondary" className="bg-black hover:bg-gray-900">
                    <Apple className="w-5 h-5 mr-2" />
                    App Store
                  </Button>
                  <Button variant="secondary" className="bg-black hover:bg-gray-900">
                    <Smartphone className="w-5 h-5 mr-2" />
                    Play Store
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&h=1200&q=80"
                  alt="Noorlife Mobile App"
                  width={300}
                  height={600}
                  className="mx-auto rounded-3xl shadow-2xl"
                  priority
                  onError={(e) => {
                    // Fallback image if the main one fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=1200&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
