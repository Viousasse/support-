import * as React from "react";
/**
 * Module : bloc blanc à rayon 16 et ombre diffuse, brique de base de toutes les pages.
 */
export interface CardProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Ombre légère (0 0 8) au lieu de l'ombre module (0 0 30) */
  flat?: boolean;
  className?: string;
}
export declare function Card(props: CardProps): JSX.Element;
