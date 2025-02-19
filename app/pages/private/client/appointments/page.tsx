'use client';

import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { CalendarDays, Clock, CheckCircle2, XCircle, Clock3 } from 'lucide-react';
import { AppointmentCard } from "@/app/components/client/AppointmentCard";

// Mock data for appointments
const appointments = {
    upcoming: [
        {
            id: 1,
            businessName: "Spa & Wellness Center",
            service: "Full Body Massage",
            date: "2024-04-15",
            time: "14:00",
            duration: "60 min",
            price: "$85",
            location: "123 Wellness Ave, New York",
            businessImage: "/placeholder-business.jpg",
        },
        {
            id: 2,
            businessName: "Spa & Wellness Center",
            service: "Full Body Massage",
            date: "2024-04-15",
            time: "14:00",
            duration: "60 min",
            price: "$85",
            location: "123 Wellness Ave, New York",
            businessImage: "/placeholder-business.jpg",
        },
    ],
    completed: [
        {
            id: 3,
            businessName: "Nail Art Studio",
            service: "Manicure & Pedicure",
            date: "2024-03-30",
            time: "15:00",
            duration: "90 min",
            price: "$95",
            location: "789 Fashion St, New York",
            businessImage: "/placeholder-business.jpg",
            rating: 5,
        },
    ],
    cancelled: [
        {
            id: 4,
            businessName: "Dental Care Plus",
            service: "Teeth Cleaning",
            date: "2024-03-25",
            time: "09:00",
            duration: "30 min",
            price: "$120",
            location: "321 Health Road, New York",
            businessImage: "/placeholder-business.jpg",
            cancellationReason: "Schedule conflict",
        },
    ],
};

export default function AppointmentsPage() {
    return (
        <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900">My Appointments</h1>
                <p className="text-gray-500 mt-1">Manage and track all your appointments</p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                    <p className="text-3xl font-bold text-gray-900">{appointments.upcoming.length}</p>
                    <p className="text-sm text-gray-600 font-medium mt-1">Upcoming</p>
                </div>
                <div className="text-center p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                    <p className="text-3xl font-bold text-gray-900">{appointments.completed.length}</p>
                    <p className="text-sm text-gray-600 font-medium mt-1">Completed</p>
                </div>
                <div className="text-center p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                    <p className="text-3xl font-bold text-gray-900">{appointments.cancelled.length}</p>
                    <p className="text-sm text-gray-600 font-medium mt-1">Cancelled</p>
                </div>
            </div>

            <Tabs defaultValue="upcoming" className="w-full">
                <div className="flex justify-start mb-8">
                    <TabsList className="grid grid-cols-3 bg-gray-100/80 p-1 rounded-lg h-full">
                        <TabsTrigger 
                            value="upcoming" 
                            className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm px-8"
                        >
                            Upcoming
                        </TabsTrigger>
                        <TabsTrigger 
                            value="completed"
                            className="data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm px-8"
                        >
                            Completed
                        </TabsTrigger>
                        <TabsTrigger 
                            value="cancelled"
                            className="data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm px-8"
                        >
                            Cancelled
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="upcoming">
                    {appointments.upcoming.length > 0 ? (
                        appointments.upcoming.map((appointment) => (
                            <AppointmentCard 
                                key={appointment.id} 
                                appointment={appointment} 
                                status="upcoming"
                            />
                        ))
                    ) : (
                        <AppointmentCard status="upcoming" isEmpty />
                    )}
                </TabsContent>

                <TabsContent value="completed">
                    {appointments.completed.length > 0 ? (
                        appointments.completed.map((appointment) => (
                            <AppointmentCard 
                                key={appointment.id} 
                                appointment={appointment} 
                                status="completed"
                            />
                        ))
                    ) : (
                        <AppointmentCard status="completed" isEmpty />
                    )}
                </TabsContent>

                <TabsContent value="cancelled">
                    {appointments.cancelled.length > 0 ? (
                        appointments.cancelled.map((appointment) => (
                            <AppointmentCard 
                                key={appointment.id} 
                                appointment={appointment} 
                                status="cancelled"
                            />
                        ))
                    ) : (
                        <AppointmentCard status="cancelled" isEmpty />
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
} 