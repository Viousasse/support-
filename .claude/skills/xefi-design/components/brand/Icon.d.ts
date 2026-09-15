import * as React from "react";
/**
 * Icône d'interface XEFI. Filaire, lignes fines, couleur héritée du texte (charte, p. 12).
 * Deux espaces de noms, aucun appel réseau : PascalCase = pictogramme XEFI issu des
 * sources Figma (84 glyphes, en aplat) ; kebab-case = glyphe fonctionnel Lucide
 * vendorisé (23 glyphes, au trait) — substitution documentée dans readme.md.
 */
export interface IconProps extends React.SVGAttributes<SVGElement> {
  /** "ChevronDown" (jeu XEFI) ou "file-pen-line" (jeu fonctionnel) */
  name: string;
  /** Taille en px. Charte : S 16 / M 20 / L 24. */
  size?: number;
  /** Épaisseur du trait — n'agit que sur le jeu fonctionnel. Défaut 2. */
  strokeWidth?: number;
  className?: string;
}
export function Icon(props: IconProps): JSX.Element | null;
