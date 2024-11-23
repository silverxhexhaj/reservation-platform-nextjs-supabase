'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Filter, ArrowUpDown } from "lucide-react";
import { AddServiceDialog } from './components/AddServiceDialog';

interface Service {
  id: string;
  name: string;
  category: string;
  duration: number;
  price: number;
  status: 'active' | 'archived';
  description?: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

const categories: Category[] = [
  { id: 'all', name: 'All categories', count: 0 },
  { id: 'hair', name: 'Hair', count: 0 },
];

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

  const handleAddService = (newService: Service) => {
    setServices(prev => [...prev, newService]);
    const categoryToUpdate = categories.find(c => c.id === newService.category);
    if (categoryToUpdate) {
      categoryToUpdate.count += 1;
      categories.find(c => c.id === 'all')!.count += 1;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Service menu</h1>
          <p className="text-sm text-muted-foreground mt-1">
            View and manage the services offered by your business
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Options
          </Button>
          <Button 
            className="bg-blue-700 hover:bg-blue-800 text-white"
            onClick={() => setIsAddServiceOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search service name" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        <Button variant="ghost" size="sm" className="ml-auto">
          <ArrowUpDown className="h-4 w-4 mr-2" />
          Manage order
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Categories Sidebar */}
        <Card className="w-64">
          <CardHeader>
            <CardTitle className="text-lg">Categories</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full px-4 py-2 text-left rounded-md transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-slate-100 font-medium'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{category.name}</span>
                    <span className="text-sm text-muted-foreground">{category.count}</span>
                  </div>
                </button>
              ))}
              <button
                className="w-full px-4 py-2 text-left text-blue-600 hover:bg-slate-50 rounded-md transition-colors"
                onClick={() => {
                  // Handle adding new category
                }}
              >
                Add category
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Services List */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>{selectedCategory === 'all' ? 'All Services' : categories.find(c => c.id === selectedCategory)?.name}</CardTitle>
            <CardDescription>
              {selectedCategory === 'all' 
                ? 'View and manage all services' 
                : `View and manage services in ${categories.find(c => c.id === selectedCategory)?.name}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {services.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No services
                <div className="mt-2 text-sm">
                  2 archived services. <button className="text-blue-600 hover:underline">View all</button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {services
                  .filter(service => 
                    selectedCategory === 'all' || service.category === selectedCategory
                  )
                  .map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="space-y-1">
                        <h3 className="font-medium">{service.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>${service.price}</span>
                          <span>•</span>
                          <span>{service.duration} min</span>
                          <span>•</span>
                          <span className={service.status === 'active' ? 'text-green-600' : 'text-gray-500'}>
                            {service.status}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AddServiceDialog
        open={isAddServiceOpen}
        onOpenChange={setIsAddServiceOpen}
        onServiceAdd={handleAddService}
        categories={categories}
      />
    </div>
  );
}