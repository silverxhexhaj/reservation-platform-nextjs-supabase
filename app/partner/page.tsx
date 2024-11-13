'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type TimeFilter = '7days' | '30days';

interface SectionProps {
  title: string;
  filter?: TimeFilter;
  onFilterChange?: (value: TimeFilter) => void;
  children: React.ReactNode;
}

function Section({ title, filter, onFilterChange, children }: SectionProps) {
  return (
    <Card className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <CardHeader className="bg-gray-50 border-b border-gray-200 flex flex-row justify-between items-center p-4">
        <CardTitle className="text-lg font-semibold text-gray-800">{title}</CardTitle>
        {filter && onFilterChange && (
          <Select value={filter} onValueChange={(value) => onFilterChange(value as TimeFilter)}>
            <SelectTrigger className="w-[130px] h-8 text-sm text-gray-800">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardHeader>
      <CardContent className="p-4">
        {children}
      </CardContent>
    </Card>
  );
}

export default function PartnerDashboard() {
  const [recentSalesFilter, setRecentSalesFilter] = useState<TimeFilter>('7days');
  const [upcomingAppointmentsFilter, setUpcomingAppointmentsFilter] = useState<TimeFilter>('7days');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section 
          title="Recent Sales" 
          filter={recentSalesFilter} 
          onFilterChange={setRecentSalesFilter}
        >
          <div className="space-y-2">
            <p className="text-2xl font-bold text-gray-900">$12,345</p>
            <p className="text-sm text-gray-500">Total sales for {recentSalesFilter}</p>
          </div>
        </Section>

        <Section 
          title="Upcoming Appointments" 
          filter={upcomingAppointmentsFilter} 
          onFilterChange={setUpcomingAppointmentsFilter}
        >
          <div className="space-y-2">
            <p className="text-2xl font-bold text-gray-900">23</p>
            <p className="text-sm text-gray-500">Appointments for {upcomingAppointmentsFilter}</p>
          </div>
        </Section>

        <Section title="Today's Next Appointments">
          <ul className="space-y-2">
            <li className="text-sm text-gray-700">10:00 AM - John Doe (Haircut)</li>
            <li className="text-sm text-gray-700">11:30 AM - Jane Smith (Manicure)</li>
            <li className="text-sm text-gray-700">2:00 PM - Bob Johnson (Massage)</li>
          </ul>
        </Section>

        <Section title="Top Services">
          <ul className="space-y-2">
            <li className="text-sm text-gray-700">1. Haircut (45 bookings)</li>
            <li className="text-sm text-gray-700">2. Manicure (32 bookings)</li>
            <li className="text-sm text-gray-700">3. Massage (28 bookings)</li>
          </ul>
        </Section>

        <Section title="Top Team Member">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-lg font-semibold text-gray-600">AS</span>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Alice Smith</p>
              <p className="text-sm text-gray-500">52 appointments this month</p>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}