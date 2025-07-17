import React from "react";
import LeftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";

const Container: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-muted/40 to-background/80">
      <div className="flex-1 flex items-center justify-center">
        <div className="flex h-full w-full gap-8 px-8 py-6 max-w-7xl mx-auto">
          <div className="w-1/2 h-full bg-card rounded-xl shadow-md border border-border p-8 flex flex-col justify-start overflow-auto">
            <LeftPanel />
          </div>
          <div className="w-1/2 h-full bg-card rounded-xl shadow-md border border-border p-8 flex flex-col justify-start overflow-auto">
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container; 