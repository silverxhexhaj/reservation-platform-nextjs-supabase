'use client';

import { ReactNode } from 'react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Sidebar } from '@/app/components/client/Sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    User,
    Calendar,
    Wallet,
    Heart,
    ShoppingBag,
    Settings,
} from 'lucide-react';

const navigationItems = [
    {
        title: "Profile",
        href: "/pages/private/client/profile",
        icon: User,
    },
    {
        title: "Appointments",
        href: "/pages/private/client/appointments",
        icon: Calendar,
    },
    {
        title: "Wallet",
        href: "/pages/private/client/wallet",
        icon: Wallet,
    },
    {
        title: "Favourites",
        href: "/pages/private/client/favourites",
        icon: Heart,
    },
    {
        title: "Orders",
        href: "/pages/private/client/orders",
        icon: ShoppingBag,
    },
    {
        title: "Settings",
        href: "/pages/private/client/settings",
        icon: Settings,
    },
];

export default function ClientLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pb-16 lg:pb-0 relative">
            <Header isAlwaysScrolled />

            <div className="flex container mx-auto mt-20 px-4 md:px-8 relative flex-grow space-0-4 md:space-x-16">
                {/* Desktop Sidebar - hidden on mobile */}
                <Sidebar isMobileMenuOpen={false} />

                {/* Main content */}
                <main className="flex-1 min-h-screen pb-8 pt-12">
                    {children}
                </main>
            </div>

            {/* Footer - hidden on mobile */}
            <div className="hidden lg:block">
                <Footer />
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
                <nav className="flex justify-around items-center h-16">
                    {navigationItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex flex-col items-center justify-center flex-1 h-full text-xs gap-1 ${
                                    isActive 
                                        ? 'text-primary' 
                                        : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                <item.icon className="h-5 w-5" />
                                <span>{item.title}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}