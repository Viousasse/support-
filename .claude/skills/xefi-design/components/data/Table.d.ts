import * as React from "react";
export interface TableColumn<Row = any> {
  key: string;
  header: React.ReactNode;
  width?: number | string;
  align?: "left" | "center" | "right";
  /** Custom cell renderer; defaults to row[key] */
  render?: (row: Row) => React.ReactNode;
}
export interface TableProps<Row = any> {
  columns: TableColumn<Row>[];
  rows: Row[];
  /** Field used as React key. @default "id" */
  rowKey?: string;
  onRowClick?: (row: Row) => void;
  dense?: boolean;
}
/**
 * Light data table — hairline rows, uppercase header, hover highlight.
 * @startingPoint section="Data display" subtitle="Data table with custom cells" viewport="700x260"
 */
export declare function Table(props: TableProps): JSX.Element;
