'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Plus, Search, Settings2, Star, Users2Icon, ActivityIcon, History, User, Trash2 } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { cn } from "@/app/lib/utils";
import { format } from "date-fns";
import { CreateClientDialog } from './components/CreateClientDialog';
import type { Client } from './types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/app/components/ui/alert-dialog";

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
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

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

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsCreateDialogOpen(true);
  };

  const handleDeleteClick = (client: Client) => {
    setClientToDelete(client);
  };

  const handleDeleteConfirm = () => {
    if (clientToDelete) {
      setClientsList(prev => prev.filter(client => client.id !== clientToDelete.id));
      setClientToDelete(null);
    }
  };

  const handleClientUpdate = (updatedClient: Client) => {
    setClientsList(prev => prev.map(client => 
      client.id === updatedClient.id ? updatedClient : client
    ));
    setSelectedClient(null);
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

      {/* Filters and Table Card */}
      <Card className="bg-white">
        <CardContent className="p-0">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6">
            <div className="flex flex-1 gap-4 w-full">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
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
          </div>

          {/* Clients Table */}
          <div className="">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow className="hover:bg-slate-50/50">
                  <TableHead className="pl-6 font-medium">Client</TableHead>
                  <TableHead className="font-medium">Phone</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">Total Visits</TableHead>
                  <TableHead className="font-medium">Last Visit</TableHead>
                  <TableHead className="font-medium">Total Spent</TableHead>
                  <TableHead className="pr-6 text-right font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow 
                    key={client.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <TableCell className="pl-6">
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
                    </TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>
                      <div className={cn(
                        "inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium",
                        client.status === 'active' 
                          ? "bg-green-100 text-green-700" 
                          : "bg-gray-100 text-gray-700"
                      )}>
                        {client.status}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{client.totalAppointments}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(client.lastVisit), "PP")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">${client.totalSpent}</div>
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
                            onClick={() => window.location.href = `/clients/${client.id}`}
                            className="hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                          >
                            <User className="h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleEditClient(client)}
                            className="hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                          >
                            <Settings2 className="h-4 w-4" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-slate-100" />
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(client)}
                            className="text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer flex items-center gap-2"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete Client
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

      <CreateClientDialog
        open={isCreateDialogOpen}
        onOpenChange={(open) => {
          setIsCreateDialogOpen(open);
          if (!open) setSelectedClient(null);
        }}
        onClientCreate={(clientData) => {
          if (selectedClient) {
            handleClientUpdate({ ...clientData, id: selectedClient.id });
          } else {
            setClientsList(prev => [...prev, clientData]);
          }
        }}
        defaultValues={selectedClient}
      />

      <AlertDialog 
        open={!!clientToDelete} 
        onOpenChange={(open: boolean) => {
          if (!open) {
            setClientToDelete(null);
            document.body.style.pointerEvents = 'auto';
            document.body.style.overflow = 'auto';
          }
        }}
      >
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{' '}
              <span className="font-medium text-slate-900">{clientToDelete?.name}&apos;s</span> account
              and remove their data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setClientToDelete(null);
                document.body.style.pointerEvents = 'auto';
                document.body.style.overflow = 'auto';
              }}
              className="border-slate-200"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDeleteConfirm();
                document.body.style.pointerEvents = 'auto';
                document.body.style.overflow = 'auto';
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Client
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}