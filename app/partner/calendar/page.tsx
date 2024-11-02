'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

type CalendarView = 'month' | 'week' | 'day';

interface Appointment {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [appointmentTitle, setAppointmentTitle] = useState("");
  const [calendarView, setCalendarView] = useState<CalendarView>('month');
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Team Meeting',
      date: new Date(2023, 5, 15), // June 15, 2023
      startTime: '10:00',
      endTime: '11:00'
    },
    {
      id: '2',
      title: 'Client Call',
      date: new Date(2023, 5, 16), // June 16, 2023
      startTime: '14:00',
      endTime: '15:00'
    }
  ]);

  const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minute = (i % 4) * 15;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  });

  const changeDate = (increment: number) => {
    const newDate = new Date(selectedDate);
    switch (calendarView) {
      case 'month':
        newDate.setMonth(newDate.getMonth() + increment);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + increment * 7);
        break;
      case 'day':
        newDate.setDate(newDate.getDate() + increment);
        break;
    }
    setSelectedDate(newDate);
  };

  const handleAddAppointment = () => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      title: appointmentTitle,
      date: selectedDate,
      startTime,
      endTime
    };
    setAppointments([...appointments, newAppointment]);
    setAppointmentTitle("");
  };

  const renderMonthView = () => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

    return (
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-bold text-gray-700 py-2">{day}</div>
        ))}
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i + 1);
          const isSelected = date.toDateString() === selectedDate.toDateString();
          const isToday = date.toDateString() === new Date().toDateString();
          const dayAppointments = appointments.filter(
            app => app.date.toDateString() === date.toDateString()
          );
          
          return (
            <div key={i} className="relative h-24 border border-gray-200 p-1">
              <Button
                variant={isSelected ? "default" : isToday ? "secondary" : "ghost"}
                className={`absolute top-1 left-1 w-6 h-6 p-0 text-xs ${
                  isSelected 
                    ? 'bg-blue-600 text-white' 
                    : isToday 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'text-gray-700'
                }`}
                onClick={() => setSelectedDate(date)}
              >
                {i + 1}
              </Button>
              <div className="mt-6 space-y-1">
                {dayAppointments.slice(0, 2).map(app => (
                  <div key={app.id} className="text-xs bg-blue-50 p-1 rounded truncate text-gray-800">
                    {app.title}
                  </div>
                ))}
                {dayAppointments.length > 2 && (
                  <div className="text-xs text-gray-500">
                    +{dayAppointments.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
    
    return (
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
          const currentDate = new Date(startOfWeek);
          currentDate.setDate(startOfWeek.getDate() + index);
          const isSelected = currentDate.toDateString() === selectedDate.toDateString();
          const isToday = currentDate.toDateString() === new Date().toDateString();
          const dayAppointments = appointments.filter(
            app => app.date.toDateString() === currentDate.toDateString()
          );

          return (
            <div key={day} className="space-y-2">
              <div className="text-center font-bold text-gray-700">{day}</div>
              <Button
                variant={isSelected ? "default" : isToday ? "secondary" : "outline"}
                className={`w-full ${
                  isSelected 
                    ? 'bg-blue-600 text-white' 
                    : isToday 
                      ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
                      : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedDate(currentDate)}
              >
                {currentDate.getDate()}
              </Button>
              <div className="space-y-1">
                {dayAppointments.map(app => (
                  <div key={app.id} className="text-xs bg-blue-50 p-2 rounded">
                    <div className="font-semibold truncat text-gray-800">{app.title}</div>
                    <div className="text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {app.startTime} - {app.endTime}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const dayAppointments = appointments.filter(
      app => app.date.toDateString() === selectedDate.toDateString()
    );
    
    return (
      <div className="space-y-1">
        {hours.map((hour) => {
          const hourAppointments = dayAppointments.filter(app => 
            parseInt(app.startTime.split(':')[0]) === hour
          );
          
          return (
            <div key={hour} className="flex items-start">
              <div className="w-16 text-right pr-2 text-gray-600 text-sm">
                {hour.toString().padStart(2, '0')}:00
              </div>
              <div className="flex-grow min-h-[3rem] border-t border-gray-200">
                {hourAppointments.map(app => (
                  <div key={app.id} className="text-sm bg-blue-50 p-2 rounded mb-1">
                    <div className="font-semibold text-gray-800">{app.title}</div>
                    <div className="text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {app.startTime} - {app.endTime}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderCalendarContent = () => {
    switch (calendarView) {
      case 'month':
        return renderMonthView();
      case 'week':
        return renderWeekView();
      case 'day':
        return renderDayView();
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border border-gray-200 lg:col-span-2">
          <CardHeader className="bg-gray-100 flex flex-row items-center justify-between">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => changeDate(-1)}
              className="text-gray-700 border-gray-400 hover:bg-gray-200 hover:text-gray-900"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-4">
              <Select value={calendarView} onValueChange={(value: CalendarView) => setCalendarView(value)}>
                <SelectTrigger className="w-[120px] text-gray-800">
                  <SelectValue placeholder="Select view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="day">Day</SelectItem>
                </SelectContent>
              </Select>
              <CardTitle className="tracking-tight text-lg font-semibold text-gray-800">
                {selectedDate.toLocaleString('default', { 
                  month: 'long', 
                  year: 'numeric',
                  ...(calendarView === 'day' && { day: 'numeric' }),
                  ...(calendarView === 'week' && { day: 'numeric' })
                })}
              </CardTitle>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => changeDate(1)}
              className="text-gray-700 border-gray-400 hover:bg-gray-200 hover:text-gray-900"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-4 overflow-auto max-h-[calc(100vh-200px)]">
            {renderCalendarContent()}
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardHeader className="bg-gray-100">
            <CardTitle className="text-gray-800 text-lg font-semibold">Add Appointment</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <form onSubmit={(e) => { e.preventDefault(); handleAddAppointment(); }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="appointment-title" className="text-gray-700">Appointment Title</Label>
                <Input
                  id="appointment-title"
                  value={appointmentTitle}
                  onChange={(e) => setAppointmentTitle(e.target.value)}
                  placeholder="Enter appointment title"
                  className="border-gray-300 text-gray-800"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">Date</Label>
                <Input
                  value={selectedDate.toLocaleDateString()}
                  readOnly
                  className="border-gray-300 text-gray-800 bg-gray-50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-time" className="text-gray-700">Start Time</Label>
                  <Select value={startTime} onValueChange={setStartTime}>
                    <SelectTrigger id="start-time" className="border-gray-300 text-gray-800 bg-white">
                      <SelectValue placeholder="Select start time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-time" className="text-gray-700">End Time</Label>
                  <Select value={endTime} onValueChange={setEndTime}>
                    <SelectTrigger id="end-time" className="border-gray-300 text-gray-800 bg-white">
                      <SelectValue placeholder="Select end time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Add Appointment
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}