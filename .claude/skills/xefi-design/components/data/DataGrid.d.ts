import * as React from "react";
/**
 * Tableau de données : en-tête gris Inter, lignes 48 px, survol rouge-50.
 * @startingPoint section="Composants" subtitle="Datagrid — en-tête Inter, survol rouge-50" viewport="700x260"
 */
export interface DataGridColumn { key: string; header: React.ReactNode; align?: "left" | "right"; width?: number | string }
export interface DataGridProps {
  columns?: DataGridColumn[];
  rows?: Array<Record<string, any>>;
  /** Alterne le fond des lignes paires en gris-50 */
  zebra?: boolean;
  /** Rendu personnalisé d'une cellule (badges, actions) */
  renderCell?: (column: DataGridColumn, row: Record<string, any>, index: number) => React.ReactNode;
  className?: string;
}
export declare function DataGrid(props: DataGridProps): JSX.Element;
