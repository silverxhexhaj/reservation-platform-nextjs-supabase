"use client";

import React from 'react';
import { Button } from "@/app/components/ui/button";
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';

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

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main 
        className="flex-grow bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        <div className="bg-black bg-opacity-70 min-h-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Simple, transparent pricing
              </h2>
              <p className="mt-4 text-xl text-gray-300">
                Choose the plan that&apos;s right for you
              </p>
            </div>
            <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
              {pricingPlans.map((plan) => (
                <div key={plan.name} className={`relative bg-white rounded-2xl shadow-xl ${plan.recommended ? 'ring-2 ring-indigo-500' : ''}`}>
                  {plan.recommended && (
                    <span className="absolute top-0 right-0 px-3 py-1 bg-indigo-500 text-white text-sm font-semibold rounded-bl-2xl rounded-tr-2xl">
                      Recommended
                    </span>
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                    <p className="mt-4 text-gray-500">
                      <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span> /month
                    </p>
                    <ul className="mt-6 space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <svg className="flex-shrink-0 h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="ml-3 text-gray-500">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Button className={`w-full ${plan.recommended ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-800 hover:bg-gray-700'} text-white`}>
                        Get started
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
