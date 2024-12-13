'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { 
  DollarSign, 
  Calendar as CalendarIcon, 
  TrendingUp, 
  Users,
  Clock,
  Star,
  ArrowUpRight,
  ChevronRight
} from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { useRouter } from 'next/navigation';

interface Appointment {
  id: string;
  clientName: string;
  clientAvatar?: string;
  service: string;
  time: string;
  duration: number;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface TopService {
  name: string;
  bookings: number;
  revenue: number;
  trend: number;
}

const upcomingAppointments: Appointment[] = [
  {
    id: '1',
    clientName: 'Emma Wilson',
    clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    service: 'Haircut & Styling',
    time: '2024-02-25T10:00:00',
    duration: 60,
    price: 80,
    status: 'upcoming'
  },
  {
    id: '2',
    clientName: 'Michael Chen',
    clientAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    service: 'Beard Trim',
    time: '2024-02-25T11:30:00',
    duration: 30,
    price: 40,
    status: 'upcoming'
  },
  {
    id: '3',
    clientName: 'Sophie Taylor',
    clientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    service: 'Color Treatment',
    time: '2024-02-25T14:00:00',
    duration: 120,
    price: 150,
    status: 'upcoming'
  },
];

const topServices: TopService[] = [
  { name: 'Haircut & Styling', bookings: 145, revenue: 11600, trend: 12.5 },
  { name: 'Color Treatment', bookings: 98, revenue: 14700, trend: 8.2 },
  { name: 'Beard Trim', bookings: 87, revenue: 3480, trend: -2.4 },
  { name: 'Hair Treatment', bookings: 76, revenue: 6840, trend: 5.7 },
];

export default function PartnerDashboard() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState<'7days' | '30days'>('7days');

  const stats = {
    revenue: 15234.56,
    appointments: 187,
    newClients: 45,
    avgOrderValue: 81.47
  };

  const handleViewCalendar = () => {
    localStorage.setItem('upcomingAppointments', JSON.stringify(upcomingAppointments));
    router.push('/partner/calendar');
  };

  return (
    <div className="space-y-6 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">+12.5% from last month</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Appointments</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.appointments}</div>
            <div className="text-xs text-muted-foreground">+8.2% from last month</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">New Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newClients}</div>
            <div className="text-xs text-muted-foreground">+15.3% from last month</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.avgOrderValue}</div>
            <div className="text-xs text-muted-foreground">+3.2% from last month</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg font-semibold">Upcoming Appointments</CardTitle>
              <p className="text-sm text-muted-foreground">Today&apos;s schedule</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={handleViewCalendar}
            >
              View Calendar
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <ScrollArea className="h-[400px]">
            <CardContent className="p-0">
              <div className="space-y-4 p-6">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={appointment.clientAvatar} alt={appointment.clientName} />
                        <AvatarFallback>
                          {appointment.clientName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{appointment.clientName}</div>
                        <div className="text-sm text-muted-foreground">{appointment.service}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">{format(new Date(appointment.time), "h:mm a")}</div>
                        <div className="text-sm text-muted-foreground">{appointment.duration} min</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${appointment.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </ScrollArea>
        </Card>

        {/* Top Services */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg font-semibold">Top Services</CardTitle>
              <p className="text-sm text-muted-foreground">By number of bookings</p>
            </div>
            <Select value={timeRange} onValueChange={(value: '7days' | '30days') => setTimeRange(value)}>
              <SelectTrigger className="w-[130px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <ScrollArea className="h-[400px]">
            <CardContent className="p-0">
              <div className="space-y-4 p-6">
                {topServices.map((service) => (
                  <div
                    key={service.name}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-muted-foreground">{service.bookings} bookings</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">${service.revenue.toLocaleString()}</div>
                        <div className="flex items-center gap-1 text-sm">
                          <ArrowUpRight className={cn(
                            "h-4 w-4",
                            service.trend > 0 ? "text-green-500" : "text-red-500 rotate-180"
                          )} />
                          <span className={cn(
                            service.trend > 0 ? "text-green-600" : "text-red-600"
                          )}>
                            {Math.abs(service.trend)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}