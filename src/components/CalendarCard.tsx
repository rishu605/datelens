import React, { useState, useRef } from "react";
import { Calendar } from "@/components/ui/calendar";

const TIME_ZONES = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Kolkata",
  "Asia/Tokyo",
  "Australia/Sydney",
  "America/Chicago",
];

function getTimeZoneOffsetString(timeZone: string) {
  const now = new Date();
  const tzString = now.toLocaleString('en-US', { timeZone, timeZoneName: 'short' });
  const match = tzString.match(/GMT([+-]\d{1,2}:?\d{2})?/);
  if (match) {
    return match[0];
  }
  // Fallback: calculate offset manually
  const offset = -now.getTimezoneOffset();
  const sign = offset >= 0 ? '+' : '-';
  const absOffset = Math.abs(offset);
  const hours = String(Math.floor(absOffset / 60)).padStart(2, '0');
  const minutes = String(absOffset % 60).padStart(2, '0');
  return `GMT${sign}${hours}:${minutes}`;
}

interface CalendarCardProps {
  selectableDays: number;
  selectedDates: Date[];
  onSelectedDatesChange: (dates: Date[]) => void;
  selectedCount: number;
}

function getDateArray(from: Date, to: Date): Date[] {
  const arr = [];
  let current = new Date(from);
  while (current <= to) {
    arr.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return arr;
}

function formatDateInTimeZone(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone,
  }).format(date);
}

const CalendarCard: React.FC<CalendarCardProps> = ({ selectableDays, selectedDates, onSelectedDatesChange, selectedCount }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [timeZone, setTimeZone] = useState<string>(TIME_ZONES[0]);
  const tooltipTimeout = useRef<NodeJS.Timeout | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 90);
  maxDate.setHours(0, 0, 0, 0);

  const handleSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (!range || !range.from) {
      onSelectedDatesChange([]);
      return;
    }
    const from = range.from;
    const to = range.to ?? range.from;
    const days = Math.abs((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    if (days > selectableDays || to > maxDate) {
      setShowTooltip(true);
      if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
      tooltipTimeout.current = setTimeout(() => setShowTooltip(false), 2000);
      // Keep only the from date selected
      onSelectedDatesChange([from]);
      return;
    }
    onSelectedDatesChange(getDateArray(from, to));
  };

  // For display, show the range as { from, to }
  let from: Date | undefined = undefined;
  let to: Date | undefined = undefined;
  if (selectedDates.length > 0) {
    from = selectedDates[0];
    to = selectedDates.length > 1 ? selectedDates[selectedDates.length - 1] : selectedDates[0];
  }
  const selectedRange = from && to ? { from, to } : undefined;
  const gmtString = getTimeZoneOffsetString(timeZone);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative gap-2 bg-card rounded-xl shadow-md border border-border p-6">
      <div className="w-full flex flex-col items-center mb-2">
        <label htmlFor="timezone-select" className="text-xs font-medium text-muted-foreground mb-1">Time Zone</label>
        <select
          id="timezone-select"
          className="rounded-md border border-border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full max-w-xs text-center"
          value={timeZone}
          onChange={e => setTimeZone(e.target.value)}
        >
          {TIME_ZONES.map(tz => (
            <option key={tz} value={tz}>
              {tz} ({getTimeZoneOffsetString(tz)})
            </option>
          ))}
        </select>
      </div>
      {/* Reserve space for error message to avoid layout shift */}
      <div className="w-full flex justify-center mb-2" style={{ minHeight: 32 }}>
        {showTooltip && (
          <div className="bg-destructive text-white text-xs rounded px-3 py-1 shadow animate-fade-in">
            Max allowed selectable days is {selectableDays} and you cannot select dates more than 90 days from today
          </div>
        )}
      </div>
      <Calendar
        mode="range"
        selected={selectedRange}
        onSelect={handleSelect}
        fromDate={today}
        toDate={maxDate}
        disabled={{ before: today, after: maxDate }}
        className="p-4 mx-auto"
      />
      {selectedRange && (
        <div className="mt-3 text-xs text-muted-foreground font-medium text-center w-full">
          Selected: {formatDateInTimeZone(from!, timeZone)}
          {to && to.getTime() !== from!.getTime() && ` - ${formatDateInTimeZone(to, timeZone)}`}
          {` (${timeZone}, ${gmtString}) `}
          <span className="ml-2">[{selectedCount} day{selectedCount !== 1 ? 's' : ''}]</span>
        </div>
      )}
    </div>
  );
};

export default CalendarCard; 