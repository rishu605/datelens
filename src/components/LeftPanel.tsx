import React from "react";
import SelectableDaysInput from "@/components/SelectableDaysInput";
import SpecialDatesInput from "@/components/SpecialDatesInput";
import CalendarCard from "@/components/CalendarCard";

const LeftPanel: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 h-full w-full">
      <div style={{ flexBasis: '10%', flexGrow: 0, flexShrink: 0 }}>
        <SelectableDaysInput />
      </div>
      <div className="bg-card rounded-xl shadow-md border border-border p-6 flex items-center justify-center" style={{ flexBasis: '30%', flexGrow: 0, flexShrink: 0 }}>
        <SpecialDatesInput />
      </div>
      <div className="bg-card rounded-xl shadow-md border border-border p-6 flex-1 flex items-center justify-center" style={{ minHeight: 0 }}>
        <CalendarCard />
      </div>
    </div>
  );
};

export default LeftPanel; 