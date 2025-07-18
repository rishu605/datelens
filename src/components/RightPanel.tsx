import React, { useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import type { RightPanelProps } from "@/types/interfaces";

const RightPanel: React.FC<RightPanelProps> = ({ selectedRange }) => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/api/table-data")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setTableData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Unknown error");
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-card rounded-xl shadow-md border border-border p-8 w-full flex flex-col min-h-[360px]">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Data Table</h2>
        <p className="text-muted-foreground">View and manage your data entries</p>
      </div>
      <div className="flex-1 min-h-0 flex flex-col">
        {/* DataTable will render the Search & Filter section and the table. We'll make only the table scrollable. */}
        {loading ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">Loading...</div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-destructive">{error}</div>
        ) : (
          <DataTable data={tableData} selectedRange={selectedRange} scrollTableOnly />
        )}
      </div>
    </div>
  );
};

export default RightPanel; 