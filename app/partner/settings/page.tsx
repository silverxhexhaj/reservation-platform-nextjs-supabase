'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BusinessInfoSection } from './BusinessInfoSection';
import { ExternalLinksSection } from './ExternalLinksSection';
import { LocationSection } from './LocationSection';
import { PaymentMethodsSection } from './PaymentMethodsSection';
import { SchedulingSection } from './SchedulingSection';
import { RatingReviewsSection } from './RatingReviewsSection';

const settingsCategories = [
  { id: 'business-setup', label: 'Business Setup' },
  { id: 'scheduling', label: 'Scheduling' },
  { id: 'team', label: 'Team' },
  { id: 'sales', label: 'Sales' },
  { id: 'payments', label: 'Payments' },
  { id: 'rating-reviews', label: 'Rating & Reviews' },
];

export default function PartnerSettings() {
  const [activeCategory, setActiveCategory] = useState(settingsCategories[0].id);

  return (
    <div className="bg-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Partner Settings</h1>
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-64 md:sticky md:top-4 md:self-start">
          <div className="md:max-h-[calc(100vh-8rem)] md:overflow-y-auto md:pr-4">
            <nav className="space-y-1 border rounded-md p-2 bg-white">
              {settingsCategories.map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100",
                    activeCategory === category.id && "bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900"
                  )}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </Button>
              ))}
            </nav>
          </div>
        </aside>
        <main className="flex-1 md:ml-4">
          {activeCategory === 'business-setup' && (
            <div className="space-y-6">
              <BusinessInfoSection />
              <ExternalLinksSection />
              <LocationSection />
            </div>
          )}
          {activeCategory === 'scheduling' && (
            <div className="space-y-6">
              <SchedulingSection />
            </div>
          )}
          {activeCategory === 'sales' && (
            <div className="space-y-6">
              <PaymentMethodsSection />
              {/* Add other sales-related sections here */}
            </div>
          )}
          {activeCategory === 'payments' && (
            <div className="space-y-6">
              <PaymentMethodsSection />
            </div>
          )}
          {activeCategory === 'rating-reviews' && (
            <div className="space-y-6">
              <RatingReviewsSection />
            </div>
          )}
          {['team'].includes(activeCategory) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">{settingsCategories.find(c => c.id === activeCategory)?.label}</CardTitle>
                <CardDescription className="text-gray-700">Manage your {settingsCategories.find(c => c.id === activeCategory)?.label.toLowerCase()} settings here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800">Content for {settingsCategories.find(c => c.id === activeCategory)?.label} goes here.</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}