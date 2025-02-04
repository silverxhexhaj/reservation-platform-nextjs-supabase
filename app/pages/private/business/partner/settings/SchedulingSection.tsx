'use client';

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Separator } from "@/app/components/ui/separator";
import { Switch } from "@/app/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { cn } from "@/app/lib/utils";

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
] as const;

const TIME_SLOTS = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${minute}`;
});

interface BusinessHours {
  day: typeof DAYS_OF_WEEK[number];
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export function SchedulingSection() {
  return (
    <div className="space-y-12">
      {/* Business Hours Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Business Hours</h3>
          <p className="text-sm text-muted-foreground">
            Set your regular business hours. These hours will be used as default for your availability.
          </p>
        </div>
        <Separator />
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Day</TableHead>
              <TableHead className="w-[100px]">Open</TableHead>
              <TableHead>Hours</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DAYS_OF_WEEK.map((day) => (
              <TableRow key={day}>
                <TableCell className="font-medium">{day}</TableCell>
                <TableCell>
                  <Switch defaultChecked />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="09:00">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span>to</span>
                    <Select defaultValue="17:00">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Booking Rules Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Booking Rules</h3>
          <p className="text-sm text-muted-foreground">
            Configure your booking preferences and restrictions.
          </p>
        </div>
        <Separator />

        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Minimum Notice Period</Label>
              <p className="text-sm text-muted-foreground">
                Minimum time required before a booking can be made
              </p>
            </div>
            <Select defaultValue="1">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">No minimum</SelectItem>
                <SelectItem value="1">1 hour</SelectItem>
                <SelectItem value="2">2 hours</SelectItem>
                <SelectItem value="4">4 hours</SelectItem>
                <SelectItem value="24">24 hours</SelectItem>
                <SelectItem value="48">48 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Maximum Advance Booking</Label>
              <p className="text-sm text-muted-foreground">
                How far in advance can customers book
              </p>
            </div>
            <Select defaultValue="30">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">1 week</SelectItem>
                <SelectItem value="14">2 weeks</SelectItem>
                <SelectItem value="30">1 month</SelectItem>
                <SelectItem value="60">2 months</SelectItem>
                <SelectItem value="90">3 months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Buffer Time Between Bookings</Label>
              <p className="text-sm text-muted-foreground">
                Add padding time between appointments
              </p>
            </div>
            <Select defaultValue="0">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">No buffer</SelectItem>
                <SelectItem value="5">5 minutes</SelectItem>
                <SelectItem value="10">10 minutes</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Allow Same-Day Bookings</Label>
              <p className="text-sm text-muted-foreground">
                Enable customers to book appointments for the same day
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Require Deposit</Label>
              <p className="text-sm text-muted-foreground">
                Require payment at time of booking
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-blue-700 hover:bg-blue-800 text-white">Save Changes</Button>
      </div>
    </div>
  );
}