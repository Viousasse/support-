import * as React from "react";
/** Onglets soulignés ; l'onglet actif est rouge avec un trait de 2 px. */
export interface TabItem { label: string; value: string }
export interface TabsProps {
  tabs?: Array<TabItem | string>;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}
export declare function Tabs(props: TabsProps): JSX.Element;
