import * as React from "react";
export interface AvatarGroupPerson {
  initials?: string;
  src?: string;
  alt?: string;
}
export interface AvatarGroupProps {
  /** Array of initials strings or Avatar prop objects */
  people?: (string | AvatarGroupPerson)[];
  /** Max avatars before "+N". @default 4 */
  max?: number;
  /** @default "sm" */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}
/** Overlapping stack of avatars with an overflow "+N" badge. */
export declare function AvatarGroup(props: AvatarGroupProps): JSX.Element;
