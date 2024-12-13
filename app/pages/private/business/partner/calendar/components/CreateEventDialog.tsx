'use client';

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { format } from "date-fns";
import { CalendarEvent, BusinessHours, Staff } from "@/types/calendar";
import { useState } from "react";

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

export function CreateEventDialog({
  open,
  onOpenChange,
  onEventCreate,
  existingEvents,
  businessHours,
  staffMembers,
  initialTime,
  initialStaffId,
}: CreateEventDialogProps) {
  const [selectedStaff, setSelectedStaff] = useState<Staff | undefined>(
    initialStaffId ? staffMembers.find(s => s.id === initialStaffId) : undefined
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white border shadow-lg">
        <DialogHeader className="bg-white">
          <DialogTitle>
            New Appointment
            <div className="text-sm font-normal text-muted-foreground mt-1">
              {initialTime ? format(initialTime, 'EEEE, MMMM d') : 'Select a time'}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4 bg-white">
          {/* Staff Selection */}
          <div className="space-y-2">
            <Label>Select Staff Member</Label>
            <div className="grid grid-cols-3 gap-2">
              {staffMembers.map((staff) => (
                <button
                  key={staff.id}
                  className={`p-3 rounded-lg border transition-colors ${
                    selectedStaff?.id === staff.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedStaff(staff)}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={staff.avatar} alt={staff.name} />
                      <AvatarFallback>
                        {staff.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <div className="text-sm font-medium">{staff.name}</div>
                      <div className="text-xs text-muted-foreground">{staff.role}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Start Time */}
          <div className="space-y-2">
            <Label>Start Time</Label>
            <Select defaultValue={initialTime ? format(initialTime, 'HH:mm') : undefined}>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {/* Add your time options here */}
              </SelectContent>
            </Select>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label>Duration</Label>
            <Select defaultValue="15">
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Service */}
          <div className="space-y-2">
            <Label>Service</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a service..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="haircut">Haircut</SelectItem>
                <SelectItem value="coloring">Coloring</SelectItem>
                <SelectItem value="styling">Styling</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Client Name */}
          <div className="space-y-2">
            <Label>Client Name</Label>
            <Input placeholder="Search clients..." />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea placeholder="Add any additional notes..." />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 bg-white">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => {
              // Add your event creation logic here
              onOpenChange(false);
            }}
          >
            Create Appointment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 