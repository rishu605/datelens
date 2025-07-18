import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { SelectableDaysInputProps } from "@/types/interfaces";

const SelectableDaysInput: React.FC<SelectableDaysInputProps> = ({ value, onChange }) => {
  return (
    <form className="flex flex-row items-center justify-between w-full px-4 py-2 bg-muted/40 rounded-lg shadow-sm">
      <Label htmlFor="selectable-days" className="text-base font-semibold tracking-tight text-primary">Number of selectable days</Label>
      <Input
        id="selectable-days"
        type="number"
        min={1}
        className="w-40 text-center bg-background rounded-md shadow focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-150 hover:border-primary outline-none border-0"
        placeholder="e.g. 3"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
    </form>
  );
};

export default SelectableDaysInput; 