"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { Input } from "@/app/components/ui/input"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/app/components/ui/dialog"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Label } from "@/app/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import { Separator } from "@/app/components/ui/separator"

interface ExploreFiltersProps {
  categories: string[]
}

interface FilterState {
  priceRange: string;
  rating: string;
  parking: boolean;
  wifi: boolean;
  accessible: boolean;
  onlineBooking: boolean;
}

export function ExploreFilters({ categories }: ExploreFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [tempFilters, setTempFilters] = useState<FilterState>({
    priceRange: searchParams.get("priceRange") ?? "all",
    rating: searchParams.get("rating") ?? "all",
    parking: searchParams.get("parking") === "true",
    wifi: searchParams.get("wifi") === "true",
    accessible: searchParams.get("accessible") === "true",
    onlineBooking: searchParams.get("onlineBooking") === "true",
  })

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams]
  )

  const createFilterQueryString = useCallback(
    (filters: FilterState) => {
      const params = new URLSearchParams(searchParams)
      
      // Update price range
      if (filters.priceRange !== "all") {
        params.set("priceRange", filters.priceRange)
      } else {
        params.delete("priceRange")
      }
      
      // Update rating
      if (filters.rating !== "all") {
        params.set("rating", filters.rating)
      } else {
        params.delete("rating")
      }
      
      // Update features
      Object.entries(filters)
        .filter(([key]) => ["parking", "wifi", "accessible", "onlineBooking"].includes(key))
        .forEach(([key, value]) => {
          if (value) {
            params.set(key, "true")
          } else {
            params.delete(key)
          }
        })
      
      return params.toString()
    },
    [searchParams]
  )

  const handleApplyFilters = () => {
    const queryString = createFilterQueryString(tempFilters)
    router.push(`/pages/public/explore?${queryString}`)
    setIsFilterOpen(false)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
      >
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 h-5 w-5" />
        <Input
          placeholder="Search by business name or service..."
          className="w-full pl-12 pr-16 h-12 bg-white border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-neutral-300 text-base rounded-xl shadow-sm"
          defaultValue={searchParams.get("search") ?? ""}
          onChange={(e) => {
            router.push(`/pages/public/explore?${createQueryString("search", e.target.value)}`)
          }}
        />
        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFilterOpen(true)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-neutral-100 rounded-lg"
          >
            <div className="flex items-center">
              <div className="w-[1px] h-6 bg-neutral-200 mr-2"></div>
              <SlidersHorizontal className="h-5 w-5 text-neutral-700" />
            </div>
          </Button>
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
                        onCheckedChange={(checked: boolean) => 
                          setTempFilters(prev => ({ 
                            ...prev, 
                            [feature.id]: checked
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
      </motion.div>
    </motion.div>
  )
} 