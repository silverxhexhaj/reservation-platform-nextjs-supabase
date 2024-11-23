'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, Calendar, DollarSign, Users, Book, 
  TrendingUp, CreditCard, Users as Team, Settings 
} from 'lucide-react';

const menuItems = [
  { name: 'Home', icon: Home, href: '/partner' },
  { name: 'Calendar', icon: Calendar, href: '/partner/calendar' },
  { name: 'Sales', icon: DollarSign, href: '/partner/sales' },
  { name: 'Clients', icon: Users, href: '/partner/clients' },
  { name: 'Catalog', icon: Book, href: '/partner/catalog' },
  { name: 'Marketing', icon: TrendingUp, href: '/partner/marketing' },
  { name: 'Payment', icon: CreditCard, href: '/partner/payment' },
  { name: 'Team', icon: Team, href: '/partner/team' },
  { name: 'Settings', icon: Settings, href: '/partner/settings' },
];

export default function PartnerNavigation() {
  const pathname = usePathname();

  return (
    <aside className="w-80 bg-black text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Look <span className="text-blue-600 font-light italic">Partner</span></h2>
      </div>
      <nav className="mt-4 px-3">
        <ul>
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/partner' && pathname.startsWith(item.href));
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