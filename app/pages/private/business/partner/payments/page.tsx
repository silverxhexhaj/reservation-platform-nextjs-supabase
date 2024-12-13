'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { 
  Search, 
  DollarSign, 
  CreditCard, 
  ArrowUpDown,
  Download,
  Filter,
  Calendar
} from "lucide-react";
import { format } from "date-fns";
import { DatePickerWithRange } from "@/app/components/ui/date-range-picker";
import { cn } from "@/lib/utils";

interface Payment {
  id: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  method: string;
  description: string;
  customer: {
    name: string;
    email: string;
  };
}

const mockPayments: Payment[] = [
  {
    id: 'PAY-001',
    date: '2024-03-15T10:30:00',
    amount: 150.00,
    status: 'completed',
    method: 'Credit Card',
    description: 'Haircut and Styling',
    customer: {
      name: 'John Smith',
      email: 'john@example.com'
    }
  },
  {
    id: 'PAY-002',
    date: '2024-03-15T14:15:00',
    amount: 85.00,
    status: 'completed',
    method: 'Cash',
    description: 'Men\'s Haircut',
    customer: {
      name: 'Mike Johnson',
      email: 'mike@example.com'
    }
  },
  {
    id: 'PAY-003',
    date: '2024-03-14T16:45:00',
    amount: 200.00,
    status: 'pending',
    method: 'Credit Card',
    description: 'Color Treatment',
    customer: {
      name: 'Sarah Wilson',
      email: 'sarah@example.com'
    }
  }
];

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [payments] = useState<Payment[]>(mockPayments);

  const stats = {
    totalRevenue: payments
      .filter(p => p.status === 'completed')
      .reduce((acc, p) => acc + p.amount, 0),
    pendingAmount: payments
      .filter(p => p.status === 'pending')
      .reduce((acc, p) => acc + p.amount, 0),
    totalTransactions: payments.length
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || payment.method.toLowerCase() === methodFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.totalRevenue.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Amount
            </CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.pendingAmount.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Transactions
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTransactions}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search payments..."
              className="pl-8 w-full sm:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={methodFilter} onValueChange={setMethodFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="credit card">Credit Card</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
            </SelectContent>
          </Select>
          <DatePickerWithRange className="w-[300px]" />
        </div>
        <Button 
          className="gap-2 bg-primary hover:bg-primary/90 text-white w-full sm:w-auto"
          onClick={() => {
            // Handle export functionality
          }}
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Payments List */}
      <Card className="bg-white">
        <ScrollArea className="h-[600px] rounded-md border">
          <div className="p-4 space-y-4">
            {filteredPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{payment.customer.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {payment.description}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      ${payment.amount.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(payment.date), "PP")}
                    </div>
                  </div>
                  <div className={cn(
                    "px-2.5 py-0.5 rounded-full text-xs font-medium",
                    payment.status === 'completed' && "bg-green-100 text-green-700",
                    payment.status === 'pending' && "bg-yellow-100 text-yellow-700",
                    payment.status === 'failed' && "bg-red-100 text-red-700"
                  )}>
                    {payment.status}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {payment.method}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
} 