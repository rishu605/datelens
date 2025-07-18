import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SearchFilters, TableSearchProps } from "@/types/interfaces";

const TableSearch: React.FC<TableSearchProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
}) => {
  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value,
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== "");

  return (
    <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Search & Filter</h3>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="text-xs"
          >
            Clear All
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        {/* First Row: Name and Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name Search */}
          <div className="space-y-2">
            <Label htmlFor="name-search" className="text-sm font-medium">
              Name
            </Label>
            <Input
              id="name-search"
              placeholder="Search by name..."
              value={filters.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="h-9"
            />
          </div>

          {/* Date Search */}
          <div className="space-y-2">
            <Label htmlFor="date-search" className="text-sm font-medium">
              Date
            </Label>
            <Input
              id="date-search"
              type="date"
              value={filters.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className="h-9"
            />
          </div>
        </div>

        {/* Second Row: Amount Range and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Amount Range */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Amount Range</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Min"
                type="number"
                value={filters.amountMin}
                onChange={(e) => handleInputChange("amountMin", e.target.value)}
                className="h-9"
              />
              <Input
                placeholder="Max"
                type="number"
                value={filters.amountMax}
                onChange={(e) => handleInputChange("amountMax", e.target.value)}
                className="h-9"
              />
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="status-search" className="text-sm font-medium">
              Status
            </Label>
            <select
              id="status-search"
              value={filters.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className="w-full h-9 px-3 py-1 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="processing">Processing</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSearch; 