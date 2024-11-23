'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { BusinessInfoSection } from './BusinessInfoSection';
import { ExternalLinksSection } from './ExternalLinksSection';
import { LocationSection } from './LocationSection';
import { PaymentMethodsSection } from './PaymentMethodsSection';
import { SchedulingSection } from './SchedulingSection';
import { RatingReviewsSection } from './RatingReviewsSection';
import { TeamSection } from './TeamSection';
import { SalesSection } from './SalesSection';
import { 
  Store, 
  Calendar, 
  Users2, 
  DollarSign, 
  Wallet, 
  Star,
  Check,
  Clock,
  Circle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface SettingCategory {
  id: string;
  label: string;
  description: string;
  group: 'main' | 'marketing';
}

const settingsCategories: SettingCategory[] = [
  { 
    id: 'business-setup', 
    label: 'Business Setup',
    description: 'Manage your business information, branding, and locations',
    group: 'main'
  },
  { 
    id: 'scheduling', 
    label: 'Scheduling',
    description: 'Configure your availability, services, and booking rules',
    group: 'main'
  },
  { 
    id: 'team', 
    label: 'Team',
    description: 'Manage staff members, roles, and permissions',
    group: 'main'
  },
  { 
    id: 'sales', 
    label: 'Sales',
    description: 'Configure pricing, discounts, and promotions',
    group: 'main'
  },
  { 
    id: 'payments', 
    label: 'Payments',
    description: 'Set up payment methods and payout preferences',
    group: 'main'
  },
  { 
    id: 'rating-reviews', 
    label: 'Rating & Reviews',
    description: 'Manage customer feedback and ratings',
    group: 'marketing'
  },
];

interface SetupStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  link: string;
}

const setupSteps: SetupStep[] = [
  {
    id: 'business-info',
    title: 'Complete Business Information',
    description: 'Add your business details, hours, and contact information',
    status: 'completed',
    link: '/partner/settings?category=business-setup'
  },
  {
    id: 'services',
    title: 'Set Up Services',
    description: 'Add your service menu with prices and duration',
    status: 'in-progress',
    link: '/partner/settings?category=scheduling'
  },
  {
    id: 'team',
    title: 'Add Team Members',
    description: 'Invite your staff and set their schedules',
    status: 'pending',
    link: '/partner/settings?category=team'
  },
  {
    id: 'payment',
    title: 'Configure Payments',
    description: 'Set up your payment methods and payout preferences',
    status: 'pending',
    link: '/partner/settings?category=payments'
  }
];

