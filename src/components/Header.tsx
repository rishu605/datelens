import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-border bg-gradient-to-r from-background via-muted to-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-20 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center rounded-full bg-primary/10 p-2">
            <CalendarDays className="size-6 text-primary" />
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight font-serif text-primary">DateLens</h1>
        </div>
        <Button variant="ghost" className="rounded-full px-5 py-2 text-base font-medium hover:bg-primary/10 transition">Contact</Button>
      </div>
    </header>
  );
};

export default Header; 