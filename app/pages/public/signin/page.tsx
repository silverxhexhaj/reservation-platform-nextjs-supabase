"use client";

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import Link from 'next/link';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'signin';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">{mode === 'signin' ? 'Sign In' : 'Register'}</CardTitle>
        <CardDescription>
          {mode === 'signin' 
            ? 'Enter your email and password to access your account'
            : 'Create a new account to get started'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
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
            />
          </div>
          <Button type="submit" className="w-full">
            {mode === 'signin' ? 'Sign In' : 'Register'}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          {mode === 'signin' ? (
            <p className="text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/pages/public/signin?mode=register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          ) : (
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/pages/public/signin?mode=signin" className="text-blue-600 hover:underline">
                Sign In
              </Link>
            </p>
          )}
          <Link href="/pages/public/forgot-password" className="text-blue-600 hover:underline block mt-2">
            Forgot your password?
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function SignInPage() {
  const [user, setUser] = useState<{ username: string } | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4">
        <Suspense fallback={<div>Loading...</div>}>
          <SignInContent />
        </Suspense>
      </main>
    </div>
  );
}
