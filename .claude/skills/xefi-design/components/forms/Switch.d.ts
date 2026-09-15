import * as React from "react";
/** Interrupteur : piste noire éteinte, rouge allumée, grise désactivée. */
export interface SwitchProps {
  label?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}
export declare function Switch(props: SwitchProps): JSX.Element;
