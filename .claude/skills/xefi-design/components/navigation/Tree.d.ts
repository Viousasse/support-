import * as React from "react";
export interface TreeNode {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: TreeNode[];
}
export interface TreeProps {
  nodes: TreeNode[];
  onSelect?: (node: TreeNode) => void;
  /** Node ids expanded initially */
  defaultExpanded?: string[];
  selectedId?: string;
}
/**
 * Collapsible hierarchy (file trees, nested nav/categories).
 * @startingPoint section="Navigation" subtitle="Collapsible tree view" viewport="700x300"
 */
export declare function Tree(props: TreeProps): JSX.Element;
