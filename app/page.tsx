"use client";

import { useState, useEffect, useRef, ReactElement } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from '@/lib/supabase';
import { Search, Star, X, Scissors, Dumbbell, Heart, Syringe, Eye, Sun } from 'lucide-react';
import Link from 'next/link';
import { businesses, Business } from '@/data/businesses';
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const categories = [
  "All Services",
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
  "All Services": <Search className="w-4 h-4" />,
  "Hair Salon": <Scissors className="w-4 h-4" />,
  "Nail Salon": <Heart className="w-4 h-4" />, // Changed from Nail
  "Waxing Salon": <Sun className="w-4 h-4" />, // Changed from Spa
  "Beauty Salon": <Heart className="w-4 h-4" />,
  "Barbershop": <Scissors className="w-4 h-4" />,
  "Eyebrows & Lashes": <Eye className="w-4 h-4" />,
  "Massage": <Heart className="w-4 h-4" />, // Changed from Spa
  "Spa": <Heart className="w-4 h-4" />, // Changed from Spa
  "Gym & Fitness": <Dumbbell className="w-4 h-4" />,
  "Personal Trainer": <Dumbbell className="w-4 h-4" />,
  "Therapy Centre": <Heart className="w-4 h-4" />,
  "Tattoo & Piercing": <Syringe className="w-4 h-4" />, // Changed from Eyedropper
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

export default function Home() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>(businesses);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState('Search businesses...');
  const [fadeOut, setFadeOut] = useState(false);
  const placeholderTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

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
      <main className="flex-grow relative">
        <div className="p-8 pt-24 bg-gray-500 h-[680px] flex items-center justify-center">
          <div className='relative z-10'>
            <h1 className="text-5xl font-bold mb-4 text-center text-white flex flex-col space-y-2">
              <span>Look Amazing – Discover and Local</span>
              <span className="italic">
                <span className="bg-gradient-to-r from-green-500 to-teal-400 bg-clip-text text-transparent animate-gradient-x">Beauty & Health</span>
                <span className="text-white not-italic pl-2">Services!</span>
              </span>
            </h1>
            <h1 className="text-xl mb-8 text-center text-white font-light">Discover a world of in-person and virtual fitness, wellness, and beauty services.</h1>
            <div className="max-w-2xl mx-auto">
              <div className="relative flex items-center bg-white rounded-full">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className={`rounded-full w-full px-4 py-3 pl-10 pr-10 text-black bg-white border border-transparent focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-opacity duration-200 ${fadeOut && !isInputFocused ? 'opacity-0' : 'opacity-100'}`}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" size={20} />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-24 top-1/2 transform -translate-y-1/2 text-black"
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
          </div>
          <div className='absolute inset-0'>
            <div className="relative w-full h-[680px]">
              <video 
                className="absolute inset-0 w-full h-full object-cover" 
                crossOrigin="" 
                playsInline 
                muted 
                autoPlay
                loop
                src="https://videos.pexels.com/video-files/4008320/4008320-uhd_2732_1440_25fps.mp4" 
                preload="metadata"
              >
                <track kind="metadata" label="cuepoints" />
              </video>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        {/* <section className="w-full py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl mb-8">
              Choose Your Plan
            </h2>
            <div className="grid gap-8 lg:grid-cols-3 lg:gap-x-8">
              {pricingPlans.map((plan) => (
                <div key={plan.name} className={`bg-white rounded-lg shadow-lg overflow-hidden ${plan.recommended ? 'ring-2 ring-indigo-500' : ''}`}>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                    <p className="mt-2 text-2xl font-bold text-gray-900">${plan.price}<span className="text-base font-medium text-gray-500">/month</span></p>
                    <ul className="mt-4 space-y-2">
                      {plan.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-start">
                          <svg className="flex-shrink-0 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="ml-2 text-sm text-gray-500">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="px-6 py-4 bg-gray-50">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                      Get started
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/pricing" className="text-indigo-600 hover:text-indigo-500 font-medium">
                View full pricing details <ArrowRight className="inline-block ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </section> */}

        <div className="relative">
          <Tabs className="flex flex-col" defaultValue="All Services">
            <TabsList className="flex justify-start h-auto px-8 py-6 sticky top-20 bg-white overflow-x-auto lg:overflow-x-visible lg:flex-wrap gap-2 z-10 max-w-screen-2xl mx-auto">
              {categories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category} 
                  className="text-sm flex items-center justify-center"
                >
                  <span className="">{categoryIcons[category]}</span>
                  <span className="">{category}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent className="px-8 py-6 max-w-screen-2xl mx-auto" value="All Services">
              <div className="space-y-12">
                {filteredBusinesses.length === 0 ? (
                  <NoResultsMessage />
                ) : (
                  <>
                    <section>
                      <h2 className="text-2xl font-bold mb-4 text-black">Recommended by Us</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {recommendedBusinesses.map(renderBusinessCard)}
                      </div>
                    </section>
                    
                    {/* New section: Our Top Businesses */}
                    <section>
                      <h2 className="text-2xl font-bold mb-4 text-black">Our Top Businesses</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {topBusinesses.map(renderBusinessCard)}
                      </div>
                    </section>
                    
                    <section>
                      <h2 className="text-2xl font-bold mb-4 text-black">For a Healthy Body</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {healthyBodyBusinesses.map(renderBusinessCard)}
                      </div>
                    </section>
                    
                    <section>
                      <h2 className="text-2xl font-bold mb-4 text-black">Women&apos;s Section</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {womenSectionBusinesses.map(renderBusinessCard)}
                      </div>
                    </section>
                  </>
                )}
              </div>
            </TabsContent>
            
            {categories.slice(1).map(category => (
              <TabsContent className="px-8 py-6 max-w-screen-2xl mx-auto" key={category} value={category}>
                {filteredBusinesses.filter(business => business.category === category).length === 0 ? (
                  <NoResultsMessage />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredBusinesses
                      .filter(business => business.category === category)
                      .map(renderBusinessCard)}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
