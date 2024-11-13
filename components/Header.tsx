"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { supabase } from '@/lib/supabase';
import { PlusCircle, Menu, X } from 'lucide-react';

interface HeaderProps {
  user?: { username: string } | null;
}

export function Header({ user }: HeaderProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = (
    <>
      <Link href="/who-we-are" className={`hover:text-gray-300 ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white'}`}>
        Who We Are?
      </Link>
      
      {user ? (
        <>
          <span className={`block md:inline ${isScrolled ? 'text-gray-700' : 'text-white'}`}>Hello, {user.username}!</span>
          <Button 
            onClick={() => {
              handleSignOut();
              setIsMenuOpen(false);
            }}
            className={`${isScrolled ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-200'} w-full md:w-auto`}
          >
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Button 
            onClick={() => {
              router.push('/signin?mode=signin');
              setIsMenuOpen(false);
            }}
            className={`${isScrolled ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-200'} w-full md:w-auto uppercase`}
          >
            Login
          </Button>
          <Button 
            onClick={() => {
              router.push('/signin?mode=register');
              setIsMenuOpen(false);
            }}
            className={`${isScrolled ? 'bg-white text-black border border-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'} w-full md:w-auto uppercase`}
          >
            Register
          </Button>
        </>
      )}
      
      <Link href="/partner">
        <Button 
          className={`${isScrolled ? 'border-gray-900 text-gray-900  hover:bg-black/10' : ' border-white text-white  hover:bg-white/10'} font-semibold border w-full md:w-auto`}
        >
          For businesses
        </Button>
      </Link>
    </>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 will-change-height ${isScrolled ? 'bg-white h-20' : 'bg-transparent md:h-28 h-20'}`}>
      <div className={`max-w-screen-2xl mx-auto px-8 flex justify-between items-center h-full transition-colors duration-300 ${isScrolled ? '' : ''}`}>
        <Link href="/" className={`text-3xl font-semibold ${isScrolled ? 'text-black' : 'text-white'}`}>
          Noorlife
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          {menuItems}
        </div>
        <button
          className={`md:hidden focus:outline-none ${isScrolled ? 'text-gray-600' : 'text-white'}`}
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-md p-4 space-y-4">
          {menuItems}
        </div>
      )}
    </header>
  );
}
