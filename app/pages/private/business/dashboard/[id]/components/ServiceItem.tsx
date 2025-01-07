import { CheckCircle, PlusCircle } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";
import { ServiceDetailsModal } from "./ServiceDetailsModal";
import { cn } from "@/lib/utils";

interface ServiceItemProps {
  name: string;
  price: number;
  description?: string;
  duration?: number;
  isSelected: boolean;
  onToggle: () => void;
}

export function ServiceItem({ 
  name, 
  price, 
  description, 
  duration,
  isSelected, 
  onToggle 
}: ServiceItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          "group flex justify-between p-6 rounded-lg transition-all duration-300 cursor-pointer relative border-2",
          isSelected 
            ? "border-black bg-gray-50" 
            : "border-gray-100 hover:border-gray-300"
        )}
      >
        {/* Content Section - Clickable for Modal */}
        <div 
          className="flex-grow pr-28"
          onClick={() => setIsModalOpen(true)}
        >
          <h4 className="text-lg font-semibold mb-2 text-gray-800">{name}</h4>
          <p className="text-sm text-gray-600 line-clamp-2">
            {description || 'Professional service tailored to your needs'}
          </p>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-xl font-bold text-gray-900">${price}</span>
            {duration && (
              <span className="text-sm text-gray-600">
                {duration} min
              </span>
            )}
          </div>
        </div>

        {/* Select Button */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-10 px-6 rounded-full transition-all duration-200 font-medium",
              isSelected 
                ? "bg-black text-white hover:bg-gray-800" 
                : "border-2 border-gray-200 hover:border-gray-300"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            {isSelected ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Booked</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4 mr-2" />
                <span>Book</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <ServiceDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        name={name}
        price={price}
        description={description}
        duration={duration}
        isSelected={isSelected}
        onToggle={onToggle}
      />
    </>
  );
} 