import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";
import { Service } from "@/app/models/functions/businessDetails.model";
import { SubCategory } from "@/app/models/supabase.models";

interface SelectServicesProps {
  selectedServices: Service[];
  removeFromBooking: (serviceName: string) => void;
  subCategories: SubCategory[];
  addToBooking: (service: Service, categoryName: string) => void;
}

export function SelectServices({
  selectedServices,
  removeFromBooking,
  subCategories,
  addToBooking,
}: SelectServicesProps) {
  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide pb-2">
          {subCategories?.map((subCategory, index) => (
            <button
              key={index}
              className="flex-none px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            >
              {subCategory.display_name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {selectedServices.map(service => {
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
                  <p className="text-lg font-semibold mt-1">${service.base_price}</p>
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
                      addToBooking(service, "");
                    }
                  }}
                >
                  {isSelected ? "Selected" : "Select"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 