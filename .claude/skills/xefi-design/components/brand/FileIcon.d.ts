import * as React from "react";
/** Vignette de type de fichier (jeu « Doc file » du kit) — 20 extensions. */
export interface FileIconProps {
  type?: string;
  size?: number;
  basePath?: string;
  className?: string;
}
export declare function FileIcon(props: FileIconProps): JSX.Element;
export declare const FILE_TYPES: string[];
