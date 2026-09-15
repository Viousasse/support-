import * as React from "react";
export interface CalendarEvent { date: Date; tone?: "brand" | "info" | "success" | "warning"; }
export interface CalendarProps {
  month?: number;
  year?: number;
  events?: CalendarEvent[];
  selected?: Date;
  onSelectDay?: (date: Date) => void;
  onChangeMonth?: (view: { month: number; year: number }) => void;
}
/**
 * Month grid that plots events as tone-colored dots on days.
 * @startingPoint section="Data display" subtitle="Month calendar with events" viewport="700x360"
 */
export declare function Calendar(props: CalendarProps): JSX.Element;
