"use client";

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/app/components/Header';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { authService } from '@/app/service/auth.service';

function SignInContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await authService.signIn(formData.email, formData.password);

      if (!data) {
        setError('Invalid email or password');
        return;
      }

      const isPartner = await authService.isPartner();
      if (isPartner) {
        router.push('/pages/private/business/partner');
        return;
      }

      const isClient = await authService.isClient();
      if (isClient) {
        router.push('/pages/private/client/appointments');
        return;
      }

      router.push('/');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
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
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Hero content */}
        <div className="hidden lg:flex flex-col space-y-8">
          <div className="space-y-4 text-white">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-white">
              Welcome Back
            </h1>
            <p className="max-w-[600px] md:text-xl dark:text-gray-400">
              Sign in to access your account and continue your journey with us.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-white">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Secure Authentication</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Easy Access</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Privacy Protected</span>
            </div>
          </div>
        </div>

        {/* Right side - Sign in form */}
        <Card className="w-full max-w-md mx-auto lg:ml-auto shadow-lg border-0 bg-white">
          <CardHeader className="space-y-2 text-center pb-8">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Welcome back
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

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
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="w-full h-11 text-base font-medium bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in to your account'}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  New to our platform?{' '}
                  <Link
                    href="/pages/public/signup"
                    className="font-medium text-gray-900 hover:underline underline-offset-4"
                  >
                    Create an account
                  </Link>
                </p>
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
