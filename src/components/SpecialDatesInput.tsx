import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { X, CheckCircle, Check } from "lucide-react";
import type { SpecialDatesInputProps, SpecialDate } from "@/types/interfaces";

const SpecialDatesInput: React.FC<SpecialDatesInputProps> = ({ specialDates, setSpecialDates }) => {
  const [showPicker, setShowPicker] = React.useState<{ [id: number]: boolean }>({});

  const handleAdd = () => {
    setSpecialDates((prev) => [
      ...prev,
      { id: Date.now(), date: undefined, text: "", show: true, editing: true },
    ]);
  };

  const handleDelete = (id: number) => {
    setSpecialDates((prev) => prev.filter((d) => d.id !== id));
  };

  const handleChange = (id: number, field: keyof SpecialDate, value: any) => {
    setSpecialDates((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, [field]: value } : d
      )
    );
  };

  const handleSave = (id: number) => {
    setSpecialDates((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, editing: false } : d
      )
    );
  };

  const handleToggleShow = (id: number) => {
    setSpecialDates((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, show: !d.show } : d
      )
    );
  };

  return (
    <div className="w-full flex flex-col gap-4 p-2">
      <h3 className="text-lg font-bold text-primary mb-2">Special Dates</h3>
      <div className="flex flex-wrap gap-2">
        {specialDates.map((d) =>
          d.editing ? (
            <div key={d.id} className="w-full max-w-xl flex items-center justify-between gap-4 bg-muted/40 rounded-full px-4 py-2 shadow-sm">
              {/* Date Picker */}
              <div className="relative flex-shrink-0">
                <Button
                  variant="outline"
                  type="button"
                  className="w-28 justify-start h-8 px-2 text-xs"
                  onClick={() => setShowPicker((prev) => ({ ...prev, [d.id]: !prev[d.id] }))}
                >
                  {d.date ? d.date.toLocaleDateString() : "Pick a date"}
                </Button>
                {showPicker[d.id] && (
                  <div className="absolute z-10 mt-2 bg-popover rounded shadow p-2">
                    <Calendar
                      mode="single"
                      selected={d.date}
                      onSelect={(date) => {
                        handleChange(d.id, "date", date);
                        setShowPicker((prev) => ({ ...prev, [d.id]: false }));
                      }}
                    />
                  </div>
                )}
              </div>
              {/* Text Input */}
              <Input
                type="text"
                placeholder="Label"
                className="w-64 h-8 text-xs"
                value={d.text}
                onChange={(e) => handleChange(d.id, "text", e.target.value)}
              />
              {/* Show Checkbox */}
              <label className="flex items-center gap-1 cursor-pointer select-none text-xs">
                <input
                  type="checkbox"
                  checked={d.show}
                  onChange={(e) => handleChange(d.id, "show", e.target.checked)}
                  className="accent-primary"
                  style={{ width: 14, height: 14 }}
                />
                <span>Show</span>
              </label>
              {/* Save Button (now a checkmark icon) */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-green-600 hover:bg-green-100 h-8 w-8"
                onClick={() => handleSave(d.id)}
                aria-label="Save"
              >
                <Check className="w-4 h-4" />
              </Button>
              {/* Delete Button */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(d.id)}
                className="text-destructive hover:bg-destructive/10 h-8 w-8"
                aria-label="Delete"
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>
          ) : (
            <div key={d.id} className={`flex items-center gap-1 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 shadow-sm text-primary text-xs font-medium transition-all duration-150 ${d.show ? '' : 'opacity-50'}`}>
              <span className="mr-1">{d.date ? d.date.toLocaleDateString() : "No date"}</span>
              <span className="mr-1">{d.text || "No label"}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleToggleShow(d.id)}
                className={`p-0 h-6 w-6 ${d.show ? 'text-green-600' : 'text-gray-400'}`}
                aria-label="Toggle Enabled"
              >
                <CheckCircle fill={d.show ? 'currentColor' : 'none'} className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(d.id)}
                className="ml-1 text-destructive hover:bg-destructive/10 h-6 w-6"
                aria-label="Delete"
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>
          )
        )}
      </div>
      <Button
        type="button"
        variant="default"
        className="mt-2 self-start px-5 py-2 rounded-lg font-semibold shadow"
        onClick={handleAdd}
      >
        Add
      </Button>
    </div>
  );
};

export default SpecialDatesInput; 