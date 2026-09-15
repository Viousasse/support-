import * as React from "react";
/** Liste déroulante ; l'option survolée passe en gris, l'option active en rouge-50. */
export interface SelectOption { label: string; value: string }
export interface SelectProps {
  label?: React.ReactNode;
  options?: Array<SelectOption | string>;
  value?: string;
  placeholder?: string;
  size?: 30 | 36 | 40 | 48;
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}
export declare function Select(props: SelectProps): JSX.Element;
