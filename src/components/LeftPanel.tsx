import React from "react";
import SelectableDaysInput from "@/components/SelectableDaysInput";
import SpecialDatesInput from "@/components/SpecialDatesInput";
import CalendarCard from "@/components/CalendarCard";
import type { DateRange } from "@/components/Container";

interface LeftPanelProps {
  selectedRange: DateRange;
  onSelectedRangeChange: (range: DateRange) => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ selectedRange, onSelectedRangeChange }) => {
  const [selectableDays, setSelectableDays] = React.useState<number>(7);

  // Convert selectedRange to selectedDates array for CalendarCard
  let selectedDates: Date[] = [];
  if (selectedRange.from && selectedRange.to) {
    const arr = [];
    let current = new Date(selectedRange.from);
    while (current <= selectedRange.to) {
      arr.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    selectedDates = arr;
  } else if (selectedRange.from) {
    selectedDates = [selectedRange.from];
  }

  const handleCalendarChange = (dates: Date[]) => {
    if (dates.length === 0) {
      onSelectedRangeChange({ from: null, to: null });
    } else if (dates.length === 1) {
      onSelectedRangeChange({ from: dates[0], to: dates[0] });
    } else {
      onSelectedRangeChange({ from: dates[0], to: dates[dates.length - 1] });
    }
  };

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
          onSelectedDatesChange={handleCalendarChange}
          selectedCount={selectedDates.length}
        />
      </div>
    </div>
  );
};

export default LeftPanel; 