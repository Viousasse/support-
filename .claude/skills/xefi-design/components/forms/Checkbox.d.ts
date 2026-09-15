import * as React from "react";
/** Case à cocher carrée rayon 4 ; cochée, elle se remplit en rouge primaire. */
export interface CheckboxProps {
  label?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
