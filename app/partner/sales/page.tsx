'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  Users, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'payment' | 'refund';
  status: 'completed' | 'pending' | 'failed';
  customer: string;
  service: string;
  paymentMethod: string;
}

const transactions: Transaction[] = [
  {
    id: '1',
    date: '2024-02-20T10:30:00',
    amount: 150,
    type: 'payment',
    status: 'completed',
    customer: 'Emma Wilson',
    service: 'Haircut & Styling',
    paymentMethod: 'Credit Card'
  },
  {
    id: '2',
    date: '2024-02-20T11:45:00',
    amount: 80,
    type: 'payment',
    status: 'completed',
    customer: 'Michael Chen',
    service: 'Beard Trim',
    paymentMethod: 'Cash'
  },
  {
    id: '3',
    date: '2024-02-20T14:15:00',
    amount: 45,
    type: 'refund',
    status: 'completed',
    customer: 'Sophie Taylor',
    service: 'Color Treatment',
    paymentMethod: 'Credit Card'
  },
];

export default function Sales() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [transactionsList, setTransactionsList] = useState<Transaction[]>(transactions);

  const filteredTransactions = transactionsList.filter(transaction => {
    const matchesSearch = 
      transaction.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    totalRevenue: transactionsList
      .filter(t => t.type === 'payment' && t.status === 'completed')
      .reduce((acc, t) => acc + t.amount, 0),
    totalRefunds: transactionsList
      .filter(t => t.type === 'refund' && t.status === 'completed')
      .reduce((acc, t) => acc + t.amount, 0),
    successRate: Math.round(
      (transactionsList.filter(t => t.status === 'completed').length / transactionsList.length) * 100
    ),
    averageOrder: transactionsList.length > 0
      ? Math.round(
          transactionsList
            .filter(t => t.type === 'payment' && t.status === 'completed')
            .reduce((acc, t) => acc + t.amount, 0) / 
          transactionsList.filter(t => t.type === 'payment' && t.status === 'completed').length
        )
      : 0
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track your revenue, transactions, and payment history
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Export
          </Button>
          <Button className="bg-blue-700 hover:bg-blue-800 text-white">
            New Transaction
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue}</div>
            <div className="text-xs text-muted-foreground">+20.1% from last month</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Order</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.averageOrder}</div>
            <div className="text-xs text-muted-foreground">+5.2% from last month</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Refunds</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRefunds}</div>
            <div className="text-xs text-muted-foreground">-2.5% from last month</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.successRate}%</div>
            <div className="text-xs text-muted-foreground">+1.2% from last month</div>
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
              <SelectItem value="payment">Payment</SelectItem>
              <SelectItem value="refund">Refund</SelectItem>
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
        </div>
        <Button 
          variant="outline"
          size="sm"
          className="w-full sm:w-auto"
        >
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
        </Button>
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
                    "p-2 rounded-full",
                    transaction.type === 'payment' ? "bg-green-100" : "bg-red-100"
                  )}>
                    {transaction.type === 'payment' ? (
                      <ArrowUpRight className={cn(
                        "h-4 w-4",
                        transaction.type === 'payment' ? "text-green-600" : "text-red-600"
                      )} />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{transaction.customer}</div>
                    <div className="text-sm text-muted-foreground">{transaction.service}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={cn(
                      "text-sm font-medium",
                      transaction.type === 'payment' ? "text-green-600" : "text-red-600"
                    )}>
                      {transaction.type === 'payment' ? '+' : '-'}${transaction.amount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(transaction.date), "PP p")}
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
                    {transaction.paymentMethod}
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