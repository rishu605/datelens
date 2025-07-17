import React from "react";
import LeftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";

const Container: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen h-screen bg-gradient-to-br from-background via-muted/40 to-background/80 overflow-hidden">
      <div className="flex-1 flex items-stretch justify-center min-h-0 px-4 py-6 md:px-8 md:py-10">
        <div className="flex w-full gap-8 max-w-7xl mx-auto h-full min-h-0">
          <div className="w-1/2 h-full flex flex-col overflow-auto min-h-0">
            <LeftPanel />
          </div>
          <div className="w-1/2 h-full flex flex-col overflow-auto min-h-0">
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container; 