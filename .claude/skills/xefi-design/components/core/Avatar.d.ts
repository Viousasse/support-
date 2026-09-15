import * as React from "react";
/** Avatar circulaire : initiales, image, nombre ou icône. */
export interface AvatarProps extends React.HTMLAttributes<HTMLElement> {
  /** Initiales affichées, ex. "AF" */
  initials?: string;
  /** URL d'image ; prend le pas sur les initiales */
  src?: string;
  alt?: string;
  /** Nombre affiché, ex. "+3" pour un dépassement de groupe */
  number?: string | number;
  icon?: React.ReactNode;
  /** Diamètre en px, ou taille nommée xs 24 / sm 32 / md 40 / lg 56 / xl 80 */
  size?: number | "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}
export function Avatar(props: AvatarProps): JSX.Element;
