'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Search, Settings2, Star, Users2Icon, ActivityIcon, History } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CreateClientDialog } from './components/CreateClientDialog';
import type { Client } from './types';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: 'active' | 'inactive';
  totalAppointments: number;
  lastVisit: string;
  totalSpent: number;
  preferredService: string;
}

const clients: Client[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    phone: '+1 234 567 8901',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    status: 'active',
    totalAppointments: 15,
    lastVisit: '2024-02-15',
    totalSpent: 750,
    preferredService: 'Haircut & Styling'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    phone: '+1 234 567 8902',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    status: 'active',
    totalAppointments: 8,
    lastVisit: '2024-02-10',
    totalSpent: 420,
    preferredService: 'Beard Trim'
  },
  {
    id: '3',
    name: 'Sophie Taylor',
    email: 'sophie@example.com',
    phone: '+1 234 567 8903',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    status: 'inactive',
    totalAppointments: 3,
    lastVisit: '2024-01-20',
    totalSpent: 180,
    preferredService: 'Color Treatment'
  },
];

export default function Clients() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [clientsList, setClientsList] = useState<Client[]>(clients);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredClients = clientsList.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    const matchesService = serviceFilter === 'all' || client.preferredService === serviceFilter;
    
    return matchesSearch && matchesStatus && matchesService;
  });

  const stats = {
    total: clientsList.length,
    active: clientsList.filter(c => c.status === 'active').length,
    returningRate: Math.round((clientsList.filter(c => c.totalAppointments > 1).length / clientsList.length) * 100)
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your client database and view client history
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Import
          </Button>
          <Button 
            className="bg-blue-700 hover:bg-blue-800 text-white"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Clients</CardTitle>
            <Users2Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Clients</CardTitle>
            <ActivityIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Returning Rate</CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.returningRate}%</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              className="pl-8 w-full sm:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="Haircut & Styling">Haircut & Styling</SelectItem>
              <SelectItem value="Beard Trim">Beard Trim</SelectItem>
              <SelectItem value="Color Treatment">Color Treatment</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button 
          className="gap-2 bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add Client
        </Button>
      </div>

      {/* Clients List */}
      <Card className="bg-white">
        <ScrollArea className="h-[600px] rounded-md border">
          <div className="p-4 space-y-4">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={client.avatar} alt={client.name} />
                    <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-muted-foreground">{client.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{client.totalAppointments} visits</div>
                    <div className="text-sm text-muted-foreground">
                      Last visit: {format(new Date(client.lastVisit), "PP")}
                    </div>
                  </div>
                  <div className={cn(
                    "px-2.5 py-0.5 rounded-full text-xs font-medium",
                    client.status === 'active' 
                      ? "bg-green-100 text-green-700" 
                      : "bg-gray-100 text-gray-700"
                  )}>
                    {client.status}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">${client.totalSpent}</div>
                    <div className="text-xs text-muted-foreground">Total spent</div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <CreateClientDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onClientCreate={(newClient) => {
          setClientsList(prev => [...prev, newClient]);
        }}
      />
    </div>
  );
}