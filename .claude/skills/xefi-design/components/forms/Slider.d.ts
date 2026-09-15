import * as React from "react";
export interface SliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  showValue?: boolean;
}
/** Single-value range slider — black fill, round thumb. */
export declare function Slider(props: SliderProps): JSX.Element;
