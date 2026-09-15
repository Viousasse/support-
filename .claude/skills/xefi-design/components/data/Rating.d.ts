import * as React from "react";
export interface RatingProps {
  value?: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  /** Star size in px. @default 22 */
  size?: number;
}
/** Star rating — interactive or read-only, amber fill. */
export declare function Rating(props: RatingProps): JSX.Element;
