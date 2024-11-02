"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function SignInSignUp() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const mode = searchParams?.get('mode') ?? 'signin';
    setIsSignIn(mode !== 'register');
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      if (isSignIn) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        router.push('/');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: email.split('@')[0], // Using email prefix as username
            }
          }
        });
        
        if (error) throw error;
        router.push('/');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
          alt="Workspace with laptop and coffee"
          layout="fill"
          objectFit="cover"
          className="rounded-r-3xl"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-r-3xl">
          <h1 className="text-4xl font-bold text-white text-center px-8">
            Welcome to Our Platform
          </h1>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md bg-white shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              {isSignIn ? 'Sign in to your account' : 'Create a new account'}
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              {isSignIn ? 'Enter your credentials to access your account' : 'Fill in the details to create your account'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-800 font-semibold">Error</AlertTitle>
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                {isSignIn ? 'Sign in' : 'Sign up'}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              variant="link"
              onClick={() => setIsSignIn(!isSignIn)}
              className="w-full text-blue-600 hover:text-blue-700 font-medium"
            >
              {isSignIn ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
