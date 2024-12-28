'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, Calendar, DollarSign, Users, Book, 
  TrendingUp, CreditCard, Users as Team, Settings 
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', icon: Home, href: '/pages/private/business/partner' },
  { name: 'Calendar', icon: Calendar, href: '/pages/private/business/partner/calendar' },
  { name: 'Calendar Beta', icon: Calendar, href: '/pages/private/business/partner/calendar-beta' },
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

  return (
    <aside className="w-80 bg-black text-white">
      <Link href="/pages/private/business/partner" className="block p-6 hover:bg-gray-900 transition-colors duration-200">
        <h2 className="text-2xl font-bold">Nooor <span className="text-blue-500 font-light">Partner</span></h2>
      </Link>
      <nav className="mt-4 px-3">
        <ul>
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/pages/private/business/partner' && pathname.startsWith(item.href));
            return (
              <li key={item.name} className="mb-2">
                <Link 
                  href={item.href} 
                  className={`rounded-md flex items-center px-3 py-2 transition-colors duration-200
                    ${isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-200 hover:bg-gray-900 hover:text-white'
                    }`}
                >
                  <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}