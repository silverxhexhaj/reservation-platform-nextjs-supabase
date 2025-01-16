import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  price: number;
  description?: string;
  duration?: number;
  isSelected: boolean;
  onToggle: () => void;
}

export function ServiceDetailsModal({
  isOpen,
  onClose,
  name,
  price,
  description,
  duration = 60,
  isSelected,
  onToggle
}: ServiceDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">{name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-8 py-6">
          {/* Price and Duration */}
          <div className="flex items-center justify-between border border-gray-200 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-900" />
              <span className="text-gray-900 font-medium">{duration} minutes</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm text-gray-500 line-through">${(price * 1.2).toFixed(2)}</span>
              <span className="text-2xl font-bold text-gray-900">${price}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-gray-900">About this service</h4>
            <p className="text-gray-700 leading-relaxed text-base">
              {description || 'Professional service tailored to your needs'}
            </p>
          </div>

          {/* What's included section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">What's included</h4>
            <div className="border border-gray-200 rounded-lg p-4">
              <ul className="space-y-3">
                <li className="flex items-center space-x-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-base">Professional consultation</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-base">Expert service delivery</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-base">Quality products used</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Button */}
          <Button 
            className={cn(
              "w-full py-6 text-base font-semibold rounded-lg transition duration-300 ease-in-out",
              isSelected 
                ? "bg-red-600 hover:bg-red-700 text-white" 
                : "bg-black hover:bg-gray-800 text-white"
            )}
            onClick={() => {
              onToggle();
              onClose();
            }}
          >
            {isSelected ? 'Remove from Booking' : 'Add to Booking'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 