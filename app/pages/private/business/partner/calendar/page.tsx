'use client';

import { useState, useEffect } from 'react';
import { format, addHours, startOfDay, eachHourOfInterval, isSameDay, addMinutes, subMonths, addMonths, addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth } from 'date-fns';
import { Plus, Calendar as CalendarIcon, Settings, Users, Search, PencilIcon, TrashIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { CalendarHeader } from "./components/CalendarHeader";
import { cn } from "@/lib/utils";
import type { CalendarEvent, TimeSlot, BusinessHours, Staff } from '@/types/calendar';
import { 
  generateTimeSlots, 
  getDefaultBusinessHours 
} from '@/lib/calendar-utils';
import { CreateEventDialog } from './components/CreateEventDialog';
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Separator } from "@/app/components/ui/separator";
import { useRouter } from 'next/navigation';

function isWithinBusinessHours(time: Date, businessHours: BusinessHours): boolean {
  const dayOfWeek = format(time, 'EEEE').toLowerCase();
  const currentHour = format(time, 'HH:mm');
  
  const daySchedule = businessHours[dayOfWeek];
  if (!daySchedule || !daySchedule.isOpen) return false;
  
  return currentHour >= daySchedule.start && currentHour < daySchedule.end;
}

function generateDayTimeSlots(startDate: Date, endDate: Date, interval: number = 15): Date[] {
  const slots: Date[] = [];
  let current = new Date(startDate);

  while (current < endDate) {
    slots.push(new Date(current));
    current = addMinutes(current, interval);
  }

  return slots;
}

// Move staffMembers before the state declarations
const staffMembers: Staff[] = [
  { 
    id: '1', 
    name: 'Silver Xhexhaj', 
    role: 'Stylist', 
    color: 'blue', 
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' 
  },
  { 
    id: '2', 
    name: 'John Doe', 
    role: 'Barber', 
    color: 'green', 
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop' 
  },
  { 
    id: '3', 
    name: 'Jane Smith', 
    role: 'Colorist', 
    color: 'purple', 
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' 
  },
];

