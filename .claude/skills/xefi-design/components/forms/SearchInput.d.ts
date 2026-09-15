import * as React from "react";
/** Champ de recherche, loupe à gauche, sans libellé. */
export interface SearchInputProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  size?: 30 | 36 | 40 | 48;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}
export declare function SearchInput(props: SearchInputProps): JSX.Element;
