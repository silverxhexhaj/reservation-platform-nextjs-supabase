interface TimeSlotProps {
  time: string;
  isBooked: boolean;
  onClick?: () => void;
}

export function TimeSlot({ time, isBooked, onClick }: TimeSlotProps) {
  return (
    <button
      className={`w-full p-2 text-sm rounded-md transition-colors ${
        isBooked 
          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
          : 'bg-white hover:bg-gray-50 text-gray-900'
      }`}
      onClick={onClick}
      disabled={isBooked}
    >
      {time}
    </button>
  );
} 