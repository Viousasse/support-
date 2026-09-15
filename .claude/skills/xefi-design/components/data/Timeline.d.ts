import * as React from "react";
export interface TimelineItem {
  title: React.ReactNode;
  meta?: string;
  icon?: React.ReactNode;
  tone?: "neutral" | "brand" | "info" | "success" | "warning";
  content?: React.ReactNode;
}
export interface TimelineProps { items: TimelineItem[]; }
/** Vertical activity feed with connector line and tone-colored dots. */
export declare function Timeline(props: TimelineProps): JSX.Element;