export default function PartnerSettings() {
  const [activeCategory, setActiveCategory] = useState(settingsCategories[0].id);
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const completedSteps = setupSteps.filter(step => step.status === 'completed').length;
  const totalSteps = setupSteps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  return (
    <div className="space-y-6 p-6 !overflow-y-scroll">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Configure your business settings and preferences
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Reset
          </Button>
          <Button className="bg-blue-700 hover:bg-blue-800 text-white">
            Save Changes
          </Button>
        </div>
      </div>

      {/* Setup Progress Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-none">
        <CardHeader className="cursor-pointer" onClick={() => setIsSetupOpen(!isSetupOpen)}>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-blue-950">Complete Your Business Setup</CardTitle>
              <CardDescription className="text-blue-800">
                {completedSteps === totalSteps 
                  ? "All set! Your business is fully configured."
                  : `${completedSteps} of ${totalSteps} steps completed`
                }
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium text-blue-950">
                  {progressPercentage.toFixed(0)}%
                </div>
                <div className="h-2 w-24 bg-blue-200 rounded-full">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
              {isSetupOpen ? (
                <ChevronUp className="h-5 w-5 text-blue-950" />
              ) : (
                <ChevronDown className="h-5 w-5 text-blue-950" />
              )}
            </div>
          </div>
        </CardHeader>
        {isSetupOpen && (
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {setupSteps.map((step) => (
                <Card 
                  key={step.id}
                  className={cn(
                    "border-2 transition-all duration-200",
                    step.status === 'completed' && "border-emerald-500 bg-emerald-50",
                    step.status === 'in-progress' && "border-blue-500 bg-blue-50",
                    step.status === 'pending' && "border-gray-200 bg-white"
                  )}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center",
                        step.status === 'completed' && "bg-emerald-100 text-emerald-700",
                        step.status === 'in-progress' && "bg-blue-100 text-blue-700",
                        step.status === 'pending' && "bg-gray-100 text-gray-600"
                      )}>
                        {step.status === 'completed' && <Check className="h-4 w-4" />}
                        {step.status === 'in-progress' && <Clock className="h-4 w-4" />}
                        {step.status === 'pending' && <Circle className="h-4 w-4" />}
                      </div>
                      <div className={cn(
                        "text-xs font-medium px-2 py-1 rounded-full",
                        step.status === 'completed' && "bg-emerald-100 text-emerald-700",
                        step.status === 'in-progress' && "bg-blue-100 text-blue-700",
                        step.status === 'pending' && "bg-gray-100 text-gray-600"
                      )}>
                        {step.status === 'completed' && 'Completed'}
                        {step.status === 'in-progress' && 'In Progress'}
                        {step.status === 'pending' && 'Pending'}
                      </div>
                    </div>
                    <CardTitle className={cn(
                      "text-sm font-medium mt-2",
                      step.status === 'completed' && "text-emerald-950",
                      step.status === 'in-progress' && "text-blue-950",
                      step.status === 'pending' && "text-gray-900"
                    )}>
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={cn(
                      "text-sm mb-3",
                      step.status === 'completed' && "text-emerald-700",
                      step.status === 'in-progress' && "text-blue-700",
                      step.status === 'pending' && "text-gray-600"
                    )}>
                      {step.description}
                    </p>
                    <Button
                      variant={step.status === 'completed' ? "outline" : "default"}
                      className={cn(
                        "w-full font-medium transition-all duration-200",
                        step.status === 'completed' && 
                          "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800",
                        step.status === 'in-progress' && 
                          "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow",
                        step.status === 'pending' && 
                          "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700"
                      )}
                      onClick={() => {
                        // Navigate to the step's link
                        window.location.href = step.link;
                      }}
                    >
                      {step.status === 'completed' && (
                        <span className="flex items-center gap-2">
                          <Check className="h-4 w-4" />
                          View Details
                        </span>
                      )}
                      {step.status === 'in-progress' && (
                        <span className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Continue Setup
                        </span>
                      )}
                      {step.status === 'pending' && (
                        <span className="flex items-center gap-2">
                          <Circle className="h-4 w-4" />
                          Start Setup
                        </span>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      <div className="flex flex-col md:flex-row gap-6 relative">
        {/* Settings Categories - Updated Sidebar with Groups */}
        <Card className="md:w-80 bg-white h-fit sticky top-0">
          <CardHeader>
            <CardTitle className="text-lg">Settings</CardTitle>
            <CardDescription>Manage your business settings</CardDescription>
          </CardHeader>
          <div className="p-2 space-y-6">
            {/* Main Settings Group */}
            <div className="space-y-1">
              {settingsCategories
                .filter(category => category.group === 'main')
                .map((category) => (
                  <button
                    key={category.id}
                    className={cn(
                      "w-full px-4 py-2.5 text-left transition-colors rounded-md",
                      "hover:bg-slate-100/80",
                      activeCategory === category.id 
                        ? "bg-slate-100 font-medium"
                        : "text-slate-600"
                    )}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.label}
                  </button>
                ))}
            </div>

            {/* Marketing Group */}
            <div className="space-y-1">
              <div className="px-4 py-2">
                <h4 className="text-sm font-medium text-slate-900">Marketing</h4>
              </div>
              {settingsCategories
                .filter(category => category.group === 'marketing')
                .map((category) => (
                  <button
                    key={category.id}
                    className={cn(
                      "w-full px-4 py-2.5 text-left transition-colors rounded-md",
                      "hover:bg-slate-100/80",
                      activeCategory === category.id 
                        ? "bg-slate-100 font-medium"
                        : "text-slate-600"
                    )}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.label}
                  </button>
                ))}
            </div>
          </div>
        </Card>

        {/* Settings Content */}
        <Card className="flex-1 bg-white">
          <CardHeader>
            <CardTitle>
              {settingsCategories.find(c => c.id === activeCategory)?.label}
            </CardTitle>
            <CardDescription>
              {settingsCategories.find(c => c.id === activeCategory)?.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeCategory === 'business-setup' && (
              <div className="space-y-6">
                <BusinessInfoSection hideButtons />
                <ExternalLinksSection />
                <LocationSection />
                <div className="flex justify-end gap-4 pt-6">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-blue-700 hover:bg-blue-800 text-white">Save Changes</Button>
                </div>
              </div>
            )}
            {activeCategory === 'scheduling' && <SchedulingSection />}
            {activeCategory === 'payments' && <PaymentMethodsSection />}
            {activeCategory === 'rating-reviews' && <RatingReviewsSection />}
            {activeCategory === 'team' && <TeamSection />}
            {activeCategory === 'sales' && <SalesSection />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}