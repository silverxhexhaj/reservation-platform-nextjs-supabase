import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { format, isToday, isSameDay } from 'date-fns';
import { cn } from "@/lib/utils";
import { X, Clock, AlertCircle, ChevronDown, ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import { Service } from "@/data";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  selectedTeamMember: string;
  setSelectedTeamMember: (member: string) => void;
  selectedServices: any[];
  removeFromBooking: (serviceName: string) => void;
  availableDates: Date[];
  availableTimeSlots: string[];
  businessTeam: any[];
  totalPrice: number;
  bookingError: string | null;
  handleBooking: () => void;
  dateDragging: boolean;
  dateStartX: number;
  dateScrollLeft: number;
  handleDateMouseDown: (e: React.MouseEvent) => void;
  handleDateMouseLeave: () => void;
  handleDateMouseUp: () => void;
  handleDateMouseMove: (e: React.MouseEvent) => void;
  dateContainerRef: React.RefObject<HTMLDivElement>;
  services: Service[];
  categories: string[];
  addToBooking: (service: any, categoryName: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filteredServices: Service[];
}

const STEPS = {
  SERVICES: 0,
  DATE_TIME: 1,
  TEAM: 2,
  REVIEW: 3
};

export function BookingModal({
  isOpen,
  onClose,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  selectedTeamMember,
  setSelectedTeamMember,
  selectedServices,
  removeFromBooking,
  availableDates,
  availableTimeSlots,
  businessTeam,
  totalPrice,
  bookingError,
  handleBooking,
  dateDragging,
  dateStartX,
  dateScrollLeft,
  handleDateMouseDown,
  handleDateMouseLeave,
  handleDateMouseUp,
  handleDateMouseMove,
  dateContainerRef,
  services,
  categories,
  addToBooking,
  activeTab,
  setActiveTab,
  filteredServices,
}: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState(STEPS.SERVICES);
  const timeSlotContainerRef = useRef<HTMLDivElement>(null);

  const steps = [
    { id: STEPS.SERVICES, title: "Select Services" },
    { id: STEPS.DATE_TIME, title: "Choose Date & Time" },
    { id: STEPS.TEAM, title: "Choose Team Member" },
    { id: STEPS.REVIEW, title: "Review & Book" }
  ];

  const canProceed = () => {
    switch (currentStep) {
      case STEPS.SERVICES:
        return true; // Can proceed without selecting services
      case STEPS.DATE_TIME:
        return selectedDate && selectedTime;
      case STEPS.TEAM:
        return selectedTeamMember;
      case STEPS.REVIEW:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case STEPS.SERVICES:
        return (
          <div className="space-y-6">
            <div className="relative">
              <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide pb-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(category)}
                    className={cn(
                      "flex-none px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                      activeTab === category
                        ? "bg-black text-white"
                        : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {activeTab === 'Featured' ? (
                filteredServices.map((category, categoryIndex) =>
                  category.services.map((service, serviceIndex) => {
                    const isSelected = selectedServices.some(s => s.name === service.name);
                    return (
                      <div
                        key={`${categoryIndex}-${serviceIndex}`}
                        className={cn(
                          "p-4 rounded-lg border-2 transition-all duration-200",
                          isSelected
                            ? "border-black bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium text-gray-900">{service.name}</h3>
                            <p className="text-sm text-gray-500">{service.description}</p>
                            <p className="text-lg font-semibold mt-1">${service.price}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                              "rounded-full",
                              isSelected
                                ? "bg-black text-white hover:bg-gray-800 border-none"
                                : ""
                            )}
                            onClick={() => {
                              if (isSelected) {
                                removeFromBooking(service.name);
                              } else {
                                addToBooking(service, category.name);
                              }
                            }}
                          >
                            {isSelected ? "Selected" : "Select"}
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )
              ) : (
                filteredServices.flatMap(category =>
                  category.services.map(service => {
                    const isSelected = selectedServices.some(s => s.name === service.name);
                    return (
                      <div
                        key={service.name}
                        className={cn(
                          "p-4 rounded-lg border-2 transition-all duration-200",
                          isSelected
                            ? "border-black bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium text-gray-900">{service.name}</h3>
                            <p className="text-sm text-gray-500">{service.description}</p>
                            <p className="text-lg font-semibold mt-1">${service.price}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                              "rounded-full",
                              isSelected
                                ? "bg-black text-white hover:bg-gray-800 border-none"
                                : ""
                            )}
                            onClick={() => {
                              if (isSelected) {
                                removeFromBooking(service.name);
                              } else {
                                addToBooking(service, category.name);
                              }
                            }}
                          >
                            {isSelected ? "Selected" : "Select"}
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )
              )}
            </div>
          </div>
        );

      case STEPS.DATE_TIME:
        return (
          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <Label className="text-gray-700">Select Date</Label>
              <div
                ref={dateContainerRef}
                className={cn(
                  "overflow-x-scroll scrollbar-hide cursor-grab active:cursor-grabbing rounded-md",
                  dateDragging && "select-none"
                )}
                onMouseDown={handleDateMouseDown}
                onMouseLeave={handleDateMouseLeave}
                onMouseUp={handleDateMouseUp}
                onMouseMove={handleDateMouseMove}
              >
                <div className="flex space-x-2 w-max">
                  {availableDates.map((date) => (
                    <Button
                      key={date.toISOString()}
                      variant="outline"
                      className={cn(
                        "flex-none px-4 py-6 flex flex-col items-center gap-1 select-none min-w-[100px] h-auto",
                        isSameDay(selectedDate, date) && "bg-black text-white hover:bg-gray-800",
                        isToday(date) && "border-black",
                      )}
                      onClick={() => !dateDragging && setSelectedDate(date)}
                    >
                      <span className="text-xs font-medium">
                        {format(date, 'EEE')}
                      </span>
                      <span className="text-lg">
                        {format(date, 'd')}
                      </span>
                      <span className="text-xs">
                        {format(date, 'MMM')}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <Label className="text-gray-700">Select Time</Label>
              <div
                ref={timeSlotContainerRef}
                className="overflow-x-scroll scrollbar-hide rounded-md"
              >
                <div className="flex flex-wrap gap-2">
                  {availableTimeSlots.length > 0 ? (
                    availableTimeSlots.map((time) => (
                      <Button
                        key={time}
                        variant="outline"
                        className={cn(
                          "flex-none px-4 select-none",
                          selectedTime === time && "bg-black text-white hover:bg-gray-800"
                        )}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      No available time slots for this date
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case STEPS.TEAM:
        return (
          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <Label className="text-gray-700">Select Team Member</Label>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  key="random"
                  variant="outline"
                  className={cn(
                    "h-auto py-4",
                    selectedTeamMember === 'Random' && "bg-black text-white hover:bg-gray-800"
                  )}
                  onClick={() => setSelectedTeamMember('Random')}
                >
                  Random
                </Button>
                {businessTeam.map((member) => (
                  <Button
                    key={member.name}
                    variant="outline"
                    className={cn(
                      "h-auto py-4",
                      selectedTeamMember === member.name && "bg-black text-white hover:bg-gray-800"
                    )}
                    onClick={() => setSelectedTeamMember(member.name)}
                  >
                    {member.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case STEPS.REVIEW:
        return (
          <div className="space-y-6">
            {selectedServices.length > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="text-base font-semibold text-gray-800 mb-4">Selected Services</h3>
                <div className="space-y-3">
                  {selectedServices.map((service, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className='flex items-center space-x-2'>
                        <button
                          onClick={() => removeFromBooking(service.name)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                        <span className="text-sm text-gray-600">{service.name}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-800">${service.price}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <span className='text-gray-800 font-semibold'>Total:</span>
                    <span className='text-gray-800 font-semibold'>${totalPrice}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium">{format(selectedDate, 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-600">Time</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-600">Team Member</span>
                  <span className="font-medium">{selectedTeamMember}</span>
                </div>
              </div>
            </div>
          </div>
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

              {bookingError && (
                <div className="bg-red-50 border border-red-200 text-red-400 px-4 py-3 rounded relative mt-6" role="alert">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    <span>{bookingError}</span>
                  </div>
                </div>
              )}
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
                    handleBooking();
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