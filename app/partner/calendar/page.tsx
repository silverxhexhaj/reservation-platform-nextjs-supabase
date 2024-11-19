'use client';

import { useState } from 'react';
import { format, addHours, startOfDay, eachHourOfInterval, isSameDay, addMinutes, subMonths, addMonths } from 'date-fns';
import { Plus, Calendar as CalendarIcon, Settings, Users, Search, PencilIcon, TrashIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarHeader } from "./components/CalendarHeader";
import { cn } from "@/lib/utils";
import type { CalendarEvent, TimeSlot, BusinessHours, Staff } from '@/types/calendar';
import { 
  generateTimeSlots, 
  getDefaultBusinessHours 
} from '@/lib/calendar-utils';
import { CreateEventDialog } from './components/CreateEventDialog';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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

  const timeSlots = generateDayTimeSlots(
    startOfDay(selectedDate),
    addHours(startOfDay(selectedDate), 24)
  );

  const handleOpenNewEvent = (time: Date, staffId: string) => {
    setSelectedTime(time);
    setSelectedStaffId(staffId);
    setIsNewEventDialogOpen(true);
  };

  const handleCloseNewEvent = () => {
    setIsNewEventDialogOpen(false);
    setSelectedTime(undefined);
    setSelectedStaffId(undefined);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">
              {format(selectedDate, 'MMMM yyyy')}
            </h1>
            
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSelectedDate(subMonths(selectedDate, 1))}
                aria-label="Previous month"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedDate(new Date())}
              >
                Today
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setSelectedDate(addMonths(selectedDate, 1))}
                aria-label="Next month"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Add Staff Filter Dropdown */}
            <div className="flex items-center gap-2 border rounded-md p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedStaffIds(new Set(staffMembers.map(staff => staff.id)))}
                className={cn(
                  "text-xs",
                  selectedStaffIds.size === staffMembers.length && "bg-secondary"
                )}
              >
                All
              </Button>
              {staffMembers.map((staff) => (
                <Button
                  key={staff.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newSelection = new Set(selectedStaffIds);
                    if (newSelection.has(staff.id)) {
                      newSelection.delete(staff.id);
                    } else {
                      newSelection.add(staff.id);
                    }
                    setSelectedStaffIds(newSelection);
                  }}
                  className={cn(
                    "text-xs flex items-center gap-1",
                    selectedStaffIds.has(staff.id) && "bg-secondary"
                  )}
                >
                  <Avatar className="h-4 w-4">
                    <AvatarImage src={staff.avatar} alt={staff.name} />
                    <AvatarFallback>{staff.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {staff.name}
                </Button>
              ))}
            </div>

            <Button 
              onClick={() => setIsNewEventDialogOpen(true)}
              size="sm"
              className="gap-2"
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
                            className={cn(
                              "h-4 relative group transition-all duration-150",
                              isAvailable 
                                ? "h-16 hover:!bg-slate-500/20 cursor-pointer" 
                                : "!bg-slate-100",
                              isAvailable && "bg-blue-50/30",
                              minutes === 0 && "border-t border-gray-200",
                              minutes === 30 && "border-t border-dashed border-gray-200/70",
                              (minutes === 15 || minutes === 45) && "border-t border-dotted border-gray-200/30",
                              isHovered && "!bg-blue-500/20"
                            )}
                            onClick={() => {
                              if (isAvailable) {
                                handleOpenNewEvent(time, currentStaff.id);
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