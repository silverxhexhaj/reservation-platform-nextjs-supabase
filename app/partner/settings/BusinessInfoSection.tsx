'use client';

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

const businessTypes = [
  { value: "salon", label: "Hair Salon" },
  { value: "spa", label: "Spa & Wellness" },
  { value: "barbershop", label: "Barbershop" },
  { value: "nails", label: "Nail Salon" },
  { value: "beauty", label: "Beauty Salon" },
  { value: "massage", label: "Massage Therapy" },
  { value: "other", label: "Other" },
];

interface BusinessInfoSectionProps {
  hideButtons?: boolean;
}

export function BusinessInfoSection({ hideButtons = false }: BusinessInfoSectionProps) {
  return (
    <div className="space-y-6">
      <form className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input 
              id="businessName"
              placeholder="Enter your business name" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessType">Business Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a business type" />
              </SelectTrigger>
              <SelectContent>
                {businessTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Business Description</Label>
            <Textarea 
              id="description"
              placeholder="Describe your business..."
              className="resize-none h-32"
            />
            <p className="text-sm text-muted-foreground">
              This will be displayed on your public profile.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone"
              placeholder="Enter business phone" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Business Email</Label>
            <Input 
              id="email"
              type="email"
              placeholder="Enter business email" 
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="website">Website (Optional)</Label>
            <Input 
              id="website"
              type="url"
              placeholder="https://your-website.com" 
            />
          </div>
        </div>

        {!hideButtons && (
          <div className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-blue-700 hover:bg-blue-800 text-white">Save Changes</Button>
          </div>
        )}
      </form>
    </div>
  );
}