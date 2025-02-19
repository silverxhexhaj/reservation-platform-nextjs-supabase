'use client';

import { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { Switch } from "@/app/components/ui/switch";
import { Label } from "@/app/components/ui/label";
import { useToast } from "@/app/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";

export default function SettingsPage() {
    const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState('');
    const { toast } = useToast();

    // Mock notification settings
    const [notificationSettings, setNotificationSettings] = useState({
        appointmentReminders: true,
        promotionalEmails: false,
        serviceUpdates: true,
        securityAlerts: true,
    });

    const handleNotificationChange = (setting: keyof typeof notificationSettings) => {
        setNotificationSettings(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
        toast({
            title: "Settings updated",
            description: "Your notification preferences have been saved.",
        });
    };

    const handleDeleteAccount = () => {
        if (deleteConfirmation.toLowerCase() !== 'delete my account') {
            toast({
                title: "Error",
                description: "Please type the confirmation phrase exactly as shown.",
                variant: "destructive",
            });
            return;
        }

        // Here you would typically make an API call to delete the account
        toast({
            title: "Account Deleted",
            description: "Your account has been successfully deleted.",
        });
        setIsDeleteAccountDialogOpen(false);
    };

    return (
        <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
                <p className="text-gray-500 mt-1">Manage your account preferences and settings</p>
            </div>

            {/* Notifications Section */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 mb-8">
                <div className="p-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-sm">Appointment Reminders</Label>
                                <p className="text-sm text-gray-500">
                                    Receive notifications about your upcoming appointments
                                </p>
                            </div>
                            <Switch
                                checked={notificationSettings.appointmentReminders}
                                onCheckedChange={() => handleNotificationChange('appointmentReminders')}
                                className="scale-[0.85] data-[state=checked]:bg-blue-600"
                            />
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-sm">Promotional Emails</Label>
                                <p className="text-sm text-gray-500">
                                    Get updates about special offers and deals
                                </p>
                            </div>
                            <Switch
                                checked={notificationSettings.promotionalEmails}
                                onCheckedChange={() => handleNotificationChange('promotionalEmails')}
                                className="scale-[0.85] data-[state=checked]:bg-blue-600"
                            />
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-sm">Service Updates</Label>
                                <p className="text-sm text-gray-500">
                                    Stay informed about new features and improvements
                                </p>
                            </div>
                            <Switch
                                checked={notificationSettings.serviceUpdates}
                                onCheckedChange={() => handleNotificationChange('serviceUpdates')}
                                className="scale-[0.85] data-[state=checked]:bg-blue-600"
                            />
                        </div>
                        
                        
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-sm">Security Alerts</Label>
                                <p className="text-sm text-gray-500">
                                    Get notified about important security updates
                                </p>
                            </div>
                            <Switch
                                checked={notificationSettings.securityAlerts}
                                onCheckedChange={() => handleNotificationChange('securityAlerts')}
                                className="scale-[0.85] data-[state=checked]:bg-blue-600"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Account Section */}
            <div className="rounded-xl border border-red-100 bg-red-50 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="p-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Delete Account</h2>
                    </div>

                    <div className="space-y-4">
                        <p className="text-gray-600 text-sm">
                            Once you delete your account, there is no going back. This action is permanent and cannot be undone.
                        </p>
                        <Button
                            variant="destructive"
                            onClick={() => setIsDeleteAccountDialogOpen(true)}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Delete Account
                        </Button>
                    </div>
                </div>
            </div>

            {/* Delete Account Confirmation Dialog */}
            <Dialog open={isDeleteAccountDialogOpen} onOpenChange={setIsDeleteAccountDialogOpen}>
                <DialogContent className="sm:max-w-[600px] bg-white">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl text-gray-900">
                            Delete Account
                        </DialogTitle>
                        <DialogDescription className="text-gray-500">
                            This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-6">
                        <div className="space-y-4">
                            <div className="rounded-lg bg-red-50 p-4">
                                <p className="text-sm text-red-800">
                                    Please type <span className="font-medium">delete my account</span> to confirm.
                                </p>
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="confirmation" className="text-sm font-medium text-gray-700">
                                    Confirmation
                                </Label>
                                <Input
                                    id="confirmation"
                                    value={deleteConfirmation}
                                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                                    placeholder="delete my account"
                                    className="border-gray-200 focus:border-gray-300 focus:ring-gray-200"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="border-t border-gray-100 pt-4">
                        <DialogClose asChild>
                            <Button 
                                variant="outline"
                                className="border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteAccount}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Delete Account
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
} 