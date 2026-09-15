import * as React from "react";
/**
 * Navigation principale : colonne sombre 250 px, action rouge en tête, motif de marque en pied.
 * @startingPoint section="Navigation" subtitle="Colonne de navigation sombre 250 px" viewport="700x420"
 */
export interface SidebarItem { id: string; label: React.ReactNode; icon?: React.ReactNode }
export interface SidebarProps {
  items?: SidebarItem[];
  active?: string;
  onNavigate?: (id: string) => void;
  ctaLabel?: string;
  ctaIcon?: React.ReactNode;
  onCta?: () => void;
  /** Chemin du dossier assets/ relatif à la page (motif de pied) */
  basePath?: string;
  className?: string;
}
export declare function Sidebar(props: SidebarProps): JSX.Element;
