'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  Home, Calendar, DollarSign, Users, Book, 
  TrendingUp, CreditCard, Users as Team, Settings,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";

const menuItems = [
  { name: 'Dashboard', icon: Home, href: '/pages/private/business/partner' },
  { name: 'Calendar', icon: Calendar, href: '/pages/private/business/partner/calendar' },
  { name: 'Sales', icon: DollarSign, href: '/pages/private/business/partner/sales' },
  { name: 'Clients', icon: Users, href: '/pages/private/business/partner/clients' },
  { name: 'Catalog', icon: Book, href: '/pages/private/business/partner/catalog' },
  { name: 'Marketing', icon: TrendingUp, href: '/pages/private/business/partner/marketing' },
  { name: 'Payment', icon: CreditCard, href: '/pages/private/business/partner/payment' },
  { name: 'Team', icon: Team, href: '/pages/private/business/partner/team' },
  { name: 'Settings', icon: Settings, href: '/pages/private/business/partner/settings' },
];

export default function PartnerNavigation() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={cn(
      "bg-black text-white transition-all duration-300 ease-in-out",
      isCollapsed ? "w-[70px]" : "w-80"
    )}>
      <Link 
        href="/pages/private/business/partner" 
        className={cn(
          "block p-6 hover:bg-gray-900 transition-colors duration-200 overflow-hidden whitespace-nowrap",
          isCollapsed && "p-6"
        )}
      >
        <h2 className="text-2xl font-bold transition-all duration-300 ease-in-out">
          {isCollapsed ? "N" : "Nooor "} 
          <span className={cn(
            "text-blue-500 font-light transition-opacity duration-300",
            isCollapsed ? "opacity-0" : "opacity-100"
          )}>
            Partner
          </span>
        </h2>
      </Link>
      <nav className={cn("mt-4", isCollapsed ? "px-2" : "px-3")}>
        <ul>
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/pages/private/business/partner' && pathname.startsWith(item.href));
            return (
              <li key={item.name} className="mb-2 relative group">
                <Link 
                  href={item.href} 
                  className={cn(
                    "rounded-md flex items-center transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap",
                    isCollapsed ? "justify-center px-2 py-2" : "px-3 py-2",
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-200 hover:bg-gray-900 hover:text-white'
                  )}
                >
                  <item.icon className={cn(
                    "w-5 h-5 flex-shrink-0 transition-all duration-300 ease-in-out",
                    isCollapsed ? "mr-0" : "mr-3",
                    isActive ? 'text-white' : 'text-gray-400'
                  )} />
                  <span className={cn(
                    "transition-all duration-300 ease-in-out",
                    isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                  )}>
                    {item.name}
                  </span>
                  {isCollapsed && (
                    <div className={cn(
                      "absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md whitespace-nowrap",
                      "opacity-0 invisible group-hover:opacity-100 group-hover:visible",
                      "transition-all duration-200 transform translate-x-2 group-hover:translate-x-0",
                      "pointer-events-none z-50"
                    )}>
                      {item.name}
                      <div className="absolute top-1/2 -left-1 w-2 h-2 bg-gray-900 transform -translate-y-1/2 rotate-45" />
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Button
        variant="ghost"
        size="icon"
        className="absolute bottom-4 right-0 translate-x-1/2 rounded-full bg-black hover:bg-gray-900 text-white border border-gray-800 transition-all duration-300 ease-in-out"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </aside>
  );
}