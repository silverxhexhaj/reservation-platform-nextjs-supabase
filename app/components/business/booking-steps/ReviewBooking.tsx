import { X } from "lucide-react";
import { format } from 'date-fns';
import { Service } from "@/app/models/functions/businessDetails.model";
import { TimeSlot } from "@/app/models/functions/timeslot.model";
import { StaffPerformingService } from "@/app/models/functions/staffPerformingService.model";

interface ReviewBookingProps {
  selectedServices: Service[];
  removeFromBooking: (serviceName: string) => void;
  selectedDate: Date;
  selectedTime: TimeSlot | null;
  selectedTeamMember: StaffPerformingService | null;
  note: string;
  setNote: (note: string) => void;
}

export function ReviewBooking({
  selectedServices,
  removeFromBooking,
  selectedDate,
  selectedTime,
  selectedTeamMember,
  note,
  setNote,
}: ReviewBookingProps) {
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
                <span className="text-sm font-medium text-gray-800">${service.base_price}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <span className='text-gray-800 font-semibold'>Total:</span>
              <span className='text-gray-800 font-semibold'>
                ${selectedServices.reduce((total, service) => total + service.base_price, 0)}
              </span>
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
            <span className="font-medium">
              {selectedTime?.start_time.slice(0, -3)}
            </span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-600">Team Member</span>
            <span className="font-medium">
              {selectedTeamMember ? `${selectedTeamMember.first_name} ${selectedTeamMember.last_name}` : 'Random'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-base font-semibold text-gray-800 mb-4">Add a Note</h3>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-3 text-sm text-gray-700 border border-gray-200 rounded-lg focus:ring-black focus:border-black resize-none"
            rows={3}
            placeholder="Add any special requests or notes for your booking..."
          />
        </div>
      </div>
    </div>
  );
} 