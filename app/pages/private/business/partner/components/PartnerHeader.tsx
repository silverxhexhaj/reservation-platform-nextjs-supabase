'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { 
  Bell, 
  Search, 
  Settings,
  HelpCircle,
  Calendar,
  DollarSign
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

import { format } from 'date-fns';
import { cn } from "@/app/lib/utils";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { UserProfileMenu } from '@/app/components/menu/UserProfileMenu';
import { authService } from '@/app/service/auth.service';
import { Profile } from '@/app/models/supabase.models';
import { useEffect } from 'react';
import { User } from '@supabase/supabase-js';

interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'appointment' | 'payment' | 'system';
  status: 'unread' | 'read';
  timestamp: Date;
}

const mockNotifications: Notification[] = [];

export function PartnerHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await authService.getUser();
      setUser(userInfo.user);
      setProfile(userInfo.profile);
    };
    fetchUser();
  }, []);

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({
        ...notification,
        status: 'read'
      }))
    );
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="h-4 w-4 text-blue-600" />;
      case 'payment':
        return <DollarSign className="h-4 w-4 text-green-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white px-0 md:px-8 lg:px-10">
      <div className="flex h-16 items-center px-6">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 bg-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Home Button */}
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-slate-600 hover:text-slate-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </Button>
          </Link>

          {/* Help Button */}
          <Button variant="ghost" size="icon" className="text-slate-600 hover:text-slate-900">
            <HelpCircle className="h-5 w-5" />
          </Button>

          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-slate-600 hover:text-slate-900">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 bg-white" align="end">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-auto p-0 text-xs text-blue-600 hover:text-blue-800"
                    onClick={markAllAsRead}
                  >
                    Mark all as read
                  </Button>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ScrollArea className="h-[300px]">
                {notifications.length > 0 ? (
                  <DropdownMenuGroup>
                    {notifications.map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className={cn(
                          "flex items-start gap-3 p-3 cursor-pointer",
                          notification.status === 'unread' && "bg-slate-50"
                        )}
                      >
                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(notification.timestamp, 'PP p')}
                          </p>
                        </div>
                        {notification.status === 'unread' && (
                          <div className="h-2 w-2 rounded-full bg-blue-600" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                ) : (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No notifications
                  </div>
                )}
              </ScrollArea>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-sm font-medium text-blue-600">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Link href="/pages/private/business/partner/settings" passHref>
            <Button variant="ghost" size="icon" className="text-slate-600 hover:text-slate-900">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>

          {/* User Menu */}
          <UserProfileMenu user={user} profile={profile} />
        </div>
      </div>
    </header>
  );
}