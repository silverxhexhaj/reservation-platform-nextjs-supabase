"use client";

import React from 'react'
import { Header } from '@/app/components/Header'
import { motion } from 'framer-motion'
import { Button } from '@/app/components/ui/button'
import { ArrowRight, CheckCircle } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion"
import { containerVariants, itemVariants } from "@/app/models/transitionEffects.models";
import { AnimatedGradient } from '@/app/components/gradient/AnimatedGradient';


export default function PricingPage() {
 
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section with Gradient Background */}
      <div className="relative h-full md:h-screen flex items-center justify-center overflow-hidden">
        <AnimatedGradient />
        <div 
          className="absolute inset-0 mix-blend-overlay opacity-40"
          style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}
        />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 mt-20 md:mt-0 py-20 md:py-0"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
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
              className="relative flex flex-col items-center bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 transform scale-105 hover:bg-white/25 transition-all duration-300"
            >
              <div className="absolute -top-3 border border-white/30 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
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
          <motion.div 
            variants={itemVariants}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Everything you need to know about our pricing and products
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants} 
            className="max-w-3xl mx-auto rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm"
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <span className="text-left">Can I switch plans later?</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle. We&apos;ll automatically prorate any payments for your convenience.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <span className="text-left">What payment methods do you accept?</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 text-gray-600">
                  We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for Enterprise plans. All payments are processed securely through Stripe.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <span className="text-left">Is there a free trial?</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 text-gray-600">
                  Yes, all plans come with a 14-day free trial. No credit card required to start. You&apos;ll have full access to all features during your trial period.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <span className="text-left">What happens after my trial ends?</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 text-gray-600">
                  After your trial ends, you can choose to subscribe to any of our plans to continue using the service. If you don&apos;t subscribe, your account will be automatically downgraded to a limited free version.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <span className="text-left">Do you offer refunds?</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 text-gray-600">
                  Yes, we offer a 30-day money-back guarantee for all plans. If you&apos;re not satisfied with our service, contact our support team for a full refund.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
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
