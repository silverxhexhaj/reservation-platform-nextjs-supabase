"use client";

import { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabase';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'signin';
  const returnTo = searchParams.get('returnTo') || '/';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (mode === 'signin') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          console.error('Error signing in:', error.message);
          return;
        }

        if (data?.user) {
          router.push(returnTo); // Redirect to the returnTo URL
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          return;
        }

        if (data?.user) {
          router.push(returnTo); // Redirect to the returnTo URL
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ">
        {/* Left side - Hero content */}
        <div className="hidden lg:flex flex-col space-y-8">
          <div className="space-y-4 text-white">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-white">
              Welcome to Our Platform
            </h1>
            <p className="max-w-[600px] md:text-xl dark:text-gray-400">
              Join our community of users and discover a world of possibilities. Sign in to access your account or create a new one to get started.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-white">
            <div className="flex items-center gap-2">
              <svg
                className=" h-4 w-4"
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
              <span>Secure Authentication</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className=" h-4 w-4"
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
              <span>Easy Access</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className=" h-4 w-4"
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
            <div className="flex items-center gap-2">
              <svg
                className=" h-4 w-4"
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
              <span>Privacy Protected</span>
            </div>
          </div>
        </div>

        {/* Right side - Sign in form */}
        <Card className="w-full max-w-md mx-auto lg:ml-auto shadow-lg border-0 bg-white">
          <CardHeader className="space-y-2 text-center pb-8">
            <CardTitle className="text-3xl font-bold tracking-tight">
              {mode === 'signin' ? 'Welcome back' : 'Create account'}
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              {mode === 'signin' 
                ? 'Enter your credentials to access your account'
                : 'Fill in your details to create a new account'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email address
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
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="h-11"
                />
              </div>
              <Button type="submit" className="w-full h-11 text-base font-medium bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white hover:opacity-90 transition-opacity">
                {mode === 'signin' ? 'Sign in to your account' : 'Create your account'}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white/50 backdrop-blur-xl px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="text-center space-y-3">
                {mode === 'signin' ? (
                  <p className="text-sm text-muted-foreground">
                    New to our platform?{' '}
                    <Link 
                      href="/pages/public/signup"
                      className="font-medium text-gray-900 hover:underline underline-offset-4"
                    >
                      Create an account
                    </Link>
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link 
                      href={`/pages/public/signin?mode=signin&returnTo=${returnTo}`} 
                      className="font-medium text-gray-900 hover:underline underline-offset-4"
                    >
                      Sign in
                    </Link>
                  </p>
                )}
                <Link 
                  href="/pages/public/forgot-password" 
                  className="text-sm font-medium text-gray-900 hover:underline underline-offset-4"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function SignInPage() {

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center py-16 sm:py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
        <Suspense fallback={
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        }>
          <SignInContent />
        </Suspense>
      </main>
    </div>
  );
}
