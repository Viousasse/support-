import * as React from "react";
export interface FormFieldProps {
  label?: string;
  /** Show a red required asterisk */
  required?: boolean;
  leadingIcon?: React.ReactNode;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** Renders an inline black action button inside the field */
  actionLabel?: string;
  onAction?: () => void;
  /** Renders a dropdown chevron affordance */
  dropdown?: boolean;
  onDropdown?: () => void;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  /** Expanded textarea-style field */
  multiline?: boolean;
}
/**
 * Composite labeled field: title (+ required *), bordered control with optional
 * leading icon, inline action button and dropdown, plus helper/subtitle text.
 * @startingPoint section="Forms" subtitle="Labeled field with inline action + helper" viewport="700x180"
 */
export declare function FormField(props: FormFieldProps): JSX.Element;
