'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  DollarSign, 
  CreditCard, 
  ArrowUpDown,
  Download,
  Settings2,
  Calendar,
  Wallet,
  Plus
} from "lucide-react";
import { format } from "date-fns";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  method: string;
  type: 'payout' | 'booking';
  description: string;
  customer?: {
    name: string;
    email: string;
  };
}

const mockTransactions: Transaction[] = [
  {
    id: 'TRX-001',
    date: '2024-03-15T10:30:00',
    amount: 150.00,
    status: 'completed',
    method: 'Credit Card',
    type: 'booking',
    description: 'Haircut and Styling',
    customer: {
      name: 'John Smith',
      email: 'john@example.com'
    }
  },
  {
    id: 'TRX-002',
    date: '2024-03-15T00:00:00',
    amount: 1234.56,
    status: 'completed',
    method: 'Bank Transfer',
    type: 'payout',
    description: 'Monthly Payout'
  },
  {
    id: 'TRX-003',
    date: '2024-03-14T16:45:00',
    amount: 200.00,
    status: 'pending',
    method: 'Credit Card',
    type: 'booking',
    description: 'Color Treatment',
    customer: {
      name: 'Sarah Wilson',
      email: 'sarah@example.com'
    }
  }
];

export default function PaymentPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [transactions] = useState<Transaction[]>(mockTransactions);

  const stats = {
    totalRevenue: transactions
      .filter(t => t.type === 'booking' && t.status === 'completed')
      .reduce((acc, t) => acc + t.amount, 0),
    pendingAmount: transactions
      .filter(t => t.status === 'pending')
      .reduce((acc, t) => acc + t.amount, 0),
    lastPayout: transactions
      .filter(t => t.type === 'payout')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.customer?.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track your transactions, payouts, and payment settings
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            className="bg-blue-700 hover:bg-blue-800 text-white"
            onClick={() => {
              // Handle new transaction
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Transaction
          </Button>
        </div>
      </div>

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
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
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
            <p className="text-xs text-muted-foreground">
              5 pending transactions
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Last Payout
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.lastPayout?.amount.toFixed(2) ?? '0.00'}
            </div>
            <p className="text-sm text-muted-foreground">
              {stats.lastPayout 
                ? format(new Date(stats.lastPayout.date), "PP")
                : 'No payouts yet'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8 w-full sm:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="booking">Bookings</SelectItem>
              <SelectItem value="payout">Payouts</SelectItem>
            </SelectContent>
          </Select>
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
          <DatePickerWithRange className="w-[300px]" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button 
            variant="outline"
            size="icon"
            className="h-10 w-10"
            onClick={() => {
              // Handle settings
            }}
          >
            <Settings2 className="h-4 w-4" />
          </Button>
          <Button 
            className="gap-2 bg-primary hover:bg-primary/90 text-white flex-1 sm:flex-initial"
            onClick={() => {
              // Handle export
            }}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Transactions List */}
      <Card className="bg-white">
        <ScrollArea className="h-[600px] rounded-md border">
          <div className="p-4 space-y-4">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center",
                    transaction.type === 'payout' 
                      ? "bg-orange-100" 
                      : "bg-primary/10"
                  )}>
                    {transaction.type === 'payout' 
                      ? <Wallet className="h-5 w-5 text-orange-600" />
                      : <DollarSign className="h-5 w-5 text-primary" />
                    }
                  </div>
                  <div>
                    <div className="font-medium">
                      {transaction.type === 'payout' 
                        ? 'Payout' 
                        : transaction.customer?.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {transaction.description}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={cn(
                      "text-sm font-medium",
                      transaction.type === 'payout' && "text-orange-600"
                    )}>
                      {transaction.type === 'payout' ? '-' : '+'}
                      ${transaction.amount.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(transaction.date), "PP")}
                    </div>
                  </div>
                  <div className={cn(
                    "px-2.5 py-0.5 rounded-full text-xs font-medium",
                    transaction.status === 'completed' && "bg-green-100 text-green-700",
                    transaction.status === 'pending' && "bg-yellow-100 text-yellow-700",
                    transaction.status === 'failed' && "bg-red-100 text-red-700"
                  )}>
                    {transaction.status}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {transaction.method}
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