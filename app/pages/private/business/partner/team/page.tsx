'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Plus, Search, Settings2, Star, Users2Icon, ActivityIcon, User, Trash2 } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { cn } from "@/app/lib/utils";
import { CreateTeamMemberDialog } from './components/CreateTeamMemberDialog';
import { ManageRolesDialog } from './components/ManageRolesDialog';
import type { TeamMember } from './types';
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Silver Xhexhaj',
    role: 'Stylist',
    email: 'silver@example.com',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    status: 'active',
    rating: 4.8,
    appointments: 128,
    joinedDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'John Doe',
    role: 'Barber',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop',
    status: 'active',
    rating: 4.9,
    appointments: 156,
    joinedDate: '2023-02-20'
  },
  {
    id: '3',
    name: 'Jane Smith',
    role: 'Colorist',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    status: 'inactive',
    rating: 4.7,
    appointments: 98,
    joinedDate: '2023-03-10'
  },
  {
    id: '4',
    name: 'Jane Smith',
    role: 'Colorist',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    status: 'inactive',
    rating: 4.7,
    appointments: 98,
    joinedDate: '2023-03-10'
  },
  {
    id: '5',
    name: 'Jane Smith',
    role: 'Colorist',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    status: 'inactive',
    rating: 4.7,
    appointments: 98,
    joinedDate: '2023-03-10'
  },
  {
    id: '6',
    name: 'Jane Smith',
    role: 'Colorist',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    status: 'inactive',
    rating: 4.7,
    appointments: 98,
    joinedDate: '2023-03-10'
  },
  {
    id: '7',
    name: 'Jane Smith',
    role: 'Colorist',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    status: 'inactive',
    rating: 4.7,
    appointments: 98,
    joinedDate: '2023-03-10'
  },
  {
    id: '8',
    name: 'Jane Smith',
    role: 'Colorist',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    status: 'inactive',
    rating: 4.7,
    appointments: 98,
    joinedDate: '2023-03-10'
  },
  {
    id: '9',
    name: 'Jane Smith',
    role: 'Colorist',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    status: 'inactive',
    rating: 4.7,
    appointments: 98,
    joinedDate: '2023-03-10'
  },
  {
    id: '10',
    name: 'Jane Smith',
    role: 'Colorist',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    status: 'inactive',
    rating: 4.7,
    appointments: 98,
    joinedDate: '2023-03-10'
  }
];

export default function Team() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isManageRolesOpen, setIsManageRolesOpen] = useState(false);
  const [members, setMembers] = useState<TeamMember[]>(teamMembers);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role.toLowerCase() === roleFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: members.length,
    active: members.filter(m => m.status === 'active').length,
    avgRating: (members.reduce((acc, m) => acc + m.rating, 0) / members.length).toFixed(1)
  };

  const handleStatusToggle = (memberId: string) => {
    setMembers(prev => prev.map(member => 
      member.id === memberId 
        ? { ...member, status: member.status === 'active' ? 'inactive' : 'active' }
        : member
    ));
  };

  const handleEditMember = (member: TeamMember) => {
    setSelectedMember(member);
    setIsCreateDialogOpen(true);
  };

  const handleDeleteMember = (memberId: string) => {
    setMembers(prev => prev.filter(member => member.id !== memberId));
  };

  const handleMemberUpdate = (updatedMember: TeamMember) => {
    setMembers(prev => prev.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    ));
    setSelectedMember(null);
  };

  const handleDeleteClick = (member: TeamMember) => {
    setMemberToDelete(member);
  };

  const handleDeleteConfirm = () => {
    if (memberToDelete) {
      handleDeleteMember(memberToDelete.id);
      setMemberToDelete(null);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your team members, roles, and permissions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"
            onClick={() => setIsManageRolesOpen(true)}
          >
            Manage Roles
          </Button>
          <Button 
            className="bg-blue-700 hover:bg-blue-800 text-white"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Team Members
            </CardTitle>
            <Users2Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Now
            </CardTitle>
            <ActivityIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader> 
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.active / stats.total) * 100).toFixed(0)}% of total
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Rating
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgRating}</div>
            <p className="text-xs text-muted-foreground">
              Based on client feedback
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table Card */}
      <Card className="bg-white">
        <CardContent className="p-0">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between  p-6">
            <div className="flex flex-1 gap-4 w-full">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search team members..."
                  className="pl-8 w-full sm:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="stylist">Stylist</SelectItem>
                  <SelectItem value="barber">Barber</SelectItem>
                  <SelectItem value="colorist">Colorist</SelectItem>
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

          {/* Team Members Table */}
          <div className="">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow className="hover:bg-slate-50/50">
                  <TableHead className="pl-6 font-medium">Team Member</TableHead>
                  <TableHead className="font-medium">Role</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">Rating</TableHead>
                  <TableHead className="font-medium">Appointments</TableHead>
                  <TableHead className="font-medium">Joined Date</TableHead>
                  <TableHead className="pr-6 text-right font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow 
                    key={member.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>
                      <div className={cn(
                        "inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium",
                        member.status === 'active' 
                          ? "bg-green-100 text-green-700" 
                          : "bg-gray-100 text-gray-700"
                      )}>
                        {member.status}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-medium">{member.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{member.appointments}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(member.joinedDate), "PP")}
                      </div>
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
                            onClick={() => window.location.href = `/team/${member.id}`}
                            className="hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                          >
                            <User className="h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleEditMember(member)}
                            className="hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                          >
                            <Settings2 className="h-4 w-4" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-slate-100" />
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(member)}
                            className="text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer flex items-center gap-2"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete Member
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

      <CreateTeamMemberDialog
        open={isCreateDialogOpen}
        onOpenChange={(open) => {
          setIsCreateDialogOpen(open);
          if (!open) setSelectedMember(null);
        }}
        onTeamMemberCreate={(memberData) => {
          if (selectedMember) {
            handleMemberUpdate({ ...memberData, id: selectedMember.id });
          } else {
            setMembers(prev => [...prev, memberData]);
          }
        }}
        defaultValues={selectedMember}
      />

      <ManageRolesDialog
        open={isManageRolesOpen}
        onOpenChange={setIsManageRolesOpen}
      />

      <AlertDialog 
        open={!!memberToDelete} 
        onOpenChange={(open: boolean) => {
          if (!open) {
            setMemberToDelete(null);
            // Ensure the body is unlocked after dialog closes
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
              <span className="font-medium text-slate-900">{memberToDelete?.name}&apos;s</span> account
              and remove their data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setMemberToDelete(null);
                // Ensure the body is unlocked after canceling
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
                // Ensure the body is unlocked after confirming
                document.body.style.pointerEvents = 'auto';
                document.body.style.overflow = 'auto';
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Member
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}