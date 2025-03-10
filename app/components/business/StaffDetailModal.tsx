import { Dialog, DialogContent } from "@/app/components/ui/dialog";
import { Badge } from "@/app/components/ui/badge";
import { Calendar, Clock, Award, Star, Briefcase } from "lucide-react";
import { Staff } from "@/app/models/functions/businessDetails.model";


interface StaffDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: Staff;
}

export function StaffDetailModal({ isOpen, onClose, staff }: StaffDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white p-0 overflow-hidden">
        {/* Header with gradient background */}
        <div className={`bg-gradient-to-r p-6 text-white`}>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl font-bold">
                {staff.profile.first_name[0] + staff.profile.last_name[0]}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{staff.profile.first_name + ' ' + staff.profile.last_name}</h2>
              <p className="text-lg opacity-90">{staff.position}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 bg-white">
          {/* Bio Section */}
          <div>
            <p className="text-gray-600 leading-relaxed">{`${staff.profile.first_name} ${staff.profile.last_name} is a highly skilled ${staff.position.toLowerCase()} with years of experience in the industry`}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 bg-gray-50/50 p-3 rounded-lg">
              <Briefcase className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">{staff.profile.years_of_experience}+ Years Experience</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-50/50 p-3 rounded-lg">
              <Star className="w-5 h-5 text-yellow-400" />
              {/* TODO <span className="text-gray-700">{staff.rating} Rating</span> */}
            </div>
            <div className="flex items-center space-x-2 bg-gray-50/50 p-3 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-500" />
              {/* TODO <span className="text-gray-700">{staff.availability.days.join(", ")}</span> */}
            </div>
            <div className="flex items-center space-x-2 bg-gray-50/50 p-3 rounded-lg">
              <Clock className="w-5 h-5 text-gray-500" />
              {/*  TODO  <span className="text-gray-700">{defaultStaff.availability.hours}</span> */}
            </div>
          </div>

          {/* Specialties */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
              <Award className="w-5 h-5 mr-2 text-gray-600" />
              Specialties
            </h3>
            <div className="flex flex-wrap gap-2">
              {staff?.profile?.specialties?.map((specialty, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Services</h3>
            <div className="space-y-2">
              {staff?.services?.map((service, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <span className="font-medium text-gray-700">{service.name}</span>
                  <span className="text-gray-500">{service.duration} min</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 