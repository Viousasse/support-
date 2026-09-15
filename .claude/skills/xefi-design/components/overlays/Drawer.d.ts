import * as React from "react";
export interface DrawerProps {
  open?: boolean;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: () => void;
  /** Edge it slides from. @default "right" */
  side?: "left" | "right";
  width?: number;
}
/** Side sheet that slides in over a dimmed scrim, with header/body/footer. */
export declare function Drawer(props: DrawerProps): JSX.Element;
