'use client';

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Client } from "../types";
import { cn } from "@/lib/utils";
import { CalendarIcon, CheckIcon, ChevronsUpDown, User, Phone } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

interface CreateClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClientCreate: (client: Client) => void;
}

const services = [
  { value: 'haircut-styling', label: 'Haircut & Styling' },
  { value: 'beard-trim', label: 'Beard Trim' },
  { value: 'color-treatment', label: 'Color Treatment' },
];

export function CreateClientDialog({
  open,
  onOpenChange,
  onClientCreate,
}: CreateClientDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
    status: 'active' as const,
    preferredService: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openServiceCombobox, setOpenServiceCombobox] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newClient: Client = {
        id: Date.now().toString(),
        ...formData,
        totalAppointments: 0,
        lastVisit: new Date().toISOString(),
        totalSpent: 0,
      };

      onClientCreate(newClient);
      onOpenChange(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        avatar: '',
        status: 'active',
        preferredService: '',
      });
    } catch (error) {
      console.error('Error creating client:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 bg-white">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Add a new client to your customer database.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Separator />
          
          <div className="p-6 space-y-6">
            {/* Basic Information Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium leading-none">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Avatar Preview */}
                <div className="col-span-2 flex items-center gap-4">
                  <Avatar className="h-20 w-20 border-2 border-muted">
                    <AvatarImage src={formData.avatar} alt={formData.name} />
                    <AvatarFallback className="text-lg bg-primary/10">
                      <User className="h-10 w-10 text-primary/60" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Label htmlFor="avatar">Profile Picture</Label>
                    <Input
                      id="avatar"
                      value={formData.avatar}
                      onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
                      placeholder="https://example.com/avatar.jpg"
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@example.com"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+1 234 567 8900"
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

                {/* Preferred Service */}
                <div className="space-y-2">
                  <Label>Preferred Service</Label>
                  <Popover open={openServiceCombobox} onOpenChange={setOpenServiceCombobox}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openServiceCombobox}
                        className="w-full justify-between"
                      >
                        {formData.preferredService
                          ? services.find((service) => service.value === formData.preferredService)?.label
                          : "Select service..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search service..." />
                        <CommandEmpty>No service found.</CommandEmpty>
                        <CommandGroup>
                          {services.map((service) => (
                            <CommandItem
                              key={service.value}
                              value={service.value}
                              onSelect={(value) => {
                                setFormData(prev => ({ ...prev, preferredService: value }));
                                setOpenServiceCombobox(false);
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.preferredService === service.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {service.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: 'active' | 'inactive') => 
                      setFormData(prev => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <Separator />
          
          <div className="p-6 pt-0 flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "bg-green-600 hover:bg-green-700 text-white",
                isSubmitting && "opacity-50 cursor-not-allowed"
              )}
            >
              {isSubmitting ? "Creating..." : "Create Client"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 