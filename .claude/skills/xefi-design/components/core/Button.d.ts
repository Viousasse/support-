import * as React from "react";
/**
 * Bouton d'action DailyApps — rouge primaire, contour rouge, neutre ou texte seul.
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** primary = rouge plein, outline = contour rouge, neutral = contour gris, ghost = texte seul */
  variant?: "primary" | "outline" | "neutral" | "ghost";
  /** Hauteur du contrôle en px */
  size?: 30 | 36 | 40 | 48;
  /** Icône, posée à droite par défaut (convention du kit) */
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  block?: boolean;
  /** Force l'état visuel — sert aux planches de spécification */
  state?: "default" | "hover";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}
export declare function Button(props: ButtonProps): JSX.Element;
