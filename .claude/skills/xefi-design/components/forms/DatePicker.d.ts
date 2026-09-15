import * as React from "react";
export interface DatePickerProps {
  /** Currently selected date */
  value?: Date;
  onChange?: (d: Date) => void;
}
/**
 * Month/year calendar with a Monday-first French grid; selected day is XEFI red.
 * @startingPoint section="Forms" subtitle="Calendar date picker" viewport="700x360"
 */
export declare function DatePicker(props: DatePickerProps): JSX.Element;
