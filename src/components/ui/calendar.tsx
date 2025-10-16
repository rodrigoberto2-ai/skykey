"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

import "react-day-picker/dist/style.css";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-2", className)}
      style={{ zIndex: 10000 }}
      classNames={{
        months: "flex flex-col sm:flex-row gap-6",
        month: "space-y-2",
        caption: "flex justify-center items-center pt-1 relative",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        nav_button: cn(
          "h-7 w-7 p-0 bg-transparent opacity-70 hover:opacity-100",
          "inline-flex items-center justify-center rounded-md border"
        ),
        table: "w-full table-fixed border-collapse",
        head_row: "",
        head_cell: "h-9 w-9 px-0 m-0 text-center align-middle text-muted-foreground text-[0.75rem] font-normal",
        row: "mt-1",
        cell: cn(
          "text-center text-sm p-0 relative w-9",
          "[&:has(.rdp-day_range_end)]:rounded-r-md",
          "[&:has(.rdp-day_range_start)]:rounded-l-md",
          "focus-within:relative focus-within:z-20"
        ),
        day: cn(
          "inline-flex items-center justify-center h-9 w-9 p-0 font-normal",
          "rounded-full aria-selected:opacity-100"
        ),
        day_range_start: "rdp-day_range_start bg-primary text-primary-foreground rounded-full",
        day_range_end: "rdp-day_range_end bg-primary text-primary-foreground rounded-full",
        day_range_middle: "bg-accent text-accent-foreground",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground rounded-full",
        day_today: "outline outline-1 outline-ring rounded-full",
        day_outside: "text-muted-foreground/70",
        day_disabled: "text-muted-foreground/50",
        day_hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
