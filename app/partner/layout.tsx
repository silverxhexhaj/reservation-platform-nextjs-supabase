'use client';

import { ReactNode, useState } from 'react';
import PartnerNavigation from './PartnerNavigation';
import { PartnerHeader } from './components/PartnerHeader';
import { Menu, X } from 'lucide-react';

export default function PartnerLayout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-white shadow-md"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Navigation sidebar */}
      <div className={`
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static fixed inset-y-0 left-0 z-10
        transition-transform duration-300 ease-in-out
        lg:flex lg:flex-shrink-0
      `}>
        <PartnerNavigation />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <PartnerHeader />
        <main className="flex-1 overflow-y-auto bg-white p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-5"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}