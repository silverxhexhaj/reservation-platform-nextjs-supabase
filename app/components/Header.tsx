"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "./ui/button";
import { supabase } from '@/lib/supabase';
import { PlusCircle, Menu, X, User, Settings, HelpCircle, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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

  const handleAuth = (mode: 'signin' | 'register', returnTo?: string) => {
    const currentPath = returnTo || window.location.pathname;
    const encodedPath = encodeURIComponent(currentPath);
    router.push(`/pages/public/signin?mode=${mode}&returnTo=${encodedPath}`);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = (
    <>
      <div className="flex items-center justify-center space-x-8 flex-1">
        <Link href="/" className={`hover:text-gray-300 ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white'}`}>
          Home
        </Link>
        <Link href="/pages/public/who-we-are" className={`hover:text-gray-300 ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white'}`}>
          Who We Are?
        </Link>
        <Link href="/pages/public/pricing" className={`hover:text-gray-300 ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white'}`}>
          Pricing
        </Link>
      </div>
      
      {user ? (
        <div className="flex items-center gap-4">
          <Link href="/pages/private/business/partner">
            <Button 
              className={`${isScrolled ? 'border-gray-900 text-gray-900  hover:bg-black/10' : ' border-white text-white  hover:bg-white/10'} font-semibold border hidden md:block`}
            >
              For businesses
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/avatars/01.png" alt={user.username} />
                  <AvatarFallback className="bg-slate-100 text-slate-600">
                    {user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user.username}</p>
                  <p className="text-xs text-muted-foreground">john@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help Center</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <>
          <Button 
            onClick={() => handleAuth('signin', '/pages/private/business/partner')}
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
        </>
      )}
    </>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 will-change-height ${isScrolled ? 'bg-white h-20' : 'bg-transparent h-20'}`}>
      <div className={`max-w-screen-2xl mx-auto px-8 flex justify-between items-center h-full transition-colors duration-300 ${isScrolled ? '' : ''}`}>
        <Link href="/" className={`text-3xl font-semibold md:w-80 ${isScrolled ? 'text-black' : 'text-white'}`}>
          NOOR
        </Link>
        
        <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
          <Link href="/" className={`hover:text-gray-300 ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white'}`}>
            Home
          </Link>
          <Link href="/pages/public/who-we-are" className={`hover:text-gray-300 ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white'}`}>
            Who We Are?
          </Link>
          <Link href="/pages/public/pricing" className={`hover:text-gray-300 ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white'}`}>
            Pricing
          </Link>
        </div>

        <div className="hidden md:flex md:w-84 items-center space-x-4 justify-end">
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/pages/private/business/partner">
                <Button 
                  className={`${isScrolled ? 'border-gray-900 text-gray-900  hover:bg-black/10' : ' border-white text-white  hover:bg-white/10'} font-semibold border hidden md:block`}
                >
                  For business
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/avatars/01.png" alt={user.username} />
                      <AvatarFallback className="bg-slate-100 text-slate-600">
                        {user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.username}</p>
                      <p className="text-xs text-muted-foreground">john@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Help Center</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Button 
                onClick={() => handleAuth('signin', '/pages/private/business/partner')}
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
            </>
          )}
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
          <div className="flex flex-col space-y-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="/pages/public/who-we-are" className="text-gray-600 hover:text-gray-900">
              Who We Are?
            </Link>
            <Link href="/pages/public/pricing" className="text-gray-600 hover:text-gray-900">
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/avatars/01.png" alt={user.username} />
                      <AvatarFallback className="bg-slate-100 text-slate-600">
                        {user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.username}</p>
                      <p className="text-xs text-muted-foreground">john@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Help Center</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              <Button 
                onClick={() => handleAuth('signin', '/pages/private/business/partner')}
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
      )}
    </header>
  );
}
