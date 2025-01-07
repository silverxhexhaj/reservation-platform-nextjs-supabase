'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/app/components/ui/card'
import { Header } from '@/app/components/Header'
import { motion } from 'framer-motion'
import { Button } from '@/app/components/ui/button'
import { ArrowRight, Star, Users, Building2, Trophy, Calendar, Shield } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { containerVariants, itemVariants } from "@/app/models/transitionEffects.models";

const teamMembers = [
  {
    name: 'John Doe',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    bio: 'Visionary leader with 15+ years of experience in the beauty and wellness industry.',
    linkedin: '#'
  },
  {
    name: 'Jane Smith',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80',
    bio: 'Tech innovator specializing in AI and machine learning applications.',
    linkedin: '#'
  },
  {
    name: 'Mike Johnson',
    role: 'Lead Developer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    bio: 'Full-stack developer passionate about creating seamless user experiences.',
    linkedin: '#'
  },
]

const stats = [
  { number: '500+', label: 'Partner Businesses', icon: Building2 },
  { number: '50K+', label: 'Active Users', icon: Users },
  { number: '100K+', label: 'Bookings Made', icon: Star },
  { number: '98%', label: 'Satisfaction Rate', icon: Trophy },
]

const testimonials = [
  {
    quote: "Working with this platform has transformed our business. The technology is seamless and the support is outstanding.",
    author: "Sarah Wilson",
    role: "Salon Owner",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80"
  },
  {
    quote: "The platform has helped us reach new customers and streamline our booking process. It's been a game-changer.",
    author: "Michael Brown",
    role: "Spa Director",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
  },
]

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

export default function WhoWeAre() {
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section with Gradient Background */}
      <div className="relative h-full md:h-screen flex items-center justify-center overflow-hidden">
        <AnimatedGradient />
        <div 
          className="absolute inset-0 mix-blend-overlay opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 mt-20 md:mt-0 py-20 md:py-0"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Transforming Beauty & Wellness
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
            We&apos;re revolutionizing how people discover, book, and experience beauty and wellness services.
          </p>
          <Button 
            size="lg"
            className="bg-white text-purple-900 hover:bg-gray-100 mb-16"
          >
            Join Our Platform <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          {/* Platform Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center mb-6">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Smart Scheduling</h3>
              <p className="text-gray-200 text-sm">
                Intelligent booking system with automated reminders and real-time availability updates.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-200 text-sm">
                Safe and seamless payment processing with multiple payment options and instant confirmations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center mb-6">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Client Reviews</h3>
              <p className="text-gray-200 text-sm">
                Build trust with verified reviews and ratings from real customers to grow your business.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-purple-100">
                  <stat.icon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-b from-purple-50 to-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Our Mission</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                With over 30 years of combined experience in technology and the beauty industry, 
                we bring a unique perspective to solving modern challenges. Our mission is to create 
                a seamless connection between service providers and clients, making exceptional beauty 
                and wellness services accessible to everyone.
              </p>
              <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                Learn More About Our Vision
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our diverse team of experts is passionate about innovation and dedicated to your success.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member) => (
              <motion.div key={member.name} variants={itemVariants}>
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="relative w-48 h-48 mx-auto mb-6">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-2">{member.name}</h3>
                    <p className="text-purple-600 text-center mb-4">{member.role}</p>
                    <p className="text-gray-600 text-center text-sm mb-4">{member.bio}</p>
                    <div className="text-center">
                      <a 
                        href={member.linkedin}
                        className="inline-flex items-center text-purple-600 hover:text-purple-700"
                      >
                        <span className="mr-2">Connect on LinkedIn</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 bg-purple-50"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">What Our Partners Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from the businesses that have transformed their operations with our platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="relative w-16 h-16 mr-4">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.author}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{testimonial.author}</h3>
                        <p className="text-purple-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">&quot;{testimonial.quote}&quot;</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Ready to Get Started?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of businesses that are growing with our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                  Partner With Us
                </Button>
                <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                  Schedule a Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}