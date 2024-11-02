'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const salesCategories = [
  { id: 'daily-summary', label: 'Daily Sales Summary' },
  { id: 'appointments', label: 'Appointments' },
  { id: 'sales', label: 'Sales' },
  { id: 'payment-transactions', label: 'Payment Transactions' },
];

export default function Sales() {
  const [activeCategory, setActiveCategory] = useState(salesCategories[0].id);

  return (
    <div className="bg-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Sales</h1>
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-64 md:sticky md:top-4 md:self-start">
          <div className="md:max-h-[calc(100vh-8rem)] md:overflow-y-auto md:pr-4">
            <nav className="space-y-1 border rounded-md p-2 bg-white">
              {salesCategories.map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100",
                    activeCategory === category.id && "bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900"
                  )}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </Button>
              ))}
            </nav>
          </div>
        </aside>
        <main className="flex-1 md:ml-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">
                {salesCategories.find(c => c.id === activeCategory)?.label}
              </CardTitle>
              <CardDescription className="text-gray-700">
                Manage your {salesCategories.find(c => c.id === activeCategory)?.label.toLowerCase()} here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeCategory === 'daily-summary' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                      <CardHeader className="bg-gray-50 border-b border-gray-200">
                        <CardTitle className="text-lg font-semibold text-gray-700">Total Revenue</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <p className="text-3xl font-bold text-gray-900">$15,234.56</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                      <CardHeader className="bg-gray-50 border-b border-gray-200">
                        <CardTitle className="text-lg font-semibold text-gray-700">Average Order Value</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <p className="text-3xl font-bold text-gray-900">$78.50</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                      <CardHeader className="bg-gray-50 border-b border-gray-200">
                        <CardTitle className="text-lg font-semibold text-gray-700">Conversion Rate</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <p className="text-3xl font-bold text-gray-900">3.2%</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-gray-900">Transaction Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Total Transactions</h3>
                          <p className="mt-1 text-2xl font-semibold text-gray-900">1,234</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Successful Transactions</h3>
                          <p className="mt-1 text-2xl font-semibold text-gray-900">1,200</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Failed Transactions</h3>
                          <p className="mt-1 text-2xl font-semibold text-gray-900">34</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Refunds</h3>
                          <p className="mt-1 text-2xl font-semibold text-gray-900">5</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-gray-900">Cash Movement Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Cash In</h3>
                          <p className="mt-1 text-2xl font-semibold text-gray-900">$10,500.00</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Cash Out</h3>
                          <p className="mt-1 text-2xl font-semibold text-gray-900">$2,300.00</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Net Cash Flow</h3>
                          <p className="mt-1 text-2xl font-semibold text-green-600">$8,200.00</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Ending Balance</h3>
                          <p className="mt-1 text-2xl font-semibold text-gray-900">$25,700.00</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              {activeCategory === 'appointments' && (
                <p className="text-gray-800">Appointments content goes here.</p>
              )}
              {activeCategory === 'sales' && (
                <p className="text-gray-800">Sales content goes here.</p>
              )}
              {activeCategory === 'payment-transactions' && (
                <p className="text-gray-800">Payment transactions content goes here.</p>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}