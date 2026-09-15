import * as React from "react";
export interface StatusDotProps {
  /** @default "online" */
  status?: "online" | "busy" | "away" | "offline";
  /** Diameter in px. @default 10 */
  size?: number;
  /** White ring for overlaying on avatars */
  ring?: boolean;
  /** Pulse animation (online only) */
  pulse?: boolean;
}
export interface NotificationItemProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  body?: React.ReactNode;
  time?: string;
  unread?: boolean;
  tone?: "neutral" | "brand" | "info" | "success" | "warning";
  onClick?: () => void;
}
/** Presence/status dot and a notification row (icon chip, title/body, unread dot). */
export declare function StatusDot(props: StatusDotProps): JSX.Element;
export declare function NotificationItem(props: NotificationItemProps): JSX.Element;
