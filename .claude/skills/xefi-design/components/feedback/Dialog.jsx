import React from "react";
import {Button} from "../core/Button.jsx";

export function Dialog({open = true, title, children, confirmLabel = "Supprimer", cancelLabel = "Annuler", onConfirm, onCancel, className = ""}) {
  if (!open) return null;
  return (
    <div className="da-dialog__backdrop" onClick={onCancel}>
      <div className={["da-dialog", className].filter(Boolean).join(" ")} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        {title ? <h2 className="da-dialog__title">{title}</h2> : null}
        {typeof children === "string" ? <p className="da-dialog__text">{children}</p> : children}
        <div className="da-dialog__actions">
          <Button variant="neutral" size={40} onClick={onCancel}>{cancelLabel}</Button>
          <Button variant="primary" size={40} onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
}
