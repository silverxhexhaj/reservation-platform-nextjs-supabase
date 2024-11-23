'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Percent, Tag, Calendar, DollarSign } from "lucide-react";

interface Promotion {
  id: string;
  name: string;
  type: 'percentage' | 'fixed';
  value: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

const promotions: Promotion[] = [
  {
    id: '1',
    name: 'Summer Sale',
    type: 'percentage',
    value: 20,
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    isActive: true,
  },
  {
    id: '2',
    name: 'New Customer Discount',
    type: 'fixed',
    value: 15,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    isActive: true,
  },
];

export function SalesSection() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="pricing" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="discounts">Discounts</TabsTrigger>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
        </TabsList>

        {/* Pricing Tab */}
        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle>Service Pricing</CardTitle>
              <CardDescription>Set and manage your service prices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Dynamic Pricing</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically adjust prices based on demand
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Peak Hours Pricing</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Percentage increase"
                      className="w-40"
                    />
                    <span className="text-muted-foreground">% increase</span>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Off-Peak Discount</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Percentage decrease"
                      className="w-40"
                    />
                    <span className="text-muted-foreground">% decrease</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Discounts Tab */}
        <TabsContent value="discounts">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Discount Rules</CardTitle>
                  <CardDescription>Configure automatic discount rules</CardDescription>
                </div>
                <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Rule
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Percent className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <h4 className="font-medium">First-Time Customer</h4>
                        <p className="text-sm text-muted-foreground">15% off first booking</p>
                      </div>
                    </div>
                    <Switch checked={true} />
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Tag className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <h4 className="font-medium">Bulk Booking</h4>
                        <p className="text-sm text-muted-foreground">10% off for 3+ services</p>
                      </div>
                    </div>
                    <Switch checked={true} />
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Promotions Tab */}
        <TabsContent value="promotions">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Active Promotions</CardTitle>
                  <CardDescription>Manage your promotional campaigns</CardDescription>
                </div>
                <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Promotion
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {promotions.map((promo) => (
                  <Card key={promo.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          {promo.type === 'percentage' ? (
                            <Percent className="h-5 w-5 text-blue-700" />
                          ) : (
                            <DollarSign className="h-5 w-5 text-blue-700" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{promo.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{promo.startDate} - {promo.endDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium text-blue-700">
                          {promo.type === 'percentage' ? `${promo.value}%` : `$${promo.value}`} off
                        </span>
                        <Switch checked={promo.isActive} />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 