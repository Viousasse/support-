import React from "react";

/** Avatar XEFI — pastille circulaire : initiales, image, nombre ou icône.
 *  Fusion des deux sources : accepte une taille numérique (kit DailyApps) ou nommée
 *  xs/sm/md/lg/xl (kit DailyUp). Fond rouge pâle, texte rouge foncé. */
const NAMED = {xs: 24, sm: 32, md: 40, lg: 56, xl: 80};

export function Avatar({initials = "", src, alt = "", number, icon, size = 40, className = "", style, ...rest}) {
  const d = typeof size === "number" ? size : (NAMED[size] || 40);
  const font = d <= 24 ? 10 : d <= 32 ? 12 : d <= 40 ? 14 : d <= 56 ? 20 : 28;
  let content = initials;
  if (src) content = <img src={src} alt={alt} style={{width: "100%", height: "100%", objectFit: "cover"}} />;
  else if (!initials && number != null) content = number;
  else if (!initials && icon) content = icon;
  return (
    <span className={["da-avatar", className].filter(Boolean).join(" ")}
      style={{width: d, height: d, fontSize: font, overflow: "hidden", ...style}} {...rest}>{content}</span>
  );
}
