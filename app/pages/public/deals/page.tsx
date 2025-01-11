"use client";

import { useState } from "react";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { businesses } from "@/data/mock";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { Slider } from "@/app/components/ui/slider";
import { Badge } from "@/app/components/ui/badge";
import { FeaturedDealCard } from "@/app/components/FeaturedDealCard";
import { businessCategories } from "@/app/models/supabase.models";

// Get unique categories from businesses
const categories = Array.from(new Set(businesses.map(b => b.category)));

export default function DealsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [minDiscount, setMinDiscount] = useState(0);
  const [sortBy, setSortBy] = useState<string>("discount");

  // Filter and sort deals
  const filteredDeals: never[] = [];

  const clearFilters = () => {
    setSelectedCategory("");
    setPriceRange([0, 500]);
    setMinDiscount(0);
    setSortBy("discount");
  };

  const hasActiveFilters = selectedCategory || priceRange[0] > 0 || priceRange[1] < 500 || minDiscount > 0;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        <div className="max-w-screen-2xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">All Deals</h1>
            <p className="text-gray-600 mt-2">Discover the best offers from our partners</p>
          </div>

          {/* Search and Filters Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount">Highest Discount</SelectItem>
                  <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                  <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filters */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-6">
                    <FilterControls
                      businessCategories={businessCategories}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                      minDiscount={minDiscount}
                      setMinDiscount={setMinDiscount}
                    />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Desktop Filters */}
              <div className="hidden md:flex gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {businessCategories.map((category: string) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span className="text-sm text-gray-500">Active filters:</span>
              {selectedCategory && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {selectedCategory}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => setSelectedCategory("")}
                  />
                </Badge>
              )}
              {(priceRange[0] > 0 || priceRange[1] < 500) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  ${priceRange[0]} - ${priceRange[1]}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => setPriceRange([0, 500])}
                  />
                </Badge>
              )}
              {minDiscount > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Min {minDiscount}% off
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => setMinDiscount(0)}
                  />
                </Badge>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                Clear all
              </Button>
            </div>
          )}

          {/* Deals Grid 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeals.map((offer) => (
              <FeaturedDealCard
                key={null}
                offer={null}
                business={null}
              />
            ))}
          </div>
            */}

          {/* No Results */}
          {filteredDeals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No deals found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={clearFilters} 
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Filter Controls Component
function FilterControls({
  businessCategories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  minDiscount,
  setMinDiscount,
}: {
  businessCategories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  minDiscount: number;
  setMinDiscount: (discount: number) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block">Category</label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {businessCategories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Price Range</label>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={500}
            step={10}
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Minimum Discount</label>
        <div className="space-y-4">
          <Slider
            value={[minDiscount]}
            onValueChange={([value]) => setMinDiscount(value)}
            min={0}
            max={100}
            step={5}
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>{minDiscount}% off</span>
          </div>
        </div>
      </div>
    </div>
  );
} 