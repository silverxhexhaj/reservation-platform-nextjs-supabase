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
  Settings2,
  Calendar,
  Wallet,
  Plus,
  User
} from "lucide-react";
import { format } from "date-fns";
import { DatePickerWithRange } from "@/app/components/ui/date-range-picker";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu";
import { NewTransactionDialog } from './components/NewTransactionDialog';

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
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);

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

  const handleNewTransaction = (transaction: Transaction) => {
    setTransactions(prev => [transaction, ...prev]);
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
            onClick={() => setIsNewTransactionOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Transaction
          </Button>
        </div>
      </div>

      <NewTransactionDialog
        open={isNewTransactionOpen}
        onOpenChange={setIsNewTransactionOpen}
        onTransactionCreate={handleNewTransaction}
      />

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

      {/* Filters and Table Card */}
      <Card className="bg-white">
        <CardContent className="p-0">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6">
            <div className="flex flex-1 gap-4 w-full">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
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
          </div>

          {/* Transactions Table */}
          <div className="">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow className="hover:bg-slate-50/50">
                  <TableHead className="pl-6 font-medium">Transaction</TableHead>
                  <TableHead className="font-medium">Type</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">Amount</TableHead>
                  <TableHead className="font-medium">Date</TableHead>
                  <TableHead className="font-medium">Method</TableHead>
                  <TableHead className="pr-6 text-right font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow 
                    key={transaction.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <TableCell className="pl-6">
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
                    </TableCell>
                    <TableCell>
                      <div className="font-medium capitalize">{transaction.type}</div>
                    </TableCell>
                    <TableCell>
                      <div className={cn(
                        "inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium",
                        transaction.status === 'completed' && "bg-green-100 text-green-700",
                        transaction.status === 'pending' && "bg-yellow-100 text-yellow-700",
                        transaction.status === 'failed' && "bg-red-100 text-red-700"
                      )}>
                        {transaction.status}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={cn(
                        "font-medium",
                        transaction.type === 'payout' && "text-orange-600"
                      )}>
                        {transaction.type === 'payout' ? '-' : '+'}
                        ${transaction.amount.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(transaction.date), "PP")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{transaction.method}</div>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100">
                            <Settings2 className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white w-[180px]">
                          <DropdownMenuItem 
                            onClick={() => window.location.href = `/transactions/${transaction.id}`}
                            className="hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                          >
                            <Search className="h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {transaction.type === 'booking' && transaction.customer && (
                            <DropdownMenuItem 
                              onClick={() => window.location.href = `/clients/${transaction.customer?.email}`}
                              className="hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                            >
                              <User className="h-4 w-4" />
                              View Customer
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator className="bg-slate-100" />
                          <DropdownMenuItem
                            onClick={() => window.location.href = `/transactions/${transaction.id}/receipt`}
                            className="hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                            Download Receipt
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}