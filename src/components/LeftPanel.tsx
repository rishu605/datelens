import React, { useState } from "react";
import SelectableDaysInput from "@/components/SelectableDaysInput";
import SpecialDatesInput from "@/components/SpecialDatesInput";
import CalendarCard from "@/components/CalendarCard";

const LeftPanel: React.FC = () => {
  const [selectableDays, setSelectableDays] = useState<number>(7);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  return (
    <div className="flex flex-col gap-6 h-full w-full overflow-auto">
      <div style={{ flexBasis: '10%', flexGrow: 0, flexShrink: 0 }}>
        <SelectableDaysInput value={selectableDays} onChange={setSelectableDays} />
      </div>
      <div className="bg-card rounded-xl shadow-md border border-border p-6 flex items-center justify-center" style={{ flexBasis: '20%', flexGrow: 0, flexShrink: 0 }}>
        <SpecialDatesInput />
      </div>
      <div className="flex-1 flex h-full">
        <CalendarCard
          selectableDays={selectableDays}
          selectedDates={selectedDates}
          onSelectedDatesChange={setSelectedDates}
          selectedCount={selectedDates.length}
        />
      </div>
    </div>
  );
};

export default LeftPanel; 