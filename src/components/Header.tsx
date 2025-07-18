import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays, Sun, Moon } from "lucide-react";

function toggleDarkMode() {
  const html = document.documentElement;
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

function getInitialDarkMode() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme");
    return stored === "dark";
  }
  return false;
}

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(getInitialDarkMode());

  React.useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  const handleToggle = () => {
    setDarkMode((prev) => !prev);
    toggleDarkMode();
  };

  return (
    <header className="w-full border-b border-border bg-gradient-to-r from-background via-muted to-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-20 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center rounded-full bg-primary/10 p-2">
            <CalendarDays className="size-6 text-primary" />
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight font-serif text-primary">DateLens</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="rounded-full px-5 py-2 text-base font-medium hover:bg-primary/10 transition">Contact</Button>
          <Button
            variant="ghost"
            className="rounded-full px-2 py-2 text-base font-medium hover:bg-primary/10 transition"
            aria-label="Toggle dark mode"
            onClick={handleToggle}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header; 