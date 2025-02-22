"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from "./ui/button";
import { Menu, X } from 'lucide-react';
import { Bebas_Neue } from 'next/font/google';
import { authService } from '../service/auth.service';
import { User } from '@supabase/supabase-js';
import { UserProfileMenu } from './menu/UserProfileMenu';
import { Profile } from '../models/supabase.models';
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
});

interface HeaderProps {
  isAlwaysScrolled?: boolean;
}

export function Header({ isAlwaysScrolled = false }: HeaderProps) {

  const router = useRouter();
  const pathname = usePathname();
  
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(isAlwaysScrolled);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await authService.getUser();
      setUser(userInfo.user);
      setProfile(userInfo.profile);
    };
    fetchUser();
  }, []);


  useEffect(() => {
    if (isAlwaysScrolled) {
      setIsScrolled(true);
      return;
    }
    
    const handleScroll = () => {
      if (pathname?.includes('/explore')) {
        setIsScrolled(true);
        return;
      }
      setIsScrolled(window.scrollY > 0);
    };
  
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, isAlwaysScrolled]);


  const handleAuth = (mode: 'signin' | 'register', returnTo?: string) => {
    const currentPath = returnTo || window.location.pathname;
    if (mode === 'register') {
      router.push('/pages/public/signup');
    } else {
      router.push(`/pages/public/signin?returnTo=${currentPath}`);
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 will-change-height ${isScrolled || isMenuOpen ? 'bg-white h-20' : 'bg-transparent h-20'}`}>
      <div className={`px-16 flex justify-between items-center h-full transition-colors duration-300 ${isScrolled || isMenuOpen ? '' : ''}`}>
        <Link href="/" className={`text-4xl font-semibold lg:w-96 ${bebasNeue.className} ${isScrolled || isMenuOpen ? 'text-black' : 'text-white'}`}>
          NURI
        </Link>
        
        <div className="hidden lg:flex flex-1 justify-center items-center space-x-8">
          <Link href="/" className={`hover:text-gray-300 text-sm ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white'}`}>
            Home
          </Link>
          <Link href="/pages/public/explore" className={`hover:text-gray-300 text-sm ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white'}`}>
            Discover
          </Link>
          <Link href="/pages/public/deals" className={`hover:text-gray-300 text-sm ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white'}`}>
            Deals
          </Link>
          <Link href="/pages/public/who-we-are" className={`hover:text-gray-300 text-sm ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white'}`}>
            Who We Are?
          </Link>
          <Link href="/pages/public/pricing" className={`hover:text-gray-300 text-sm ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white'}`}>
            Pricing
          </Link>
        </div>

        <div className="hidden lg:flex lg:w-96 items-center space-x-4 justify-end">
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/pages/private/business/partner">
                <Button 
                  className={`${isScrolled ? 'border-gray-900 text-gray-900  hover:bg-black/10' : ' border-white text-white  hover:bg-white/10'} font-semibold border hidden md:block`}
                >
                  For businesses
                </Button>
              </Link>
              
              <UserProfileMenu user={user} profile={profile} />
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => router.push('/pages/public/signup/business')}
                className={`${isScrolled ? 'border-gray-900 text-gray-900  hover:bg-black/10' : ' border-white text-white  hover:bg-white/10'} font-semibold border hidden md:block mr-4`}
              >
                For business
              </Button>
              <Button 
                onClick={() => handleAuth('signin')}
                className={`${isScrolled ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-200'} w-full md:w-auto uppercase`}
              >
                Login
              </Button>
              <Button 
                onClick={() => handleAuth('register')}
                className={`${isScrolled ? 'bg-white text-black border border-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'} w-full md:w-auto uppercase`}
              >
                Register
              </Button>
            </div>
          )}
        </div>

        <button
          className={`lg:hidden focus:outline-none ${isScrolled || isMenuOpen ? 'text-gray-600' : 'text-white'}`}
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div 
        className={`lg:hidden absolute top-20 left-0 right-0 bg-white shadow-md px-8 py-4 space-y-4 transform transition-all duration-300 ease-in-out origin-top h-[calc(100vh-5rem)] flex flex-col justify-between ${
          isMenuOpen 
            ? 'opacity-100 translate-y-0 animate-slideDown' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-8 pb-8 justify-center items-center flex-1">
          <Link href="/" className="text-2xl text-center text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link href="/pages/public/explore" className="text-2xl text-center text-gray-600 hover:text-gray-900">
            Discover
          </Link>
          <Link href="/pages/public/who-we-are" className="text-2xl text-center text-gray-600 hover:text-gray-900">
            Who We Are?
          </Link>
          <Link href="/pages/public/pricing" className="text-2xl text-center text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
        </div>
        {user ? (
          <div className="flex flex-col space-y-4">
            <Link href="/pages/private/business/partner">
              <Button className="w-full border border-gray-900 text-gray-900 hover:bg-black/10 font-semibold">
                For businesses
              </Button>
            </Link>
            <UserProfileMenu user={user} profile={profile} />
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            <Button 
              onClick={() => router.push('/pages/public/signup/business')}
              className="w-full border border-gray-900 text-gray-900 hover:bg-black/10 font-semibold"
            >
              For businesses
            </Button>
            <Button 
              onClick={() => handleAuth('signin')}
              className="w-full bg-black text-white hover:bg-gray-800 uppercase"
            >
              Login
            </Button>
            <Button 
              onClick={() => handleAuth('register')}
              className="w-full bg-white text-black border border-black hover:bg-gray-100 uppercase"
            >
              Register
            </Button>
          </div>
        )}
      </div>
      <style jsx global>{`
        @keyframes emerge {
          0%, 100% {
            transform: scaleX(1) translateX(0);
            opacity: 1;
          }
          50% {
            transform: scaleX(2) translateX(0);
            opacity: 0.8;
          }
        }

        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
}