export default function CalendarPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date | undefined>(undefined);
  const [selectedStaffId, setSelectedStaffId] = useState<string | undefined>(undefined);
  const [businessHours] = useState<BusinessHours>(getDefaultBusinessHours());
  const [hoveredTime, setHoveredTime] = useState<string | null>(null);
  const [hoveredSlot, setHoveredSlot] = useState<{ time: Date; staffId: string } | null>(null);
  const [selectedStaffIds, setSelectedStaffIds] = useState<Set<string>>(
    new Set(staffMembers.map(staff => staff.id))
  );
  const [isSelectingTimeSlot, setIsSelectingTimeSlot] = useState(false);

  const timeSlots = generateDayTimeSlots(
    startOfDay(selectedDate),
    addHours(startOfDay(selectedDate), 24)
  );

  useEffect(() => {
    // Get the appointments from localStorage when the calendar page loads
    const storedAppointments = localStorage.getItem('upcomingAppointments');
    if (storedAppointments) {
      const appointments = JSON.parse(storedAppointments);
      // Add these appointments to your events state
      setEvents(prev => [
        ...prev,
        ...appointments.map((apt: any) => ({
          id: apt.id,
          title: apt.service,
          start: new Date(apt.time),
          end: new Date(new Date(apt.time).getTime() + apt.duration * 60000),
          clientName: apt.clientName,
          status: 'confirmed',
          staffId: '1' // You might want to assign these to specific staff members
        }))
      ]);
      // Clear the localStorage after using the data
      localStorage.removeItem('upcomingAppointments');
    }
  }, []);

  const handleOpenNewEvent = (time?: Date, staffId?: string) => {
    if (time && staffId) {
      // Direct time slot click
      setSelectedTime(time);
      setSelectedStaffId(staffId);
      setIsNewEventDialogOpen(true);
    } else {
      // New Appointment button click
      setIsSelectingTimeSlot(true);
      
      // Scroll to current time
      const now = new Date();
      const currentHour = now.getHours();
      const scrollTime = currentHour >= 9 && currentHour < 17 
        ? now 
        : new Date(now.setHours(9, 0, 0, 0));
      
      const timeElement = document.getElementById(`time-${format(scrollTime, 'HH:mm')}`);
      if (timeElement) {
        timeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleCloseNewEvent = () => {
    setIsNewEventDialogOpen(false);
    setSelectedTime(undefined);
    setSelectedStaffId(undefined);
  };

  const handleTimeSlotSelect = (time: Date, staffId: string) => {
    if (isSelectingTimeSlot) {
      setIsSelectingTimeSlot(false);
      setSelectedTime(time);
      setSelectedStaffId(staffId);
      setIsNewEventDialogOpen(true);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold">
                {format(selectedDate, 'MMMM yyyy')}
              </h1>
              <p className="text-sm text-slate-500">
                {format(selectedDate, 'EEEE, MMMM d')}
              </p>
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const newDate = addDays(selectedDate, -1);
                  setSelectedDate(newDate);
                }}
                aria-label="Previous day"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const today = new Date();
                  setSelectedDate(today);
                  // Only scroll on "Today" button click
                  const currentTime = format(today, 'HH:mm');
                  const timeElement = document.getElementById(`time-${currentTime}`);
                  if (timeElement) {
                    timeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
              >
                Today
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const newDate = addDays(selectedDate, 1);
                  setSelectedDate(newDate);
                }}
                aria-label="Next day"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-1 justify-center">
            <div className="flex flex-wrap items-center gap-1.5">
              {staffMembers.map((staff) => (
                <Button
                  key={staff.id}
                  variant={selectedStaffIds.has(staff.id) ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setSelectedStaffIds(prev => {
                      const newSelection = new Set(prev);
                      if (newSelection.has(staff.id) && newSelection.size > 1) {
                        newSelection.delete(staff.id);
                      } else if (!newSelection.has(staff.id)) {
                        newSelection.add(staff.id);
                      }
                      return newSelection;
                    });
                  }}
                  className={cn(
                    "text-xs font-medium rounded-full transition-colors",
                    "flex items-center gap-1.5 min-w-[90px]",
                    selectedStaffIds.has(staff.id) 
                      ? "bg-slate-100 hover:bg-slate-200" 
                      : "hover:bg-slate-50"
                  )}
                >
                  <Avatar className="h-5 w-5 border border-slate-200">
                    <AvatarImage src={staff.avatar} alt={staff.name} />
                    <AvatarFallback className="text-[10px] bg-slate-100">
                      {staff.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate">{staff.name}</span>
                </Button>
              ))}
            </div>
          </div>
          <div className="flex-1 flex justify-end">
            <Button
              onClick={() => handleOpenNewEvent()}
              size="sm"
              className="gap-2 bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="h-4 w-4" />
              New Appointment
            </Button>
          </div>
        </div>
      </div>
        
      {/* Staff Headers */}
      <div className="border-b sticky top-0 z-10">
        <div className="pl-16 grid" style={{ 
          gridTemplateColumns: `repeat(${Array.from(selectedStaffIds).length}, minmax(200px, 1fr))` 
        }}>
          {staffMembers
            .filter(staff => selectedStaffIds.has(staff.id))
            .map((staff) => (
              <div 
                key={staff.id}
                className="px-4 py-2 border-r last:border-r-0 flex items-center gap-2"
              >
                <Avatar className={cn(
                  "h-8 w-8 ring-2 ring-offset-2",
                  staff.color === 'blue' && "ring-blue-500",
                  staff.color === 'green' && "ring-green-500",
                  staff.color === 'purple' && "ring-purple-500"
                )}>
                  <AvatarImage src={staff.avatar} alt={staff.name} />
                  <AvatarFallback className={cn(
                    "font-semibold text-white",
                    staff.color === 'blue' && "bg-blue-500",
                    staff.color === 'green' && "bg-green-500",
                    staff.color === 'purple' && "bg-purple-500"
                  )}>
                    {staff.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">{staff.name}</div>
                  <div className="text-xs text-muted-foreground">{staff.role}</div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Time Grid */}
      <ScrollArea className="flex-1">
        <div className="relative min-h-full">
          {/* Time Labels */}
          <div className="absolute left-0 top-0 w-16 border-r z-20">
            {timeSlots.map((time, index) => {
              const isHourStart = time.getMinutes() === 0;
              const isAvailable = isWithinBusinessHours(time, businessHours);
              if (!isHourStart) return null;

              return (
                <div 
                  key={time.toString()} 
                  className={cn(
                    "relative",
                    isAvailable ? "h-64" : "h-16"
                  )}
                >
                  <span className="absolute -top-2.5 right-3 text-xs text-muted-foreground">
                    {format(time, 'HH:mm')}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Events Grid with Staff Columns */}
          <div className="ml-16">
            <div className="grid" style={{ 
              gridTemplateColumns: `repeat(${Array.from(selectedStaffIds).length}, minmax(200px, 1fr))` 
            }}>
              {staffMembers
                .filter(staff => selectedStaffIds.has(staff.id))
                .map((currentStaff) => (
                  <div key={currentStaff.id} className="border-r last:border-r-0 relative">
                    {/* Hour blocks */}
                    {Array.from({ length: 24 }).map((_, hour) => (
                      <div 
                        key={hour}
                        className="h-16 border-t border-gray-200 first:border-t-0"
                      />
                    ))}

                    {/* 15-minute slots overlay */}
                    <div className="absolute inset-0">
                      {timeSlots.map((time) => {
                        const isAvailable = isWithinBusinessHours(time, businessHours);
                        const minutes = time.getMinutes();
                        const isHovered = hoveredSlot?.time.getTime() === time.getTime() && 
                                         hoveredSlot.staffId === currentStaff.id;
                        
                        return (
                          <div 
                            key={time.toString()}
                            id={`time-${format(time, 'HH:mm')}`}
                            className={cn(
                              "h-4 relative group transition-all duration-150",
                              isAvailable 
                                ? "h-16 hover:!bg-slate-500/20 cursor-pointer" 
                                : "!bg-slate-100",
                              isAvailable && "bg-blue-50/30",
                              minutes === 0 && "border-t border-gray-200",
                              minutes === 30 && "border-t border-dashed border-gray-200/70",
                              (minutes === 15 || minutes === 45) && "border-t border-dotted border-gray-200/30",
                              isHovered && "!bg-blue-500/20",
                              isSelectingTimeSlot && isAvailable && "hover:!bg-green-500/20"
                            )}
                            onClick={() => {
                              if (isAvailable) {
                                if (isSelectingTimeSlot) {
                                  handleTimeSlotSelect(time, currentStaff.id);
                                } else {
                                  handleOpenNewEvent(time, currentStaff.id);
                                }
                              }
                            }}
                            onMouseEnter={() => {
                              if (isAvailable) {
                                setHoveredSlot({ time, staffId: currentStaff.id });
                              }
                            }}
                            onMouseLeave={() => setHoveredSlot(null)}
                            title={isAvailable ? format(time, 'HH:mm') : "Outside business hours"}
                          >
                            {isAvailable && isHovered && (
                              <div className={cn(
                                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                                "bg-white dark:bg-gray-800 shadow-lg rounded-md px-2 py-1 z-50",
                                "text-xs font-medium whitespace-nowrap"
                              )}>
                                {format(time, 'HH:mm')}
                              </div>
                            )}
                            {isAvailable && (
                              <div className={cn(
                                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity",
                                "flex items-center justify-center",
                                "bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5"
                              )}>
                                <div className="w-4 h-4 rounded-full bg-primary/20 group-hover:scale-110 transition-transform" />
                              </div>
                            )}
                            {!isAvailable && (
                              <div className="absolute inset-0 bg-stripe-pattern opacity-5" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Events for this staff member */}
                    {events
                      .filter(event => event.staffId === currentStaff.id)
                      .map((event) => (
                        <div
                          key={event.id}
                          className={cn(
                            "absolute left-0 right-0 z-20 group",
                            "hover:z-30",  // Increased z-index on hover and better shadow
                            "transition-all duration-200 ease-in-out cursor-pointer",
                            "border border-primary/20",
                            "bg-white dark:bg-gray-900",
                            "hover:border-primary" // Border color change on hover
                          )}
                          style={{
                            top: `${(event.start.getHours() * 60 + event.start.getMinutes()) / 1440 * 100}%`,
                            height: `${(event.end.getTime() - event.start.getTime()) / (1000 * 60 * 24 * 60) * 100}%`,
                            minHeight: '2.5rem'
                          }}
                        >
                          
                          <div className="relative p-2 h-full flex flex-col">
                            <div className="min-w-0 flex-1 flex justify-between">
                              <div className={cn(
                                "font-medium text-xs text-gray-900 dark:text-gray-100 truncate",
                                "group-hover:text-primary" // Text color change on hover
                              )}>
                                {event.title}
                              </div>
                              {event.clientName && (
                                <div className="text-xs text-gray-500 dark:text-gray-400 truncate group-hover:text-gray-700 dark:group-hover:text-gray-300">
                                  {event.clientName}
                                </div>
                              )}
                            </div>
                            
                            <div className="mt-auto flex items-center justify-between text-[10px] text-gray-500 dark:text-gray-400">
                              <div className="group-hover:text-gray-700 dark:group-hover:text-gray-300">
                                {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
                              </div>
                              <div className={cn(
                                "px-1.5 py-0.5 rounded-full transition-colors",
                                event.status === 'confirmed' && "bg-green-100 text-green-700 group-hover:bg-green-200",
                                event.status === 'pending' && "bg-yellow-100 text-yellow-700 group-hover:bg-yellow-200",
                                event.status === 'cancelled' && "bg-red-100 text-red-700 group-hover:bg-red-200"
                              )}>
                                {event.status}
                              </div>
                            </div>

                            {/* Quick Actions on Hover */}
                            <div className={cn(
                              "absolute -right-1 top-1/2 -translate-y-1/2 transform",
                              "opacity-0 group-hover:opacity-100 transition-opacity",
                              "flex flex-col gap-1 -translate-x-2 group-hover:translate-x-0",
                              "transition-all duration-200"
                            )}>
                              <Button
                                size="icon"
                                variant="secondary"
                                className="h-6 w-6 rounded-full shadow-md"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Handle edit
                                }}
                              >
                                <PencilIcon className="h-3 w-3" />
                              </Button>
                              <Button
                                size="icon"
                                variant="secondary"
                                className="h-6 w-6 rounded-full shadow-md"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Handle delete
                                }}
                              >
                                <TrashIcon className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      <CreateEventDialog
        open={isNewEventDialogOpen}
        onOpenChange={handleCloseNewEvent}
        onEventCreate={(event: CalendarEvent) => {
          setEvents([...events, event]);
          handleCloseNewEvent();
        }}
        existingEvents={events}
        businessHours={businessHours}
        staffMembers={staffMembers}
        initialTime={selectedTime}
        initialStaffId={selectedStaffId}
      />

      {isSelectingTimeSlot && (
        <div className="sticky top-[73px] z-20 bg-primary text-primary-foreground py-2 px-4 text-sm font-medium text-center shadow-md">
          Click on a time slot to create a new appointment
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSelectingTimeSlot(false)}
            className="ml-2 h-6 hover:bg-primary-foreground/10"
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}

// Add this to your global CSS file (app/globals.css)
const styles = `
  .bg-stripe-pattern {
    background-image: linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.1) 25%,
      transparent 25%,
      transparent 50%,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0.1) 75%,
      transparent 75%,
      transparent
    );
    background-size: 8px 8px;
  }
`;