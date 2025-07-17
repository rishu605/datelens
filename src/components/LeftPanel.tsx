import React from "react";

const LeftPanel: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 h-full w-full">
      <div className="bg-card rounded-xl shadow-md border border-border p-6 flex items-center justify-center" style={{ flexBasis: '10%', flexGrow: 0, flexShrink: 0 }}>
        Card 1
      </div>
      <div className="bg-card rounded-xl shadow-md border border-border p-6 flex items-center justify-center" style={{ flexBasis: '30%', flexGrow: 0, flexShrink: 0 }}>
        Card 2
      </div>
      <div className="bg-card rounded-xl shadow-md border border-border p-6 flex-1 flex items-center justify-center">
        Card 3
      </div>
    </div>
  );
};

export default LeftPanel; 