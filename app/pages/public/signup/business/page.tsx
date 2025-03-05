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
import { supabase } from '@/app/lib/supabase/client';
import Link from 'next/link';
import { businessCategories } from '@/app/models/supabase.models';
import { z } from 'zod';

type Step = 'account' | 'business' | 'location' | 'additional';

// Define validation schemas for each step
const accountSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

const businessSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  priceRange: z.string().min(1, "Price range is required"),
  phone: z.string().min(10, "Valid phone number is required")
});

const locationSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "Valid ZIP code is required")
});

const additionalSchema = z.object({
  website: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  openingHours: z.string().min(1, "Opening hours are required"),
  amenities: z.string().optional(),
  tags: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional()
});

// Combined schema for the entire form
const formSchema = z.object({
  ...accountSchema.shape,
  ...businessSchema.shape,
  ...locationSchema.shape,
  ...additionalSchema.shape
});

export default function BusinessSignUpPage() {
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState<Step>('account');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    businessName: '',
    category: '',
    description: '',
    priceRange: '',
    phone: '',
    
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    website: '',
    tags: '',
    instagram: '',
    facebook: '',
    twitter: '',
    profile_type: 'business_owner'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field when user selects a value
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateCurrentStep = () => {
    try {
      switch (currentStep) {
        case 'account':
          accountSchema.parse(formData);
          break;
        case 'business':
          businessSchema.parse(formData);
          break;
        case 'location':
          locationSchema.parse(formData);
          break;
        case 'additional':
          additionalSchema.parse(formData);
          break;
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
      return;
    }
    
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
        // Validate the entire form before submission
        formSchema.parse(formData);
        
        
       await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: `${formData.firstName} ${formData.lastName}`,
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        });


        // Show success message and redirect
        router.push('/pages/private/business/partner/dashboard');
      } catch (error) {
        console.error('Error during business registration:', error);
        if (error instanceof Error) {
          console.error(error.message);
        }
        if (error instanceof z.ZodError) {
          const newErrors: Record<string, string> = {};
          error.errors.forEach(err => {
            if (err.path) {
              newErrors[err.path[0]] = err.message;
            }
          });
          setErrors(newErrors);
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
              <label htmlFor="firstName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                First Name
              </label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className={`h-11 ${errors.firstName ? 'border-red-500' : ''}`}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Last Name
              </label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className={`h-11 ${errors.lastName ? 'border-red-500' : ''}`}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
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
                className={`h-11 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
                className={`h-11 ${errors.password ? 'border-red-500' : ''}`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
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
                className={`h-11 ${errors.confirmPassword ? 'border-red-500' : ''}`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
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
                className={`h-11 ${errors.businessName ? 'border-red-500' : ''}`}
              />
              {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Business Category
              </label>
              <Select 
                name="category" 
                onValueChange={(value) => handleSelectChange(value, 'category')}
                value={formData.category}
              >
                <SelectTrigger className={`h-11 ${errors.category ? 'border-red-500' : ''}`}>
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
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
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
                className={`min-h-[100px] ${errors.description ? 'border-red-500' : ''}`}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="priceRange" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Price Range
              </label>
              <Select 
                name="priceRange" 
                onValueChange={(value) => handleSelectChange(value, 'priceRange')}
                value={formData.priceRange}
              >
                <SelectTrigger className={`h-11 ${errors.priceRange ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="$">$ - Budget</SelectItem>
                  <SelectItem value="$$">$$ - Moderate</SelectItem>
                  <SelectItem value="$$$">$$$ - Premium</SelectItem>
                  <SelectItem value="$$$$">$$$$ - Luxury</SelectItem>
                </SelectContent>
              </Select>
              {errors.priceRange && <p className="text-red-500 text-xs mt-1">{errors.priceRange}</p>}
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
                className={`h-11 ${errors.phone ? 'border-red-500' : ''}`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
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
                className={`h-11 ${errors.address ? 'border-red-500' : ''}`}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
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
                className={`h-11 ${errors.city ? 'border-red-500' : ''}`}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
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
                className={`h-11 ${errors.state ? 'border-red-500' : ''}`}
              />
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
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
                className={`h-11 ${errors.zipCode ? 'border-red-500' : ''}`}
              />
              {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
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
                className={`h-11 ${errors.website ? 'border-red-500' : ''}`}
              />
              {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website}</p>}
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
                className={`h-11 ${errors.tags ? 'border-red-500' : ''}`}
              />
              {errors.tags && <p className="text-red-500 text-xs mt-1">{errors.tags}</p>}
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
                className={`h-11 ${errors.instagram ? 'border-red-500' : ''}`}
              />
              {errors.instagram && <p className="text-red-500 text-xs mt-1">{errors.instagram}</p>}
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
                className={`h-11 ${errors.facebook ? 'border-red-500' : ''}`}
              />
              {errors.facebook && <p className="text-red-500 text-xs mt-1">{errors.facebook}</p>}
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
                className={`h-11 ${errors.twitter ? 'border-red-500' : ''}`}
              />
              {errors.twitter && <p className="text-red-500 text-xs mt-1">{errors.twitter}</p>}
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