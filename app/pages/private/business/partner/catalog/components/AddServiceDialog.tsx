'use client';

import { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Switch } from "@/app/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";

interface AddServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onServiceAdd: (service: any) => void;
  categories: { id: string; name: string }[];
}

const serviceTypes = [
  { id: 'haircut', name: 'Haircut' },
  { id: 'color', name: 'Color' },
  { id: 'style', name: 'Style' },
  { id: 'treatment', name: 'Treatment' },
];

export function AddServiceDialog({
  open,
  onOpenChange,
  onServiceAdd,
  categories
}: AddServiceDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    serviceType: '',
    category: '',
    description: '',
    duration: '60',
    priceType: 'fixed',
    price: '',
    extraTime: false,
  });

  const [charCount, setCharCount] = useState({
    name: 0,
    description: 0
  });

  const handleSubmit = () => {
    const newService = {
      id: crypto.randomUUID(),
      ...formData,
      price: parseFloat(formData.price),
      duration: parseInt(formData.duration),
      status: 'active'
    };
    
    onServiceAdd(newService);
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      serviceType: '',
      category: '',
      description: '',
      duration: '60',
      priceType: 'fixed',
      price: '',
      extraTime: false,
    });
    setCharCount({ name: 0, description: 0 });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] bg-white">
        <DialogHeader>
          <DialogTitle>Add Service</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList>
            <TabsTrigger value="basic">Basic details</TabsTrigger>
            <TabsTrigger value="team">Team members</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6 py-4">
            {/* Service Name */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="name">Service name</Label>
                <span className="text-xs text-muted-foreground">{charCount.name}/255</span>
              </div>
              <Input
                id="name"
                placeholder="Add a service name, e.g. Men's Haircut"
                value={formData.name}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, name: e.target.value }));
                  setCharCount(prev => ({ ...prev, name: e.target.value.length }));
                }}
                maxLength={255}
              />
            </div>

            {/* Service Type and Category */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Service type</Label>
                <Select
                  value={formData.serviceType}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, serviceType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Used to help clients find your service on Fresha marketplace
                </p>
              </div>

              <div className="space-y-2">
                <Label>Menu category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select menu category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .filter(category => category.id !== 'all')
                      .map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  The category displayed to you, and to clients online
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Description (Optional)</Label>
                <span className="text-xs text-muted-foreground">{charCount.description}/1000</span>
              </div>
              <Textarea
                placeholder="Add a short description"
                value={formData.description}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, description: e.target.value }));
                  setCharCount(prev => ({ ...prev, description: e.target.value.length }));
                }}
                maxLength={1000}
              />
            </div>

            {/* Pricing and Duration */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Pricing and duration</h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}
                  >
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

                <div className="space-y-2">
                  <Label>Price type</Label>
                  <Select
                    value={formData.priceType}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, priceType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed</SelectItem>
                      <SelectItem value="variable">Variable</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Price</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      type="number"
                      placeholder="0.00"
                      className="pl-8"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {/* Extra Time Option */}
              <div className="flex items-center justify-between pt-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Label>Extra time</Label>
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100">Off</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Automatically add blocked time or processing time after each appointment
                  </div>
                </div>
                <Switch
                  checked={formData.extraTime}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, extraTime: checked }))}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="team">
            <div className="py-4">
              <p className="text-muted-foreground">Team member settings will be available after creating the service.</p>
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <div className="py-4">
              <p className="text-muted-foreground">Resource settings will be available after creating the service.</p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => {
            onOpenChange(false);
            resetForm();
          }}>
            Cancel
          </Button>
          <Button 
            className="bg-blue-700 hover:bg-blue-800 text-white"
            onClick={handleSubmit}
            disabled={!formData.name || !formData.serviceType || !formData.category || !formData.price}
          >
            Create Service
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 