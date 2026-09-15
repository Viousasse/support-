import * as React from "react";
export interface AccordionProps {
  title: React.ReactNode;
  children?: React.ReactNode;
  /** Controlled open state */
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  leading?: React.ReactNode;
  /** Filet de séparation sous la section. Passer `false` sur la dernière d'une pile. */
  divider?: boolean;
}
/** A single expandable section; stack several for an accordion list. */
export declare function Accordion(props: AccordionProps): JSX.Element;
