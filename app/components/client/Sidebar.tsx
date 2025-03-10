'use client';

import { ReactNode } from 'react';
import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/button";
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

interface SidebarItem {
    title: string;
    href: string;
    icon: ReactNode;
}

const sidebarItems: SidebarItem[] = [
    {
        title: "Profile",
        href: "/pages/private/client/profile",
        icon: <User className="w-5 h-5" />,
    },
    {
        title: "Appointments",
        href: "/pages/private/client/appointments",
        icon: <Calendar className="w-5 h-5" />,
    },
    {
        title: "Wallet",
        href: "/pages/private/client/wallet",
        icon: <Wallet className="w-5 h-5" />,
    },
    {
        title: "Favourites",
        href: "/pages/private/client/favourites",
        icon: <Heart className="w-5 h-5" />,
    },
    {
        title: "Orders",
        href: "/pages/private/client/orders",
        icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
        title: "Settings",
        href: "/pages/private/client/settings",
        icon: <Settings className="w-5 h-5" />,
    },
];

interface SidebarProps {
    isMobileMenuOpen: boolean;
}

export function Sidebar({ isMobileMenuOpen }: SidebarProps) {
    const pathname = usePathname();

    return (
        <div className={`
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            fixed lg:relative lg:translate-x-0 bg-white left-0 z-40
            transition-transform duration-300 ease-in-out
            flex lg:flex-shrink-0 w-64 p-3 border rounded-lg h-fit hidden lg:block !sticky top-32
        `}>
            <div className="space-y-1 flex flex-col w-full">
                {sidebarItems.map((item) => (
                    <Button
                        key={item.title}
                        variant={pathname?.startsWith(item.href) ? "secondary" : "ghost"}
                        className={`
                            w-full justify-start gap-2 px-3
                            ${pathname?.startsWith(item.href) 
                                ? "bg-gray-100" 
                                : "bg-transparent hover:bg-gray-100/80"
                            }
                            transition-colors duration-200
                        `}
                        asChild
                    >
                        <Link href={item.href} className="flex items-center gap-2">
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    </Button>
                ))}
            </div>
        </div>
    );
} 