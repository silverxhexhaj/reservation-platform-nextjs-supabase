"use client";

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/app/components/ui/dialog";
import { SlidersHorizontal } from "lucide-react";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Label } from "@/app/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Separator } from "@/app/components/ui/separator";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface FilterModalProps {
  categories: string[];
}

interface FilterState {
  priceRange: string;
  rating: string;
  parking: boolean;
  wifi: boolean;
  accessible: boolean;
  onlineBooking: boolean;
}

export function FilterModal({ categories }: FilterModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState<FilterState>({
    priceRange: searchParams.get("priceRange") ?? "all",
    rating: searchParams.get("rating") ?? "all",
    parking: searchParams.get("parking") === "true" ? true : false,
    wifi: searchParams.get("wifi") === "true" ? true : false,
    accessible: searchParams.get("accessible") === "true" ? true : false,
    onlineBooking: searchParams.get("onlineBooking") === "true" ? true : false,
  });

  const createQueryString = useCallback(
    (filters: typeof tempFilters) => {
      const params = new URLSearchParams(searchParams);
      
      // Update price range
      if (filters.priceRange !== "all") {
        params.set("priceRange", filters.priceRange);
      } else {
        params.delete("priceRange");
      }
      
      // Update rating
      if (filters.rating !== "all") {
        params.set("rating", filters.rating);
      } else {
        params.delete("rating");
      }
      
      // Update features
      Object.entries(filters)
        .filter(([key]) => ["parking", "wifi", "accessible", "onlineBooking"].includes(key))
        .forEach(([key, value]) => {
          if (value) {
            params.set(key, "true");
          } else {
            params.delete(key);
          }
        });
      
      return params.toString();
    },
    [searchParams]
  );

  const handleApplyFilters = () => {
    const queryString = createQueryString(tempFilters);
    router.push(`/explore${queryString ? `?${queryString}` : ""}`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="shrink-0 hover:bg-gray-100 transition-colors bg-white"
        >
          <SlidersHorizontal className="h-4 w-4 text-gray-700" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold text-gray-900">Filters</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900">Price Range</h4>
            <RadioGroup
              value={tempFilters.priceRange}
              onValueChange={(value) => setTempFilters(prev => ({ ...prev, priceRange: value }))}
              className="gap-3"
            >
              {[
                { value: "all", label: "All Prices" },
                { value: "budget", label: "Budget" },
                { value: "mid-range", label: "Mid-range" },
                { value: "luxury", label: "Luxury" }
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label 
                    htmlFor={option.value} 
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <Separator className="bg-gray-200" />
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900">Rating</h4>
            <RadioGroup
              value={tempFilters.rating}
              onValueChange={(value) => setTempFilters(prev => ({ ...prev, rating: value }))}
              className="gap-3"
            >
              {[
                { value: "all", label: "All Ratings" },
                { value: "4plus", label: "4+ Stars" },
                { value: "3plus", label: "3+ Stars" }
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={option.value} id={`r-${option.value}`} />
                  <Label 
                    htmlFor={`r-${option.value}`} 
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <Separator className="bg-gray-200" />
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900">Features</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: "parking", label: "Parking" },
                { id: "wifi", label: "Wi-Fi" },
                { id: "accessible", label: "Accessible" },
                { id: "onlineBooking", label: "Online Booking" }
              ].map((feature) => (
                <div key={feature.id} className="flex items-center space-x-3">
                  <Checkbox 
                    id={feature.id}
                    checked={Boolean(tempFilters[feature.id as keyof FilterState])}
                    onCheckedChange={(checked) => 
                      setTempFilters(prev => ({ 
                        ...prev, 
                        [feature.id]: checked === true
                      }))
                    }
                    className="border-gray-300"
                  />
                  <Label 
                    htmlFor={feature.id} 
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {feature.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="mt-6 flex gap-3 sm:gap-0">
          <DialogClose asChild>
            <Button variant="outline" className="flex-1 sm:flex-none">
              Cancel
            </Button>
          </DialogClose>
          <Button 
            onClick={handleApplyFilters}
            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white"
          >
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 