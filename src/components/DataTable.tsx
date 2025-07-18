import React, { useState, useMemo } from "react";
import TableSearch from "@/components/TableSearch";
import type { DataRow, SearchFilters, SortConfig, DataTableProps } from "@/types/interfaces";

const DataTable: React.FC<DataTableProps> = ({ data, selectedRange, scrollTableOnly }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    name: "",
    date: "",
    amountMin: "",
    amountMax: "",
    status: "",
  });

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'name',
    direction: 'asc'
  });

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // Date range filter (from calendar)
      if (
        selectedRange &&
        selectedRange.from &&
        selectedRange.to
      ) {
        const rowDate = new Date(row.date);
        rowDate.setHours(0, 0, 0, 0);
        const from = new Date(selectedRange.from);
        from.setHours(0, 0, 0, 0);
        const to = new Date(selectedRange.to);
        to.setHours(0, 0, 0, 0);
        if (rowDate < from || rowDate > to) {
          return false;
        }
      }
      if (filters.name && !row.name.toLowerCase().includes(filters.name.toLowerCase())) {
        return false;
      }
      if (filters.date && row.date !== filters.date) {
        return false;
      }
      const amount = parseFloat(row.amount.replace(/[^0-9.-]/g, ""));
      if (filters.amountMin && amount < parseFloat(filters.amountMin)) {
        return false;
      }
      if (filters.amountMax && amount > parseFloat(filters.amountMax)) {
        return false;
      }
      if (filters.status && row.status !== filters.status) {
        return false;
      }
      return true;
    });
  }, [data, filters, selectedRange]);

  const sortedData = useMemo(() => {
    const sorted = [...filteredData].sort((a, b) => {
      let aValue: any = a[sortConfig.key];
      let bValue: any = b[sortConfig.key];
      if (sortConfig.key === 'amount') {
        aValue = parseFloat(aValue.replace(/[^0-9.-]/g, ""));
        bValue = parseFloat(bValue.replace(/[^0-9.-]/g, ""));
      } else if (sortConfig.key === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (sortConfig.key === 'name') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sorted;
  }, [filteredData, sortConfig]);

  const handleSort = (key: keyof DataRow) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (columnKey: keyof DataRow) => {
    if (sortConfig.key !== columnKey) {
      return (
        <svg className="w-4 h-4 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return sortConfig.direction === 'asc' ? (
      <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      name: "",
      date: "",
      amountMin: "",
      amountMax: "",
      status: "",
    });
  };

  const getStatusColor = (status: DataRow["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50 border-green-200";
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "cancelled":
        return "text-red-600 bg-red-50 border-red-200";
      case "processing":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  // Helper to format date as dd-mm-yyyy
  function formatDateDMY(dateString: string) {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }

  // Layout: sticky search/filter, scrollable table
  if (scrollTableOnly) {
    return (
      <div className="w-full h-full flex flex-col">
        <div className="sticky top-0 z-10 bg-card pb-2">
          <TableSearch
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />
        </div>
        {/* Only this div should scroll */}
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="flex-1 min-h-0 overflow-auto rounded-md border border-border bg-card flex flex-col">
            <table className="w-full caption-bottom text-sm flex-1">
              <thead className="[&_tr]:border-b">
                <tr className="sticky top-0 z-20 bg-card border-b shadow-sm transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th 
                    className="h-12 px-4 text-left align-middle font-semibold text-foreground [&:has([role=checkbox])]:pr-0 cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-2">
                      Name
                      {getSortIcon('name')}
                    </div>
                  </th>
                  <th 
                    className="h-12 px-4 text-left align-middle font-semibold text-foreground [&:has([role=checkbox])]:pr-0 cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center gap-2">
                      Date
                      {getSortIcon('date')}
                    </div>
                  </th>
                  <th 
                    className="h-12 px-4 text-left align-middle font-semibold text-foreground [&:has([role=checkbox])]:pr-0 cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => handleSort('amount')}
                  >
                    <div className="flex items-center gap-2">
                      Amount
                      {getSortIcon('amount')}
                    </div>
                  </th>
                  <th 
                    className="h-12 px-4 text-left align-middle font-semibold text-foreground [&:has([role=checkbox])]:pr-0 cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center gap-2">
                      Status
                      {getSortIcon('status')}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {sortedData.length === 0 ? (
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td colSpan={4} className="p-4 align-middle text-center text-muted-foreground">
                      {data.length === 0 ? "No data available" : "No results match your search criteria"}
                    </td>
                  </tr>
                ) : (
                  sortedData.map((row) => (
                    <tr key={row.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle font-medium [&:has([role=checkbox])]:pr-0">
                        {row.name}
                      </td>
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                        {formatDateDMY(row.date)}
                      </td>
                      <td className="p-4 align-middle font-mono [&:has([role=checkbox])]:pr-0">
                        {row.amount}
                      </td>
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                            row.status
                          )}`}
                        >
                          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {sortedData.length > 0 && (
              <div className="text-sm text-muted-foreground text-center mt-4 mb-2">
                Showing {sortedData.length} of {data.length} entries
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default layout (old behavior)
  return (
    <div className="w-full space-y-4">
      <TableSearch
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
      />
      <div className="rounded-md border border-border bg-card">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="sticky top-0 z-20 bg-card border-b shadow-sm transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th 
                  className="h-12 px-4 text-left align-middle font-semibold text-foreground [&:has([role=checkbox])]:pr-0 cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Name
                    {getSortIcon('name')}
                  </div>
                </th>
                <th 
                  className="h-12 px-4 text-left align-middle font-semibold text-foreground [&:has([role=checkbox])]:pr-0 cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center gap-2">
                    Date
                    {getSortIcon('date')}
                  </div>
                </th>
                <th 
                  className="h-12 px-4 text-left align-middle font-semibold text-foreground [&:has([role=checkbox])]:pr-0 cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => handleSort('amount')}
                >
                  <div className="flex items-center gap-2">
                    Amount
                    {getSortIcon('amount')}
                  </div>
                </th>
                <th 
                  className="h-12 px-4 text-left align-middle font-semibold text-foreground [&:has([role=checkbox])]:pr-0 cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-2">
                    Status
                    {getSortIcon('status')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {sortedData.length === 0 ? (
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td colSpan={4} className="p-4 align-middle text-center text-muted-foreground">
                    {data.length === 0 ? "No data available" : "No results match your search criteria"}
                  </td>
                </tr>
              ) : (
                sortedData.map((row) => (
                  <tr key={row.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle font-medium [&:has([role=checkbox])]:pr-0">
                      {row.name}
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      {formatDateDMY(row.date)}
                    </td>
                    <td className="p-4 align-middle font-mono [&:has([role=checkbox])]:pr-0">
                      {row.amount}
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                          row.status
                        )}`}
                      >
                        {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {sortedData.length > 0 && (
            <div className="text-sm text-muted-foreground text-center mt-4 mb-2">
              Showing {sortedData.length} of {data.length} entries
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTable; 