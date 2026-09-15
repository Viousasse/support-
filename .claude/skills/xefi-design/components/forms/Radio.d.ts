import * as React from "react";
/** Bouton radio ; sélectionné, anneau et pastille rouges. */
export interface RadioProps {
  label?: React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  value?: string;
  onChange?: (value?: string) => void;
  className?: string;
}
export declare function Radio(props: RadioProps): JSX.Element;
