'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Search, User, Settings } from 'lucide-react';

export function PartnerHeader() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-gray-50 border-gray-300 focus:border-blue-600 focus:ring-blue-600 rounded-full text-gray-900"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <Bell className="w-5 h-5" />
          </Button>
          <Link href="/partner/settings" passHref>
            <Button variant="outline" size="icon" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <Settings className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/partner/profile" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">John Doe</span>
          </Link>
        </div>
      </div>
    </header>
  );
}