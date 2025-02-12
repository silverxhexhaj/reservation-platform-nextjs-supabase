"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Heading } from "@/app/components/ui/heading";
import { Separator } from "@/app/components/ui/separator";
import { Button } from "@/app/components/ui/button";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/core';
import styles from './calendar.module.css';

type CalendarView = "timeGridDay" | "timeGridWeek" | "dayGridMonth" | "listWeek";

// Sample events
const initialEvents: EventInput[] = [
  {
    title: 'Meeting with Client',
    start: new Date().setHours(10, 0),
    end: new Date().setHours(11, 30),
  },
  {
    title: 'Haircut Appointment',
    start: new Date().setHours(14, 0),
    end: new Date().setHours(15, 0),
  },
];

export default function PartnerCalendarBeta() {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarView>("timeGridDay");
  const [events, setEvents] = useState<EventInput[]>(initialEvents);

  const handleViewChange = (newView: CalendarView) => {
    setView(newView);
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(newView);
    }
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt('Please enter a title for the event:');
    if (title) {
      const newEvent: EventInput = {
        title,
        start: selectInfo.start,
        end: selectInfo.end,
        allDay: selectInfo.allDay,
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm('Would you like to delete this event?')) {
      setEvents(events.filter(event => event !== clickInfo.event.toPlainObject()));
    }
  };

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title="Partner Calendar Beta"
          description="Experimental calendar view for managing partner appointments"
        />
        <Separator />
        
        <div className="">
          <Card className="col-span-1 relative">
            <CardHeader className="flex items-center justify-between absolute top-2 right-0">
              <div className="flex items-center space-x-2">
                <Button 
                  variant={view === "timeGridDay" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleViewChange("timeGridDay")}
                  className="text-xs"
                >
                  Day
                </Button>
                <Button 
                  variant={view === "timeGridWeek" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleViewChange("timeGridWeek")}
                  className="text-xs"
                >
                  Week
                </Button>
                <Button
                  variant={view === "dayGridMonth" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleViewChange("dayGridMonth")}
                  className="text-xs"
                >
                  Month
                </Button>
                <Button
                  variant={view === "listWeek" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleViewChange("listWeek")}
                  className="text-xs"
                >
                  List
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-8">
              <div className={`h-[800px] ${styles.calendar}`}>
                <FullCalendar
                  ref={calendarRef}
                  plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: '',
                  }}
                  initialView={view}
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  weekends={true}
                  events={events}
                  select={handleDateSelect}
                  eventClick={handleEventClick}
                  slotMinTime="09:00:00"
                  slotMaxTime="21:00:00"
                  allDaySlot={false}
                  slotDuration="00:15:00"
                  slotLabelInterval="01:00"
                  expandRows={true}
                  stickyHeaderDates={true}
                  nowIndicator={true}
                  height="100%"
                  dayHeaderFormat={{ weekday: 'long' }}
                  views={{
                    timeGridDay: {
                      titleFormat: { year: 'numeric', month: 'long', day: 'numeric' }
                    },
                    timeGridWeek: {
                      titleFormat: { year: 'numeric', month: 'long' }
                    },
                    dayGridMonth: {
                      titleFormat: { year: 'numeric', month: 'long' }
                    },
                    listWeek: {
                      titleFormat: { year: 'numeric', month: 'long' },
                      noEventsContent: 'No events to display',
                      eventTimeFormat: {
                        hour: '2-digit',
                        minute: '2-digit',
                        meridiem: false,
                        hour12: false
                      }
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 