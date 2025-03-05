'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Header } from '@/app/components/Header';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/ui/form';
import { authService } from '@/app/service/auth.service';
import { ProfileType } from '@/app/models/supabase.models';
// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

export default function CustomerSignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });



  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {      
      await authService.signUp(values.email, values.password, {
        profile: 'client', 
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone
      });
      
      router.push('/pages/public/signin');
      
    } catch (error: any) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleButtonClick = () => {    
    form.handleSubmit((data) => {
      onSubmit(data);
    })();
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
                  Join as a Customer
                </h1>
                <p className="max-w-[600px] md:text-xl dark:text-gray-400">
                  Create your customer account to discover and book amazing beauty and wellness services.
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
                  <span>Easy Booking</span>
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
                  <span>Verified Services</span>
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
                  <span>Secure Platform</span>
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
                    onClick={() => router.push('/pages/public/signup')}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </div>
                <CardTitle className="text-3xl font-bold tracking-tight">
                  Create Customer Account
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  Enter your details to create your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>First Name*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your first name"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Last Name*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your last name"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Email*</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="name@example.com"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Phone Number*</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Enter your phone number"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Password*</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Create a password"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Confirm Password*</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm your password"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    id="signup-button"
                    type="button" // Changed from submit to button for direct handling
                    className="w-full h-11 text-base font-medium bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white hover:opacity-90 transition-opacity mt-6"
                    disabled={isLoading || !form.formState.isValid}
                    onClick={handleButtonClick}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </Form>

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