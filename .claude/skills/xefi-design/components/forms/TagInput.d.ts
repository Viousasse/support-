import * as React from "react";
export interface TagInputProps {
  /** Current tags */
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  label?: string;
  /** Optional max number of tags */
  max?: number;
}
/**
 * Free-form tag entry — Enter or comma adds, Backspace removes the last.
 * Use Combobox instead when picking from a fixed option list.
 * @startingPoint section="Forms" subtitle="Free-form tag input" viewport="700x160"
 */
export declare function TagInput(props: TagInputProps): JSX.Element;
