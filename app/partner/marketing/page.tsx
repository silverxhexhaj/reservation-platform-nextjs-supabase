'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  Mail,
  MessageSquare,
  Share2,
  Star,
  TrendingUp,
  Users,
  Plus
} from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'social';
  status: 'active' | 'draft' | 'completed';
  audience: number;
  engagement: number;
  lastUpdated: string;
}

const campaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Special Promotion',
    type: 'email',
    status: 'active',
    audience: 1200,
    engagement: 28,
    lastUpdated: '2024-02-20'
  },
  {
    id: '2',
    name: 'New Client Welcome',
    type: 'sms',
    status: 'active',
    audience: 450,
    engagement: 42,
    lastUpdated: '2024-02-18'
  },
  {
    id: '3',
    name: 'Holiday Campaign',
    type: 'social',
    status: 'draft',
    audience: 2500,
    engagement: 0,
    lastUpdated: '2024-02-15'
  }
];

export default function Marketing() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketing</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your marketing campaigns and track performance
          </p>
        </div>
        <Button className="bg-blue-700 hover:bg-blue-800 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Subscribers
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Campaigns
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  2 drafts pending
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avg. Open Rate
                </CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">22.5%</div>
                <p className="text-xs text-muted-foreground">
                  Industry avg: 18.2%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Engagement Rate
                </CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">35.8%</div>
                <p className="text-xs text-muted-foreground">
                  +5.3% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Active Campaigns */}
          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
              <CardDescription>
                Your currently running marketing campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns
                  .filter(campaign => campaign.status === 'active')
                  .map(campaign => (
                    <div
                      key={campaign.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="space-y-1">
                        <h3 className="font-medium">{campaign.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="capitalize">{campaign.type}</span>
                          <span>•</span>
                          <span>{campaign.audience} recipients</span>
                          <span>•</span>
                          <span>{campaign.engagement}% engagement</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Management</CardTitle>
              <CardDescription>
                Create and manage your marketing campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Campaign management content */}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation Tab */}
        <TabsContent value="automation">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Automation</CardTitle>
              <CardDescription>
                Set up automated marketing workflows
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Automation content */}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Analytics</CardTitle>
              <CardDescription>
                Track and analyze your marketing performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Analytics content */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}