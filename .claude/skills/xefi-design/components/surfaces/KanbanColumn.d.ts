import * as React from "react";
export interface KanbanColumnProps {
  title: React.ReactNode;
  count?: number;
  /** Top accent bar color (CSS value) */
  accent?: string;
  onAdd?: () => void;
  children?: React.ReactNode;
}
export interface KanbanCardProps {
  title?: React.ReactNode;
  meta?: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: () => void;
}
/**
 * Board column with header, count, accent bar and a stack of KanbanCards.
 * @startingPoint section="Surfaces" subtitle="Kanban board column" viewport="700x320"
 */
export declare function KanbanColumn(props: KanbanColumnProps): JSX.Element;
export declare function KanbanCard(props: KanbanCardProps): JSX.Element;
