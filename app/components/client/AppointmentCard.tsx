'use client';

import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { CalendarDays, Clock, CheckCircle2, XCircle, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

interface AppointmentCardProps {
    appointment?: {
        businessName: string;
        service: string;
        date: string;
        time: string;
        duration: string;
        price: string;
    };
    status: 'upcoming' | 'completed' | 'cancelled';
    isEmpty?: boolean;
}

const statusConfig = {
    upcoming: {
        color: 'bg-blue-50 text-blue-700 border-blue-200',
        icon: <Clock className="h-4 w-4" />,
        emptyIcon: <Calendar className="h-12 w-12 text-blue-200" />,
        title: "No upcoming appointments",
        description: "You don't have any upcoming appointments scheduled.",
        actionLabel: "Book an appointment"
    },
    completed: {
        color: 'bg-green-50 text-green-700 border-green-200',
        icon: <CheckCircle2 className="h-4 w-4" />,
        emptyIcon: <CheckCircle className="h-12 w-12 text-green-200" />,
        title: "No completed appointments",
        description: "You haven't completed any appointments yet.",
        actionLabel: "Book your first appointment"
    },
    cancelled: {
        color: 'bg-red-50 text-red-700 border-red-200',
        icon: <XCircle className="h-4 w-4" />,
        emptyIcon: <AlertCircle className="h-12 w-12 text-red-200" />,
        title: "No cancelled appointments",
        description: "You don't have any cancelled appointments.",
        actionLabel: null
    },
};

export function AppointmentCard({ appointment, status, isEmpty = false }: AppointmentCardProps) {
    if (isEmpty) {
        return (
            <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                    {statusConfig[status].emptyIcon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {statusConfig[status].title}
                </h3>
                <p className="text-gray-500 mb-6">
                    {statusConfig[status].description}
                </p>
                {statusConfig[status].actionLabel && (
                    <Button 
                        size="sm"
                        className="bg-gray-900 hover:bg-gray-800 text-white"
                    >
                        {statusConfig[status].actionLabel}
                    </Button>
                )}
            </div>
        );
    }

    if (!appointment) return null;

    return (
        <Card className="mb-4 hover:shadow-md transition-all duration-200 overflow-hidden group">
            <CardContent className="p-0 relative">
                {/* Status Banner */}
                <div className={`px-3 py-2 ${statusConfig[status].color} flex items-center space-x-2 absolute top-4 rounded-full right-4`}>
                    {statusConfig[status].icon}
                    <span className="font-medium text-sm">
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                </div>

                <div className="p-6">
                    {/* Business Info */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                {appointment.businessName}
                            </h3>
                            <div className="flex items-center space-x-4 mb-2">
                                <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                                    {appointment.service}
                                </Badge>
                                <Badge variant="outline" className="border-gray-200">
                                    {appointment.duration}
                                </Badge>
                                <span className="text-lg font-semibold text-gray-900">
                                    {appointment.price}
                                </span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <CalendarDays className="h-4 w-4 mr-2" />
                                <time className="text-sm">
                                    {new Date(appointment.date).toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })} at {appointment.time}
                                </time>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {status === 'upcoming' && (
                        <div className="flex justify-end space-x-3 mt-4">
                            <Button 
                                size="sm"
                                variant="outline" 
                                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                            >
                                Cancel
                            </Button>
                            <Button 
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                Reschedule
                            </Button>
                        </div>
                    )}

                    {status === 'completed' && (
                        <div className="flex justify-end mt-4">
                            <Button 
                                size="sm"
                                variant="outline" 
                                className="border-gray-200 hover:bg-gray-50"
                            >
                                Leave Review
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
} 