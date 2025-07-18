// Centralized TypeScript interfaces for DateLens app

// Date range and special date types
export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export interface SpecialDate {
  id: number;
  date: Date | undefined;
  text: string;
  show: boolean;
  editing?: boolean;
}

// Data table types
export interface DataRow {
  id: string;
  name: string;
  date: string;
  amount: string;
  status: "pending" | "completed" | "cancelled" | "processing";
}

export interface SearchFilters {
  name: string;
  date: string;
  amountMin: string;
  amountMax: string;
  status: string;
}

export interface SortConfig {
  key: keyof DataRow;
  direction: 'asc' | 'desc';
}

export interface DataTableProps {
  data: DataRow[];
  selectedRange?: DateRange;
  scrollTableOnly?: boolean;
}

// Table search
export interface TableSearchProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onClearFilters: () => void;
}

// Calendar card
export interface CalendarCardProps {
  selectableDays: number;
  selectedDates: Date[];
  onSelectedDatesChange: (dates: Date[]) => void;
  selectedCount: number;
  specialDates?: Date[];
}

// Left panel
export interface LeftPanelProps {
  selectedRange: DateRange;
  onSelectedRangeChange: (range: DateRange) => void;
  specialDates: SpecialDate[];
  setSpecialDates: React.Dispatch<React.SetStateAction<SpecialDate[]>>;
}

// Right panel
export interface RightPanelProps {
  selectedRange: DateRange;
}

// Special dates input
export interface SpecialDatesInputProps {
  specialDates: SpecialDate[];
  setSpecialDates: React.Dispatch<React.SetStateAction<SpecialDate[]>>;
}

// Selectable days input
export interface SelectableDaysInputProps {
  value: number;
  onChange: (value: number) => void;
}

// UI input
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// UI label
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {} 