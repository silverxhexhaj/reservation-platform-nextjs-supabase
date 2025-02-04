import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";
import { StaffPerformingService } from "@/app/models/functions/staffPerformingService.model";

interface SelectTeamProps {
  staff: StaffPerformingService[];
  selectedTeamMember: StaffPerformingService | null;
  setSelectedTeamMember: (member: StaffPerformingService | null) => void;
}

export function SelectTeam({
  staff,
  selectedTeamMember,
  setSelectedTeamMember,
}: SelectTeamProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="grid grid-cols-2 gap-4">
          <Button
            key="random"
            variant="outline"
            className={cn(
              "h-auto py-4",
              selectedTeamMember === null && "bg-black text-white hover:bg-gray-800"
            )}
            onClick={() => setSelectedTeamMember(null)}
          >
            Random
          </Button>
          {staff.map((member) => (
            <Button
              key={member.staff_id}
              variant="outline"
              className={cn(
                "h-auto py-4",
                selectedTeamMember?.staff_id === member.staff_id && "bg-black text-white hover:bg-gray-800"
              )}
              onClick={() => setSelectedTeamMember(member)}
            >
              {member.first_name} {member.last_name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
} 