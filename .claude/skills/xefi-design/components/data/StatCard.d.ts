import * as React from "react";
export interface StatCardProps {
  label: string;
  value: React.ReactNode;
  /** Delta text, e.g. "+12%" */
  delta?: string;
  /** Arrow direction (green up / red down) */
  trend?: "up" | "down";
  icon?: React.ReactNode;
  /** Icon chip tone. @default "neutral" */
  tone?: "neutral" | "brand" | "info" | "success";
}
/**
 * KPI tile — label, big value, optional trend delta and icon chip.
 * @startingPoint section="Data display" subtitle="KPI / stat card" viewport="700x150"
 */
export declare function StatCard(props: StatCardProps): JSX.Element;
