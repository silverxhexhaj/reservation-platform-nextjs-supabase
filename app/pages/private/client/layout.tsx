'use client';

import { ReactNode, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PartnerHeader } from '../business/partner/components/PartnerHeader';

export default function PartnerLayout({ children }: { children: ReactNode }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-screen bg-white">
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
                Navigation here
            </div>

            {/* Main content area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                Header here
                <main className="flex-1 bg-white overflow-y-scroll px-0 md:px-8 lg:px-10">
                    {children}
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