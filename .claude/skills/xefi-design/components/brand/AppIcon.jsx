import React from "react";

export const APP_ICONS = ["annuaire", "bon-inter", "carte-visite", "conge", "dailyapps", "emargement", "livret-accueil", "notes-de-frais", "questionnaire", "sales-up", "vendeur"];

export function AppIcon({name = "notes-de-frais", tone = "red", size = 56, basePath = "assets", className = "", ...rest}) {
  const src = basePath + "/app-icons/" + tone + "/" + name + ".svg";
  return (
    <span className={["da-appicon", className].filter(Boolean).join(" ")} style={{width: size, height: size}} {...rest}>
      <img src={src} alt={name} />
    </span>
  );
}
