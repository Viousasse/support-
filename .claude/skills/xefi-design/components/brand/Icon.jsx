import React from "react";
import { icons } from "../../assets/icons/icon-data.js";
import { uiIcons } from "../../assets/icons/icon-data-ui.js";

/** Jeu d'icônes XEFI. Deux espaces de noms, un seul composant, aucun appel réseau.
 *  - PascalCase ("ChevronDown") -> pictogramme XEFI, issu des sources Figma DailyUp.
 *    84 glyphes, dessinés en aplat, dans assets/icons/icon-data.js.
 *  - kebab-case ("file-pen-line") -> glyphe d'interface fonctionnel, substitution Lucide
 *    documentée, dessiné au trait, dans assets/icons/icon-data-ui.js.
 *  Les deux respectent la charte : filaire, lignes fines, couleur héritée du texte. */
export function Icon({name, size = 20, strokeWidth = 2, className = "", style, ...rest}) {
  const local = icons[name];
  const ui = local ? null : uiIcons[name];
  const g = local || ui;
  if (!g) {
    // Un nom inconnu ne rend rien : sans avertissement, l'icône manque en silence.
    if (typeof console !== "undefined") console.warn('[Icon] nom inconnu : "' + name + '" — absent du jeu XEFI (PascalCase) et du jeu fonctionnel (kebab-case).');
    return null;
  }
  const strokeProps = ui
    ? {stroke: "currentColor", strokeWidth, strokeLinecap: "round", strokeLinejoin: "round"}
    : null;
  return (
    <svg className={["xf-icon", className].filter(Boolean).join(" ")} aria-hidden="true" data-icon={name}
      width={size} height={size} viewBox={g.viewBox} fill="none"
      style={{display: "inline-block", flex: "none", ...style}}
      {...strokeProps}
      dangerouslySetInnerHTML={{__html: g.body}} {...rest} />
  );
}
