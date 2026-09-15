import * as React from "react";
export interface AvatarInlineProps {
  name?: string;
  secondary?: string;
  src?: string;
  initials?: string;
  /** @default "sm" */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Place the avatar after the text */
  reverse?: boolean;
}
/** Avatar paired with a name + optional secondary line, laid out horizontally. */
export declare function AvatarInline(props: AvatarInlineProps): JSX.Element;
