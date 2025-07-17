import React from "react";

const SelectableDaysInput: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2">
      <label htmlFor="selectable-days" className="text-sm font-medium">Number of selectable days</label>
      <input
        id="selectable-days"
        type="number"
        min={1}
        className="w-24 rounded-md border border-border px-3 py-1.5 text-center text-base focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="e.g. 3"
      />
    </div>
  );
};

export default SelectableDaysInput; 