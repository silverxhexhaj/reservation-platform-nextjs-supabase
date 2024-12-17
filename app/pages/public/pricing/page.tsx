"use client";

import React, { useState, useEffect } from 'react'
import { Header } from '@/app/components/Header'
import { motion } from 'framer-motion'
import { Button } from '@/app/components/ui/button'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

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

const AnimatedGradient = () => {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-800 to-pink-600"
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        backgroundSize: '200% 200%',
      }}
    />
  );
};

const FloatingShapes = () => {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="absolute w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl"
        animate={{
          x: ['-25%', '25%', '-25%'],
          y: ['-25%', '25%', '-25%'],
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl"
        animate={{
          x: ['25%', '-25%', '25%'],
          y: ['25%', '-25%', '25%'],
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
};

export default function PricingPage() {
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    async function getUser() {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', authUser.id)
            .single();
          
          if (profile) {
            setUser({ username: profile.username });
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', session.user.id)
          .single();
        
        if (profile) {
          setUser({ username: profile.username });
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} />
      
      {/* Hero Section with Gradient Background */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <AnimatedGradient />
        <div 
          className="absolute inset-0 mix-blend-overlay opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
        <FloatingShapes />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-16">
            Choose the perfect plan for your business needs
          </p>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
            >
              <h3 className="text-white text-xl font-semibold mb-2">Basic</h3>
              <div className="text-white mb-4">
                <span className="text-3xl font-bold">$29</span>
                <span className="text-gray-300">/month</span>
              </div>
              <ul className="text-gray-200 space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                  Up to 50 bookings/month
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                  Basic analytics
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                  Email support
                </li>
              </ul>
              <Button className="w-full bg-white/20 text-white hover:bg-white/30">
                Get Started
              </Button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 transform scale-105 hover:bg-white/25 transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-semibold px-3 py-1 rounded-full w-fit mb-4">
                Most Popular
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">Pro</h3>
              <div className="text-white mb-4">
                <span className="text-3xl font-bold">$79</span>
                <span className="text-gray-300">/month</span>
              </div>
              <ul className="text-gray-200 space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                  Unlimited bookings
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                  Advanced analytics
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                  Priority support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                  Custom branding
                </li>
              </ul>
              <Button className="w-full bg-white text-purple-900 hover:bg-gray-100">
                Get Started
              </Button>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
            >
              <h3 className="text-white text-xl font-semibold mb-2">Enterprise</h3>
              <div className="text-white mb-4">
                <span className="text-3xl font-bold">$199</span>
                <span className="text-gray-300">/month</span>
              </div>
              <ul className="text-gray-200 space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                  Multi-location support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                  Custom integrations
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                  24/7 phone support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                  Dedicated account manager
                </li>
              </ul>
              <Button className="w-full bg-white/20 text-white hover:bg-white/30">
                Contact Sales
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-semibold">Can I switch plans later?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-semibold">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-semibold">Is there a free trial?</h3>
              <p className="text-gray-600">Yes, all plans come with a 14-day free trial. No credit card required to start.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-r from-purple-50 to-pink-50"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl text-gray-600 mb-8">Join thousands of businesses already using our platform</p>
            <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700">
              Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
