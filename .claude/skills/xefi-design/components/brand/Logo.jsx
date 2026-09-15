import React from "react";

const FILES = {
  "wordmark-xefi": "logo-dailyapps-by-xefi-dark.svg",
  "wordmark-xefi-light": "logo-dailyapps-by-xefi-light.svg",
  "wordmark": "logo-dailyapps-dark.svg",
  "wordmark-light": "logo-dailyapps-light.svg",
  "mark-wordmark": "logo-mark-wordmark-dark.svg",
  "mark-red-wordmark": "logo-mark-red-wordmark-dark.svg",
  "mark-wordmark-light": "logo-mark-wordmark-light.svg",
  "mark-wordmark-mono-light": "logo-mark-wordmark-mono-light.svg",
  "appicon": "logo-appicon.svg",
  "motif": "logo-motif.svg",
  "tile-mono": "logo-tile-mono-dark.svg",
  "tile-mono-light": "logo-tile-mono-light.svg",
  "tile-red": "logo-tile-red-dark.svg",
  "tile-red-light": "logo-tile-red-light.svg",
  "tile-mark": "logo-tile-mark.svg"
};

// Variantes ayant un pendant fond sombre : le thème sombre y bascule automatiquement,
// la variante claire disparaîtrait sur un fond noir.
const DARK_COUNTERPART = {
  "wordmark-xefi": "wordmark-xefi-light",
  "wordmark": "wordmark-light",
  "mark-wordmark": "mark-wordmark-light",
  "mark-red-wordmark": "mark-wordmark-light",
  "tile-mono": "tile-mono-light",
  "tile-red": "tile-red-light"
};

export function Logo({variant = "wordmark-xefi", height = 32, basePath = "assets", className = "", ...rest}) {
  const file = FILES[variant] || FILES["wordmark-xefi"];
  const darkVariant = DARK_COUNTERPART[variant];
  const darkFile = darkVariant ? FILES[darkVariant] : null;
  return (
    <span className={["da-logo", className].filter(Boolean).join(" ")} style={{height}} data-variant={variant} {...rest}>
      <img src={basePath + "/" + file} alt="DailyApps" className={darkFile ? "da-logo__light-bg" : ""} />
      {darkFile && <img src={basePath + "/" + darkFile} alt="DailyApps" className="da-logo__dark-bg" />}
    </span>
  );
}
