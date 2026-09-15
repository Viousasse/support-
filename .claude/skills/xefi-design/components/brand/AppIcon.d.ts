import * as React from "react";
/** Icône d'application DailyApps (tuile pleine, motif en filigrane), noire ou rouge. */
export interface AppIconProps {
  /** annuaire | bon-inter | carte-visite | conge | dailyapps (rouge seul) | emargement | livret-accueil | notes-de-frais | questionnaire | sales-up | vendeur */
  name?: string;
  tone?: "red" | "black";
  size?: number;
  basePath?: string;
  className?: string;
}
export declare function AppIcon(props: AppIconProps): JSX.Element;
export declare const APP_ICONS: string[];
