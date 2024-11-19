'use client';

import { useState, useEffect } from 'react';
import { format, addMinutes, setHours, setMinutes, parse } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { CalendarEvent, BusinessHours, Staff } from '@/types/calendar';
import { checkEventOverlap, getEventColor, isWithinBusinessHours } from '@/lib/calendar-utils';
import { cn } from '@/lib/utils';
import { X, Plus } from 'lucide-react';

interface CreateEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEventCreate: (event: CalendarEvent) => void;
  existingEvents: CalendarEvent[];
  businessHours: BusinessHours;
  staffMembers: Staff[];
  initialTime?: Date;
  initialStaffId?: string;
}

function generateTimeOptions(businessHours: BusinessHours, date: Date): string[] {
  const dayOfWeek = format(date, 'EEEE').toLowerCase();
  const hours = businessHours[dayOfWeek];
  
  if (!hours || !hours.isOpen) return [];
  
  const times: string[] = [];
  const startTime = parse(hours.start, 'HH:mm', date);
  const endTime = parse(hours.end, 'HH:mm', date);
  let currentTime = startTime;
  
  while (currentTime < endTime) {
    times.push(format(currentTime, 'HH:mm'));
    currentTime = addMinutes(currentTime, 15);
  }
  
  return times;
}

export function CreateEventDialog({
  open,
  onOpenChange,
  onEventCreate,
  existingEvents,
  businessHours,
  staffMembers,
  initialTime,
  initialStaffId
}: CreateEventDialogProps) {
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    type: 'appointment',
    start: initialTime || new Date(),
    end: initialTime ? new Date(initialTime.getTime() + 15 * 60000) : new Date(),
    status: 'pending',
    staffId: initialStaffId
  });
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState('15');

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open && initialTime) {
      setNewEvent({
        type: 'appointment',
        start: initialTime,
        end: addMinutes(initialTime, parseInt(duration)),
        status: 'pending',
        staffId: initialStaffId
      });
      setError(null);
    }
  }, [open, initialTime, duration, initialStaffId]);

  const timeOptions = initialTime ? generateTimeOptions(businessHours, initialTime) : [];

  function handleTimeChange(time: string) {
    if (!initialTime) return;
    
    const [hours, minutes] = time.split(':').map(Number);
    const newStart = setMinutes(setHours(initialTime, hours), minutes);
    const newEnd = addMinutes(newStart, parseInt(duration));
    
    setNewEvent(prev => ({
      ...prev,
      start: newStart,
      end: newEnd
    }));
  }

  function handleDurationChange(newDuration: string) {
    setDuration(newDuration);
    if (newEvent.start) {
      setNewEvent(prev => ({
        ...prev,
        end: addMinutes(prev.start!, parseInt(newDuration))
      }));
    }
  }

  function validateBusinessHours(): boolean {
    if (!newEvent.start || !newEvent.end) return false;
    
    const isStartValid = isWithinBusinessHours(newEvent.start, businessHours);
    const isEndValid = isWithinBusinessHours(new Date(newEvent.end.getTime() - 1), businessHours);
    
    if (!isStartValid || !isEndValid) {
      setError('Event must be within business hours');
      return false;
    }
    
    return true;
  }

  function handleCreateEvent() {
    if (!newEvent.title) {
      setError('Please enter a service title');
      return;
    }

    if (!newEvent.staffId) {
      setError('Please select a staff member');
      return;
    }

    if (!validateBusinessHours()) return;

    if (checkEventOverlap(newEvent, existingEvents)) {
      setError('This time slot overlaps with an existing event');
      return;
    }

    const event: CalendarEvent = {
      id: Math.random().toString(36).substr(2, 9),
      title: newEvent.title,
      start: newEvent.start!,
      end: newEvent.end!,
      type: newEvent.type || 'appointment',
      clientName: newEvent.clientName,
      notes: newEvent.notes,
      status: newEvent.status || 'pending',
      color: getEventColor(newEvent as CalendarEvent),
      staffId: newEvent.staffId
    };

    onEventCreate(event);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 bg-white dark:bg-gray-950 gap-0">
        <DialogHeader className="px-6 py-4 border-b bg-gray-50/80 dark:bg-gray-900/80 flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              New Appointment
            </DialogTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {initialTime ? format(initialTime, 'EEEE, MMMM d') : 'Select a time'}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="px-6 py-4 space-y-6 bg-white dark:bg-gray-950">
          {error && (
            <Alert variant="destructive" className="text-sm border-red-500/20 bg-red-50/50 dark:bg-red-900/20">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Staff Selection - Moved to top */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Select Staff Member
            </Label>
            <div className="grid grid-cols-3 gap-3">
              {staffMembers.map((staff) => (
                <Button
                  key={staff.id}
                  variant={newEvent.staffId === staff.id ? "default" : "outline"}
                  className={cn(
                    "relative flex flex-col items-center p-3 h-auto gap-2 transition-all duration-200",
                    newEvent.staffId === staff.id 
                      ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800",
                    "group"
                  )}
                  onClick={() => setNewEvent({ ...newEvent, staffId: staff.id })}
                >
                  {newEvent.staffId === staff.id && (
                    <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-[10px]">
                      ✓
                    </div>
                  )}
                  <Avatar className={cn(
                    "h-12 w-12 border-2 transition-colors",
                    newEvent.staffId === staff.id 
                      ? "border-primary-foreground/20"
                      : "border-primary/20 group-hover:border-primary/40"
                  )}>
                    <AvatarImage src={staff.avatar} alt={staff.name} />
                    <AvatarFallback className={cn(
                      "text-sm",
                      newEvent.staffId === staff.id 
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-primary/10 text-primary"
                    )}>
                      {staff.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium text-center">{staff.name}</span>
                  <span className="text-[10px] text-muted-foreground">{staff.role}</span>
                </Button>
              ))}
            </div>
          </div>

          <Separator className="bg-gray-200 dark:bg-gray-800" />

          {/* Time Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Start Time
              </Label>
              <Select
                value={newEvent.start ? format(newEvent.start, 'HH:mm') : undefined}
                onValueChange={handleTimeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Duration
              </Label>
              <Select value={duration} onValueChange={handleDurationChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Client Details */}
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label 
                htmlFor="title" 
                className="text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                Service Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g., Haircut, Styling, Color"
                value={newEvent.title || ''}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800
                          focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="grid gap-2">
              <Label 
                htmlFor="clientName" 
                className="text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                Client Name
              </Label>
              <Input
                id="clientName"
                placeholder="Enter client name"
                value={newEvent.clientName || ''}
                onChange={(e) => setNewEvent({ ...newEvent, clientName: e.target.value })}
                className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800
                          focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="grid gap-2">
              <Label 
                htmlFor="notes" 
                className="text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes..."
                className="h-20 resize-none bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800
                          focus:ring-primary/20 focus:border-primary"
                value={newEvent.notes || ''}
                onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t bg-gray-50/80 dark:bg-gray-900/80 flex-row justify-between sm:justify-between gap-2">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCreateEvent}
            className="bg-primary hover:bg-primary/90 gap-2"
            size="lg"
          >
            <Plus className="h-4 w-4" />
            Create Appointment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 