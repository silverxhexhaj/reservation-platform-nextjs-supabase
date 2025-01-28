import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { SubCategory } from "@/app/models/supabase.models";
import { TimeSlot } from "@/app/models/functions/timeslot.model";
import { Service } from "@/app/models/functions/businessDetails.model";
import { fetchStaffThatPerformsService } from "@/app/service/staff/staff.service";
import { StaffPerformingService } from "@/app/models/functions/staffPerformingService.model";
import { getAvailableDatesToBook, getAvailableTimeSlotsForGivenDate } from "@/app/service/booking/booking.service";
import { SelectServices } from "./booking-steps/SelectServices";
import { SelectTeam } from "./booking-steps/SelectTeam";
import { SelectDateTime } from "./booking-steps/SelectDateTime";
import { ReviewBooking } from "./booking-steps/ReviewBooking";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServices: Service[];
  removeFromBooking: (serviceName: string) => void;
  subCategories: SubCategory[];
  addToBooking: (service: Service, categoryName: string) => void;
  businessId: string;
}

const STEPS = { SERVICES: 0, TEAM: 1, DATE_TIME: 2, REVIEW: 3 };

export function BookingModal({
  isOpen,
  onClose,
  selectedServices,
  removeFromBooking,
  subCategories,
  addToBooking,
  businessId
}: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState(STEPS.SERVICES);
  const [staff, setStaff] = useState<StaffPerformingService[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTeamMember, setSelectedTeamMember] = useState<StaffPerformingService | null>(null);


  useEffect(() => {
    const fetchAvailableDates = async () => {
      const staffId = selectedTeamMember ? selectedTeamMember.staff_id : null;
      const availableDates = await getAvailableDatesToBook(businessId, staffId, selectedServices.map(service => service.id));
      setAvailableDates(availableDates);
    }

    const fetchStaff = async () => {
      const staff = await fetchStaffThatPerformsService(businessId, selectedServices.map(service => service.id));
      setStaff(staff);
    }

    fetchStaff();
    fetchAvailableDates();
  }, [selectedTeamMember, selectedServices]);

  useEffect(() => {
    const fetchAvailableTimeSlots = async () => {
      const availableTimeSlots = await getAvailableTimeSlotsForGivenDate(businessId, selectedDate);
      setAvailableTimeSlots(availableTimeSlots);
    }
    if (selectedDate) {
      fetchAvailableTimeSlots();
    }
  }, [selectedDate]);

  const steps = [
    { id: STEPS.SERVICES, title: "Select Services" },
    { id: STEPS.TEAM, title: "Choose Team Member" },
    { id: STEPS.DATE_TIME, title: "Choose Date & Time" },
    { id: STEPS.REVIEW, title: "Review & Book" }
  ];

  const canProceed = () => {
    switch (currentStep) {
      case STEPS.SERVICES:
        return true;
      case STEPS.TEAM:
        return true;
      case STEPS.DATE_TIME:
        return selectedDate && selectedTime;
      case STEPS.REVIEW:
        return selectedServices.length > 0 && selectedDate && selectedTime;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case STEPS.SERVICES:
        return (
          <SelectServices
            selectedServices={selectedServices}
            removeFromBooking={removeFromBooking}
            subCategories={subCategories}
            addToBooking={addToBooking}
          />
        );
      case STEPS.TEAM:
        return (
          <SelectTeam
            staff={staff}
            selectedTeamMember={selectedTeamMember}
            setSelectedTeamMember={setSelectedTeamMember}
          />
        );
      case STEPS.DATE_TIME:
        return (
          <SelectDateTime
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            availableDates={availableDates}
            availableTimeSlots={availableTimeSlots}
          />
        );
      case STEPS.REVIEW:
        return (
          <ReviewBooking
            selectedServices={selectedServices}
            removeFromBooking={removeFromBooking}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedTeamMember={selectedTeamMember}
          />
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-screen h-screen max-w-[100vw] max-h-[100vh] p-0 m-0 rounded-none border-0 bg-white">
        <div className="h-full flex flex-col items-center bg-white">
          <div className="w-full max-w-2xl h-full flex flex-col">
            <DialogHeader className="p-6 border-b">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {steps[currentStep].title}
                </DialogTitle>
                <div className="text-sm text-gray-500">
                  Step {currentStep + 1} of {steps.length}
                </div>
              </div>
              <div className="flex justify-between mt-4">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={cn(
                      "flex-1 h-2 rounded-full mx-1",
                      index <= currentStep ? "bg-black" : "bg-gray-200"
                    )}
                  />
                ))}
              </div>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-6">
              {renderStepContent()}
            </div>

            <div className="flex justify-between p-6 border-t bg-white">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={currentStep === 0}
                className={cn(
                  "px-6",
                  currentStep === 0 && "opacity-0 pointer-events-none"
                )}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <Button
                onClick={() => {
                  if (currentStep === steps.length - 1) {
                    // handleBooking();
                  } else {
                    setCurrentStep(currentStep + 1);
                  }
                }}
                disabled={!canProceed()}
                className="px-6 bg-black hover:bg-gray-800 text-white"
              >
                {currentStep === steps.length - 1 ? (
                  'Confirm Booking'
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 