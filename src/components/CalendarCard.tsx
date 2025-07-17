import React from "react";
import { Calendar } from "@/components/ui/calendar";

const CalendarCard: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 h-full">
      <h3 className="text-base font-semibold mb-2">Calendar</h3>
      <div className="w-full flex-1 flex items-center justify-center">
        <Calendar />
      </div>
    </div>
  );
};

export default CalendarCard; 