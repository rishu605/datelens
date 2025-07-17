import React from "react";

interface ContainerProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ left, right }) => {
  return (
    <div className="flex h-full w-full gap-8 px-8 py-6 max-w-7xl mx-auto">
      <div className="w-1/2 h-full bg-card rounded-xl shadow-md border border-border p-8 flex flex-col justify-start overflow-auto">
        {left}
      </div>
      <div className="w-1/2 h-full bg-card rounded-xl shadow-md border border-border p-8 flex flex-col justify-start overflow-auto">
        {right}
      </div>
    </div>
  );
};

export default Container; 