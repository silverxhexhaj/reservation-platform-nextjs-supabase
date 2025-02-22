'use client';

import { ReactNode, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Header } from '@/app/components/Header';
import { Sidebar } from '@/app/components/client/Sidebar';

export default function ClientLayout({ children }: { children: ReactNode }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex">
            <Header isAlwaysScrolled />
            <div className="flex mt-20 px-16 relative flex-col w-full">
                <div className="flex">
                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-white shadow-md"
                    >
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>

                    {/* Navigation sidebar */}
                    <Sidebar isMobileMenuOpen={isMobileMenuOpen} />

                    {/* Main content area */}
                    <main className="py-10 w-full">
                        {children}
                    </main>

                    {/* Overlay for mobile */}
                    {isMobileMenuOpen && (
                        <div
                            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-5"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}