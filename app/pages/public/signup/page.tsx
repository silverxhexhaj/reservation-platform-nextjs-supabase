'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { motion } from 'framer-motion';
import { Store, User } from 'lucide-react';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();
  
  const [selectedType, setSelectedType] = useState<'customer' | 'business' | null>(null);

  const handleTypeSelection = (type: 'customer' | 'business') => {
    setSelectedType(type);
    if (type === 'customer') {
      router.push('/pages/public/signup/customer');
    } else {
      router.push('/pages/public/signup/business');
    }
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
                  Join Our Platform
                </h1>
                <p className="max-w-[600px] md:text-xl dark:text-gray-400">
                  Create an account and discover a world of beauty and wellness services. Choose how you want to be part of our community.
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
                  <span>Easy Registration</span>
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

            {/* Right side - Sign up options */}
            <Card className="w-full max-w-md mx-auto lg:ml-auto shadow-lg border-0 bg-white">
              <CardHeader className="space-y-2 text-center pb-8">
                <CardTitle className="text-3xl font-bold tracking-tight">
                  Create an Account
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  Choose how you want to use Nooor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {/* Customer and Business Options in a row */}
                  <div className="flex gap-4">
                    {/* Customer Option */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        className="w-full h-auto p-6 flex flex-col items-center gap-4 hover:border-blue-500 hover:bg-blue-50"
                        onClick={() => handleTypeSelection('customer')}
                      >
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="space-y-2 text-center">
                          <h3 className="font-semibold text-xl">Customer</h3>
                          <p className="text-sm text-gray-500">
                            Book appointments and services
                          </p>
                        </div>
                      </Button>
                    </motion.div>

                    {/* Business Option */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        className="w-full h-auto p-6 flex flex-col items-center gap-4 hover:border-purple-500 hover:bg-purple-50"
                        onClick={() => handleTypeSelection('business')}
                      >
                        <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                          <Store className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="space-y-2 text-center">
                          <h3 className="font-semibold text-xl">Business</h3>
                          <p className="text-sm text-gray-500">
                            Manage and grow your client base
                          </p>
                        </div>
                      </Button>
                    </motion.div>
                  </div>

                  <div className="relative mt-4">
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