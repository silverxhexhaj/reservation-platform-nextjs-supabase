'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { businessCategories } from '@/app/models/supabase.models';

type Step = 'account' | 'business' | 'location' | 'additional';

export default function BusinessSignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>('account');
  const [formData, setFormData] = useState({
    // Account Information
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Business Information
    businessName: '',
    category: '',
    description: '',
    priceRange: '',
    phone: '',
    
    // Location
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Additional Information
    website: '',
    openingHours: '',
    amenities: '',
    tags: '',
    instagram: '',
    facebook: '',
    twitter: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep !== 'additional') {
      const nextSteps: Record<Step, Step> = {
        account: 'business',
        business: 'location',
        location: 'additional',
        additional: 'additional'
      };
      setCurrentStep(nextSteps[currentStep]);
    } else {
      try {
        // First, create the user account
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        });

        if (authError) {
          console.error('Auth error:', authError);
          throw new Error(authError.message);
        }

        if (!authData.user) {
          throw new Error('No user data returned after signup');
        }

        // Then, create the business record
        const { error: businessError } = await supabase
          .from('businesses')
          .insert([
            {
              owner_id: authData.user.id,
              name: formData.businessName,
              description: formData.description,
              category: formData.category,
              price_range: formData.priceRange,
              image_url: null,
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zip_code: formData.zipCode,
              phone: formData.phone,
              website: formData.website || null,
              hours: formData.openingHours || null,
              amenities: formData.amenities ? formData.amenities.split(',').map(item => item.trim()) : [],
              tags: formData.tags ? formData.tags.split(',').map(item => item.trim()) : [],
              social_media: {
                instagram: formData.instagram || null,
                facebook: formData.facebook || null,
                twitter: formData.twitter || null
              },
              is_verified: false,
              is_active: true
            }
          ]);

        if (businessError) {
          console.error('Business creation error:', businessError);
          throw businessError;
        }

        // Show success message and redirect
        router.push('/pages/private/business/partner/dashboard');
      } catch (error) {
        console.error('Error during business registration:', error);
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }
  };

  const goBack = () => {
    if (currentStep === 'account') {
      router.push('/pages/public/signup');
    } else {
      const previousSteps: Record<Step, Step> = {
        account: 'account',
        business: 'account',
        location: 'business',
        additional: 'location'
      };
      setCurrentStep(previousSteps[currentStep]);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'account':
        return (
          <>
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Full Name
              </label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="h-11"
              />
            </div>
          </>
        );

      case 'business':
        return (
          <>
            <div className="space-y-2">
              <label htmlFor="businessName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Business Name
              </label>
              <Input
                id="businessName"
                name="businessName"
                type="text"
                placeholder="Enter business name"
                value={formData.businessName}
                onChange={handleInputChange}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Business Category
              </label>
              <Select name="category" onValueChange={(value) => handleSelectChange(value, 'category')}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {businessCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Business Description
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your business"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="priceRange" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Price Range
              </label>
              <Select name="priceRange" onValueChange={(value) => handleSelectChange(value, 'priceRange')}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="$">$ - Budget</SelectItem>
                  <SelectItem value="$$">$$ - Moderate</SelectItem>
                  <SelectItem value="$$$">$$$ - Premium</SelectItem>
                  <SelectItem value="$$$$">$$$$ - Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Business Phone
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter business phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="h-11"
              />
            </div>
          </>
        );

      case 'location':
        return (
          <>
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Street Address
              </label>
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="Enter street address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                City
              </label>
              <Input
                id="city"
                name="city"
                type="text"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="state" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                State
              </label>
              <Input
                id="state"
                name="state"
                type="text"
                placeholder="Enter state"
                value={formData.state}
                onChange={handleInputChange}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="zipCode" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                ZIP Code
              </label>
              <Input
                id="zipCode"
                name="zipCode"
                type="text"
                placeholder="Enter ZIP code"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
                className="h-11"
              />
            </div>
          </>
        );

      case 'additional':
        return (
          <>
            <div className="space-y-2">
              <label htmlFor="website" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Website (Optional)
              </label>
              <Input
                id="website"
                name="website"
                type="url"
                placeholder="https://example.com"
                value={formData.website}
                onChange={handleInputChange}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="openingHours" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Opening Hours
              </label>
              <Textarea
                id="openingHours"
                name="openingHours"
                placeholder="Enter your business hours"
                value={formData.openingHours}
                onChange={handleInputChange}
                required
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="amenities" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Amenities (Optional)
              </label>
              <Input
                id="amenities"
                name="amenities"
                type="text"
                placeholder="Comma-separated list of amenities"
                value={formData.amenities}
                onChange={handleInputChange}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Tags (Optional)
              </label>
              <Input
                id="tags"
                name="tags"
                type="text"
                placeholder="Comma-separated list of tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="instagram" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Instagram (Optional)
              </label>
              <Input
                id="instagram"
                name="instagram"
                type="text"
                placeholder="@username"
                value={formData.instagram}
                onChange={handleInputChange}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="facebook" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Facebook (Optional)
              </label>
              <Input
                id="facebook"
                name="facebook"
                type="text"
                placeholder="Facebook page URL"
                value={formData.facebook}
                onChange={handleInputChange}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="twitter" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Twitter (Optional)
              </label>
              <Input
                id="twitter"
                name="twitter"
                type="text"
                placeholder="@username"
                value={formData.twitter}
                onChange={handleInputChange}
                className="h-11"
              />
            </div>
          </>
        );
    }
  };

  const stepTitles: Record<Step, string> = {
    account: 'Account Information',
    business: 'Business Information',
    location: 'Location Details',
    additional: 'Additional Information'
  };

  const stepDescriptions: Record<Step, string> = {
    account: 'Create your account credentials',
    business: 'Tell us about your business',
    location: 'Where is your business located?',
    additional: 'Add more details about your business'
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center py-16 sm:py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Hero content */}
            <div className="hidden lg:flex flex-col space-y-8">
              <div className="space-y-4 text-white">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-white">
                  Join as a Business
                </h1>
                <p className="max-w-[600px] md:text-xl dark:text-gray-400">
                  Create your business account to showcase your services and grow your client base.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-white">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Business Tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Client Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Right side - Sign up form */}
            <Card className="w-full max-w-md mx-auto lg:ml-auto shadow-lg border-0 bg-white">
              <CardHeader className="space-y-2 text-center pb-8">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-4 text-gray-600 hover:text-gray-900"
                    onClick={goBack}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </div>
                <CardTitle className="text-3xl font-bold tracking-tight">
                  {stepTitles[currentStep]}
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  {stepDescriptions[currentStep]}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {renderStepContent()}
                  <Button type="submit" className="w-full h-11 text-base font-medium bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white hover:opacity-90 transition-opacity mt-6">
                    {currentStep === 'additional' ? (
                      'Create Business Account'
                    ) : (
                      <>
                        Next Step
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-muted" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="text-center space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{' '}
                      <Link href="/pages/public/signin" className="font-medium text-gray-900 hover:underline underline-offset-4">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
} 