import * as React from "react";
export interface ComboboxOption { value: string; label: string; }
export interface ComboboxProps {
  options: ComboboxOption[];
  /** Selected values */
  value?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  label?: string;
}
/**
 * Searchable multi-select; chosen values render as removable chips.
 * @startingPoint section="Forms" subtitle="Searchable tag multi-select" viewport="700x180"
 */
export declare function Combobox(props: ComboboxProps): JSX.Element;
