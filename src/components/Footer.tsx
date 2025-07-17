import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-border bg-gradient-to-r from-background via-muted to-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-inner sticky bottom-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-center px-8 py-3">
        <span className="text-xs font-medium text-muted-foreground tracking-wide">&copy; {new Date().getFullYear()} DateLens. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer; 