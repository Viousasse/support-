import React from "react";
import {Logo} from "../brand/Logo.jsx";

export function TopBar({title, user, actions = null, basePath = "assets", className = ""}) {
  return (
    <header className={["da-topbar", className].filter(Boolean).join(" ")}>
      <Logo variant="mark-red-wordmark" height={20} basePath={basePath} />
      <span className="da-topbar__divider" />
      <span className="da-topbar__title">{title}</span>
      <div className="da-topbar__right">{actions}{user}</div>
    </header>
  );
}
