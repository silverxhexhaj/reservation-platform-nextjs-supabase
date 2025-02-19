'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { CalendarDays, MapPin, Phone, Mail, Building, Edit2, Camera } from 'lucide-react';
import { useToast } from "@/app/components/ui/use-toast";

export default function ClientProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const { toast } = useToast();
    
    // Placeholder data - replace with actual data from your backend
    const profile = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 890",
        address: "123 Main St, New York, NY 10001",
        bio: "Passionate about health and wellness. Regular gym enthusiast and yoga practitioner.",
        memberSince: "January 2024",
        appointmentsCompleted: 12,
        favoriteBusinesses: 5,
        activeOrders: 2
    };

    const handleSaveProfile = () => {
        setIsEditing(false);
        toast({
            title: "Profile updated",
            description: "Your profile has been successfully updated.",
        });
    };

    return (
        <div className="w-full py-6 space-y-8">

            <div className="">

                {/* Profile Details */}
                <div className="md:col-span-8 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>
                                Update your profile information and manage your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input 
                                        id="name" 
                                        defaultValue={profile.name} 
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                        id="email" 
                                        type="email" 
                                        defaultValue={profile.email} 
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input 
                                        id="phone" 
                                        type="tel" 
                                        defaultValue={profile.phone} 
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input 
                                        id="address" 
                                        defaultValue={profile.address} 
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea 
                                    id="bio" 
                                    defaultValue={profile.bio} 
                                    disabled={!isEditing}
                                    className="min-h-[100px]"
                                />
                            </div>
                            {isEditing && (
                                <div className="flex justify-end">
                                    <Button onClick={handleSaveProfile}>
                                        Save Changes
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    <div className="absolute top-8 right-8 flex justify-between items-center">
                        <Button 
                            variant={isEditing ? "default" : "outline"}
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? 'Save Changes' : 'Edit Profile'}
                            {isEditing ? null : <Edit2 className="w-4 h-4 ml-2" />}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
} 