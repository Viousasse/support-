import * as React from "react";
export interface CounterProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (v: number) => void;
  disabled?: boolean;
}
/** Numeric stepper: minus / value / plus, in a pill container. */
export declare function Counter(props: CounterProps): JSX.Element;
