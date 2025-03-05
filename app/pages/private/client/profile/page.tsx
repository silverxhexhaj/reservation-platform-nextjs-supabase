'use client';

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { CalendarDays, MapPin, Phone, Mail, Building, Edit2, Camera, User as UserIcon, X } from 'lucide-react';
import { useToast } from "@/app/components/ui/use-toast";
import { Separator } from "@/app/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/app/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { authService } from '@/app/service/auth.service';
import { Profile } from '@/app/models/supabase.models';
import { User } from '@supabase/supabase-js';
import { formatDate } from '@/app/lib/utils';

export default function ClientProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        const fetchUser = async () => {
            const userInfo = await authService.getUser();
            setUser(userInfo.user);
            setProfile(userInfo.profile);
        };
        fetchUser();
    }, []);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = () => {
        setIsEditing(false);
        setImagePreview(null);
        toast({
            title: "Profile updated",
            description: "Your profile has been successfully updated.",
        });
    };

    return (
        <div>
            <div className="mb-8 flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
                    <p className="text-gray-500 mt-1">Manage your personal information and preferences</p>
                </div>
                <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="shadow-sm hover:shadow-md transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white"
                >
                    Edit Profile
                </Button>
            </div>

            <div className="relative rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex flex-col md:flex-row md:items-start">
                    <div className="flex flex-col items-center md:items-start space-y-4 p-8">
                        <div className="relative group">
                            <div className="relative flex items-center justify-center">
                                <Avatar className="h-32 w-32 ring-4 ring-white shadow-xl transition-transform duration-200 group-hover:scale-105">
                                    <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" className="object-cover" />
                                    <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 text-2xl">
                                        {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                                    </AvatarFallback>
                                </Avatar>
                                {isEditing && (
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="absolute -bottom-2 -right-2 rounded-full bg-white hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-gray-300"
                                    >
                                        <Camera className="h-4 w-4 text-gray-600" />
                                    </Button>
                                )}
                            </div>
                            <div className="mt-4 text-center space-y-1">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {profile?.first_name} {profile?.last_name}
                                </h1>
                                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                                    Member since {formatDate(profile?.created_at)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-8 p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 transition-colors duration-200">
                                <Mail className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Email</p>
                                    <p className="text-sm font-semibold text-gray-900">{user?.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 transition-colors duration-200">
                                <Phone className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Phone</p>
                                    <p className="text-sm font-semibold text-gray-900">{user?.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 transition-colors duration-200">
                                <MapPin className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Address</p>
                                    {/* <p className="text-sm font-semibold text-gray-900">{profile?.location?.address}</p> */}
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 transition-colors duration-200">
                                <UserIcon className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Gender</p>
                                    <p className="text-sm font-semibold text-gray-900 capitalize">{profile?.gender}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 transition-colors duration-200">
                                <CalendarDays className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Birth Date</p>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {formatDate(profile?.date_of_birth)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogContent className="sm:max-w-[600px] bg-white">
                    <DialogHeader className="border-b border-gray-100 pb-4">
                        <DialogTitle className="flex items-center gap-2 text-xl">
                            Edit Personal Information
                        </DialogTitle>
                        <DialogDescription className="text-gray-500">
                            Make changes to your profile information here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                        {/* Profile Image Section */}
                        <div className="md:col-span-2 flex flex-col items-center space-y-4 pb-6">
                            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                <Avatar className="h-32 w-32 ring-4 ring-white shadow-xl transition-transform duration-200 group-hover:scale-105">
                                    <AvatarImage
                                        src={imagePreview || profile?.profile_picture || ''}
                                        alt="Profile"
                                        className="object-cover"
                                    />
                                    <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 text-2xl">
                                        {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <div className="absolute -bottom-2 -right-2 rounded-full bg-white hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-gray-300 p-2">
                                    <Camera className="h-4 w-4 text-gray-600" />
                                </div>
                            </div>
                            <div className="text-center space-y-1">
                                <p className="text-sm font-medium text-gray-700">Profile Photo</p>
                                <p className="text-xs text-gray-500">
                                    Click the image or camera icon to upload a new photo
                                </p>
                            </div>
                            {imagePreview && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setImagePreview(null)}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Remove New Photo
                                </Button>
                            )}
                            <Separator className="w-full" />
                        </div>

                        {/* Existing form fields */}
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                                First Name
                            </Label>
                            <Input
                                id="firstName"
                                defaultValue={profile?.first_name ?? ''}
                                className="border-gray-200 focus:border-gray-300 focus:ring-gray-200"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                                Last Name
                            </Label>
                            <Input
                                id="lastName"
                                defaultValue={profile?.last_name ?? ''}
                                className="border-gray-200 focus:border-gray-300 focus:ring-gray-200"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    readOnly
                                    defaultValue={user?.email}
                                    className="pl-10 border-gray-200 focus:border-gray-300 focus:ring-gray-200"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                Phone
                            </Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="phone"
                                    type="tel"
                                    defaultValue={user?.phone}
                                    className="pl-10 border-gray-200 focus:border-gray-300 focus:ring-gray-200"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
                                Gender
                            </Label>
                            <Select defaultValue={profile?.gender ?? 'other'}>
                                <SelectTrigger className="w-full border-gray-200 focus:border-gray-300 focus:ring-gray-200">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="birthDate" className="text-sm font-medium text-gray-700">
                                Birth Date
                            </Label>
                            <div className="relative">
                                <CalendarDays className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="birthDate"
                                    type="date"
                                    defaultValue={profile?.date_of_birth ?? ''}
                                    className="pl-10 border-gray-200 focus:border-gray-300 focus:ring-gray-200"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                                Address
                            </Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                {/* <Input
                                    id="address"
                                    defaultValue={profile?.location?.address ?? ''}
                                    className="pl-10 border-gray-200 focus:border-gray-300 focus:ring-gray-200"
                                /> */}
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="flex items-center gap-2 border-t border-gray-100 pt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsEditing(false)}
                            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSaveProfile}
                            className="bg-gray-900 hover:bg-gray-800 text-white"
                        >
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
} 