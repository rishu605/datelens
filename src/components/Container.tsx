import React, { useState } from "react";
import LeftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

function getDefaultRange() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const to = new Date(today);
  to.setDate(today.getDate() + 6); // next 7 days: today and 6 days after
  return { from: today, to };
}

const Container: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<DateRange>(getDefaultRange());

  return (
    <div className="flex flex-col min-h-screen h-screen bg-gradient-to-br from-background via-muted/40 to-background/80 overflow-hidden">
      <div className="flex-1 flex items-stretch justify-center min-h-0 px-4 py-6 md:px-8 md:py-10">
        <div className="flex w-full gap-8 max-w-7xl mx-auto h-full min-h-0">
          <div className="w-1/2 h-full flex flex-col overflow-auto min-h-0">
            <LeftPanel selectedRange={selectedRange} onSelectedRangeChange={setSelectedRange} />
          </div>
          <div className="w-1/2 h-full flex flex-col overflow-auto min-h-0">
            <RightPanel selectedRange={selectedRange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container; 