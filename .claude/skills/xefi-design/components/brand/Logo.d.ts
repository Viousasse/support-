import * as React from "react";
/**
 * Logo DailyApps, extrait des planches de marque fournies.
 */
export interface LogoProps {
  /** wordmark-* pour les lockups texte, mark-wordmark-* avec le motif, appicon / motif / tile pour les marques seules */
  variant?: "wordmark-xefi" | "wordmark-xefi-light" | "wordmark" | "wordmark-light" | "mark-wordmark" | "mark-red-wordmark" | "mark-wordmark-light" | "mark-wordmark-mono-light" | "appicon" | "motif" | "tile-mono" | "tile-mono-light" | "tile-red" | "tile-red-light" | "tile-mark";
  height?: number;
  /**
   * Certaines variantes ont un pendant fond sombre (`wordmark-xefi`, `wordmark`,
   * `mark-wordmark`, `mark-red-wordmark`, `tile-mono`, `tile-red`) : le composant y
   * bascule automatiquement sous `[data-theme="dark"]`. Aucun logo n'est recolorisé.
   */
  /** Chemin du dossier assets/ relatif à la page */
  basePath?: string;
  className?: string;
}
export declare function Logo(props: LogoProps): JSX.Element;
