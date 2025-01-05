'use client';

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Separator } from "@/app/components/ui/separator";
import { TeamMember } from "../types";
import { cn } from "@/lib/utils";
import { CalendarIcon, CheckIcon, ChevronsUpDown, User } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/app/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/app/components/ui/command";

interface CreateTeamMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTeamMemberCreate: (member: TeamMember) => void;
  defaultValues?: TeamMember | null;
}

const roles = [
  { value: 'stylist', label: 'Stylist' },
  { value: 'barber', label: 'Barber' },
  { value: 'colorist', label: 'Colorist' },
];

export function CreateTeamMemberDialog({
  open,
  onOpenChange,
  onTeamMemberCreate,
  defaultValues
}: CreateTeamMemberDialogProps) {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    role: string;
    avatar: string;
    status: 'active' | 'inactive';
    joinedDate: Date;
  }>({
    name: '',
    email: '',
    role: '',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + Math.random(),
    status: 'active',
    joinedDate: new Date(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openRoleCombobox, setOpenRoleCombobox] = useState(false);

  // Initialize form with default values when editing
  useEffect(() => {
    if (defaultValues) {
      setFormData({
        name: defaultValues.name,
        email: defaultValues.email,
        role: defaultValues.role.toLowerCase(),
        avatar: defaultValues.avatar,
        status: defaultValues.status,
        joinedDate: new Date(defaultValues.joinedDate),
      });
    }
  }, [defaultValues]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const memberData: TeamMember = {
        id: defaultValues?.id || Date.now().toString(),
        ...formData,
        joinedDate: formData.joinedDate.toISOString(),
        rating: defaultValues?.rating || 0,
        appointments: defaultValues?.appointments || 0,
      };

      onTeamMemberCreate(memberData);
      onOpenChange(false);
      // Only reset form if not editing
      if (!defaultValues) {
        setFormData({
          name: '',
          email: '',
          role: '',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + Math.random(),
          status: 'active',
          joinedDate: new Date(),
        });
      }
    } catch (error) {
      console.error('Error saving team member:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 bg-white">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>{defaultValues ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
          <DialogDescription>
            {defaultValues ? 'Edit existing team member details.' : 'Add a new team member to your organization.'}
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
              </div>
            </div>

            {/* Role and Status Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium leading-none">Role & Status</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Role */}
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Popover open={openRoleCombobox} onOpenChange={setOpenRoleCombobox}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openRoleCombobox}
                        className="w-full justify-between"
                      >
                        {formData.role
                          ? roles.find((role) => role.value === formData.role)?.label
                          : "Select role..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search role..." />
                        <CommandEmpty>No role found.</CommandEmpty>
                        <CommandGroup>
                          {roles.map((role) => (
                            <CommandItem
                              key={role.value}
                              value={role.value}
                              onSelect={(value) => {
                                setFormData(prev => ({ ...prev, role: value }));
                                setOpenRoleCombobox(false);
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.role === role.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {role.label}
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

                {/* Join Date */}
                <div className="space-y-2">
                  <Label>Join Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.joinedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.joinedDate ? (
                          format(formData.joinedDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.joinedDate}
                        onSelect={(date) => 
                          setFormData(prev => ({ ...prev, joinedDate: date || new Date() }))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
              {isSubmitting ? (defaultValues ? "Saving..." : "Creating...") : (defaultValues ? "Save Changes" : "Create Member")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 