# DateLens

A modern, professional web app for date-based data exploration.

---

## Project Overview

**DateLens** is a responsive, elegant web application for exploring and analyzing date-based data. Built with React, Vite, TypeScript, TailwindCSS, and shadcn/ui, it features a two-panel layout: a left panel for calendar/date controls and a right panel for a searchable, sortable data table.

---

## Key Features

### UI & Layout
- Responsive, elegant two-panel layout with a fixed header and footer.
- Left panel: vertically stacked cards for controls (selectable days, special dates, calendar).
- Right panel: card with a sticky search/filter section and a scrollable, sticky-header table.

### Calendar (Left Panel)
- Uses shadcn/ui’s calendar, styled for elegance and professionalism.
- Supports time zone selection (with GMT offset), and displays the selected date range and time zone.
- On page load, defaults to the next 7 days (today + 6).
- User can select a contiguous date range, limited by a selectable max days input.
- Only dates within the next 90 days from today are selectable; others are greyed out.
- Special dates (with “Show” enabled) are highlighted with a square border, background, and dot.
- Error tooltips appear if the user tries to select an invalid range.

### Special Dates
- Users can add, edit, and delete special dates, each with a label and “Show” toggle.
- Special dates are visually highlighted on the calendar if “Show” is enabled.

### Table (Right Panel)
- Custom-built table (not shadcn’s) with shadcn/ui look and feel.
- Columns: Name, Date, Amount, Status (with colored badges).
- Sticky table header; only the table content scrolls.
- Search & Filter section is sticky at the top, with:
  - Name (text input)
  - Date (date input)
  - Amount range (min/max)
  - Status (dropdown)
- Sorting on all columns (clickable headers with sort icons).
- Responsive, with empty state and results count.

### Data & API
- Mock data (150+ rows) generated with faker, dates always between today and 90 days from today.
- Data is served via a Vite dev server API route (`/api/table-data`).
- Table fetches data from the API and supports all filtering/sorting features.

### Cross-Panel Filtering
- Selecting a date range in the calendar filters the table to only show rows within that range.
- All filtering and sorting is reactive and works together.

---

## How to Run Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the dev server:**
   ```bash
   npm run dev
   ```

3. **Open your browser to:**
   ```
   http://localhost:5173
   ```

- The mock API is available at `/api/table-data` (handled by Vite dev server).
- No backend setup required; all data is local and dynamic.

---

## Notable Technologies Used
- React 19, Vite, TypeScript
- TailwindCSS (with custom theme)
- shadcn/ui (for calendar, inputs, buttons, etc.)
- faker.js for mock data
- Custom Vite plugin for API route

---

## Other Features
- All state (date range, special dates) is lifted to the container for cross-panel communication.
- Calendar and table are visually and functionally integrated.
- All UI is accessible, responsive, and visually consistent.

---

**The project is ready for further extension, real API integration, or deployment.**
