import React from "react";

const SpecialDatesInput: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2">
      <label htmlFor="special-dates" className="text-sm font-medium">Special Dates</label>
      <input
        id="special-dates"
        type="text"
        className="w-48 rounded-md border border-border px-3 py-1.5 text-center text-base focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="e.g. 2024-07-01, 2024-07-04"
      />
    </div>
  );
};

export default SpecialDatesInput; 