/* Primitives locales du kit DailyUp.
   Le système unifié ne publie qu'un composant par famille, aligné sur DailyApps et la
   charte (rouge en action primaire, hauteurs 30/36/40/48). Le kit DailyUp est une
   reproduction fidèle d'un produit existant : ses variantes propres — issues telles
   quelles de « DAILYUP - Design system.fig » — sont conservées ici, locales au kit et
   absentes du namespace public, pour ne pas dégrader la restitution.
   Icon, Avatar, Toast, Modal et ListItem viennent, eux, du système unifié. */

// ── Button ──────────────────────────────────────
/**
 * DailyUp Button — action button with an 8px (radius-md) corner radius.
 * Primary = solid black, Brand = XEFI red, Secondary = outlined, Ghost = text-only.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  leftIcon = null,
  rightIcon = null,
  fullWidth = false,
  type = "button",
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const sizes = {
    s:  { height: "var(--btn-h-sm)", padding: "0 14px", font: "var(--text-label-sm-size)", gap: "6px" },
    md: { height: "var(--btn-h-md)", padding: "0 18px", font: "var(--text-label-md-size)", gap: "8px" },
    l:  { height: "var(--btn-h-lg)", padding: "0 24px", font: "var(--text-label-lg-size)", gap: "8px" },
  };
  const sz = sizes[size] || sizes.md;

  // variant → background / color / border resolved against state
  const palette = () => {
    if (disabled) {
      if (variant === "secondary" || variant === "ghost")
        return { bg: "transparent", fg: "var(--color-text-disabled)", border: variant === "secondary" ? "1px solid var(--color-border-subtle)" : "1px solid transparent" };
      return { bg: "var(--color-action-primary-disabled)", fg: "var(--color-text-on-action)", border: "1px solid transparent" };
    }
    switch (variant) {
      case "brand":
        return { bg: active ? "var(--dailyup-colors-red-darken-2)" : hover ? "var(--color-brand-hover)" : "var(--color-brand-default)", fg: "var(--color-text-on-action)", border: "1px solid transparent" };
      case "secondary":
        return { bg: active ? "var(--color-action-secondary-active)" : hover ? "var(--color-action-secondary-hover)" : "transparent", fg: "var(--color-text-primary)", border: "1px solid var(--color-border-default)" };
      case "ghost":
        return { bg: active ? "var(--color-action-secondary-active)" : hover ? "var(--color-action-secondary-hover)" : "transparent", fg: "var(--color-text-primary)", border: "1px solid transparent" };
      case "primary":
      default:
        return {
          bg: active
            ? "var(--color-action-primary-active)"
            : hover
              ? "linear-gradient(135deg, var(--color-action-primary-default) 35%, var(--dailyup-colors-red-darken-2) 130%)"
              : "var(--color-action-primary-default)",
          fg: "var(--color-text-on-action)",
          border: "1px solid transparent",
        };
    }
  };
  const p = palette();

  return (
    <button
      type={type}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        display: fullWidth ? "flex" : "inline-flex",
        width: fullWidth ? "100%" : "auto",
        alignItems: "center",
        justifyContent: "center",
        gap: sz.gap,
        height: sz.height,
        padding: sz.padding,
        fontFamily: "var(--font-sans)",
        fontSize: sz.font,
        fontWeight: "var(--weight-semibold)",
        lineHeight: 1,
        color: p.fg,
        background: p.bg,
        border: p.border,
        borderRadius: "var(--radius-md-px)",
        cursor: disabled ? "not-allowed" : "pointer",
        whiteSpace: "nowrap",
        userSelect: "none",
        transition: "background var(--motion-fast) var(--ease-standard), color var(--motion-fast) var(--ease-standard)",
        ...style,
      }}
      {...rest}
    >
      {leftIcon && <span style={{ display: "inline-flex", flexShrink: 0 }}>{leftIcon}</span>}
      {children && <span>{children}</span>}
      {rightIcon && <span style={{ display: "inline-flex", flexShrink: 0 }}>{rightIcon}</span>}
    </button>
  );
}

// ── IconButton ──────────────────────────────────
/**
 * DailyUp IconButton — square/circular control wrapping a single icon.
 */
function IconButton({
  children,
  icon = null,
  variant = "ghost",
  size = "md",
  shape = "circle",
  disabled = false,
  "aria-label": ariaLabel,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const dims = { sm: 28, md: 36, lg: 44, xl: 52 };
  const d = dims[size] || dims.md;

  const palette = () => {
    if (disabled)
      return { bg: variant === "primary" ? "var(--color-action-primary-disabled)" : "transparent", fg: "var(--color-text-disabled)", border: variant === "secondary" ? "1px solid var(--color-border-subtle)" : "1px solid transparent" };
    switch (variant) {
      case "primary":
        return { bg: active ? "var(--color-action-primary-active)" : hover ? "var(--color-action-primary-hover)" : "var(--color-action-primary-default)", fg: "var(--color-icon-on-action)", border: "1px solid transparent" };
      case "brand":
        return { bg: active ? "var(--dailyup-colors-red-darken-2)" : hover ? "var(--color-brand-hover)" : "var(--color-brand-default)", fg: "var(--color-icon-on-action)", border: "1px solid transparent" };
      case "secondary":
        return { bg: active ? "var(--color-action-secondary-active)" : hover ? "var(--color-action-secondary-hover)" : "transparent", fg: "var(--color-icon-default)", border: "1px solid var(--color-border-default)" };
      case "ghost":
      default:
        return { bg: active ? "var(--color-action-secondary-active)" : hover ? "var(--color-action-secondary-hover)" : "transparent", fg: "var(--color-icon-default)", border: "1px solid transparent" };
    }
  };
  const p = palette();

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: d,
        height: d,
        color: p.fg,
        background: p.bg,
        border: p.border,
        borderRadius: shape === "circle" ? "var(--radius-pill-px)" : "var(--radius-md-px)",
        cursor: disabled ? "not-allowed" : "pointer",
        flexShrink: 0,
        transition: "background var(--motion-fast) var(--ease-standard), color var(--motion-fast) var(--ease-standard)",
        ...style,
      }}
      {...rest}
    >
      {icon || children}
    </button>
  );
}

// ── Badge ──────────────────────────────────
/**
 * DailyUp Badge — small status pill. Tone sets the color family; variant
 * picks solid-tint (filled) or bordered (outline).
 */
function Badge({
  children,
  tone = "neutral",
  variant = "filled",
  dot = false,
  style = {},
  ...rest
}) {
  const tones = {
    neutral: { fg: "var(--color-text-secondary)", surface: "var(--color-background-surface-sunken)", border: "var(--color-border-default)", solid: "var(--dailyup-colors-grey-darken-2)" },
    yes:     { fg: "var(--color-feedback-success-text)", surface: "var(--color-feedback-success-surface)", border: "var(--color-feedback-success-border)", solid: "var(--color-feedback-success-text)" },
    no:      { fg: "var(--color-feedback-error-text)", surface: "var(--color-feedback-error-surface)", border: "var(--color-feedback-error-border)", solid: "var(--color-feedback-error-text)" },
    brand:   { fg: "var(--color-brand-default)", surface: "var(--dailyup-colors-red-lighten-5)", border: "var(--dailyup-colors-red-lighten-3)", solid: "var(--color-brand-default)" },
    info:    { fg: "var(--color-feedback-info-text)", surface: "var(--color-feedback-info-surface)", border: "var(--color-feedback-info-border)", solid: "var(--color-feedback-info-text)" },
    success: { fg: "var(--color-feedback-success-text)", surface: "var(--color-feedback-success-surface)", border: "var(--color-feedback-success-border)", solid: "var(--color-feedback-success-text)" },
    warning: { fg: "var(--color-feedback-warning-text)", surface: "var(--color-feedback-warning-surface)", border: "var(--color-feedback-warning-border)", solid: "var(--color-feedback-warning-text)" },
    error:   { fg: "var(--color-feedback-error-text)", surface: "var(--color-feedback-error-surface)", border: "var(--color-feedback-error-border)", solid: "var(--color-feedback-error-text)" },
  };
  const t = tones[tone] || tones.neutral;

  const base = {
    display: "inline-flex", alignItems: "center", gap: "6px",
    height: 22, padding: "0 10px",
    fontFamily: "var(--font-sans)", fontSize: "var(--text-label-sm-size)",
    fontWeight: "var(--weight-semibold)", lineHeight: 1,
    borderRadius: "var(--radius-pill-px)", whiteSpace: "nowrap",
  };
  const skin = variant === "outline"
    ? { color: t.fg, background: "transparent", border: `1px solid ${t.border}` }
    : { color: t.fg, background: t.surface, border: "1px solid transparent" };

  return (
    <span style={{ ...base, ...skin, ...style }} {...rest}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: t.solid, flexShrink: 0 }} />}
      {children}
    </span>
  );
}

// ── Chip ───────────────────────────────────
/**
 * DailyUp Chip — pill for filters, tags and multi-select. Filled (subtle
 * grey) or outline; selectable with optional leading icon and dismiss.
 */
function Chip({
  children,
  variant = "filled",
  size = "md",
  selected = false,
  leadingIcon = null,
  onRemove,
  onClick,
  disabled = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const sizes = {
    sm: { height: 24, padding: "0 10px", font: "var(--text-label-sm-size)" },
    md: { height: 32, padding: "0 14px", font: "var(--text-label-md-size)" },
    lg: { height: 40, padding: "0 18px", font: "var(--text-body-md-size)" },
  };
  const sz = sizes[size] || sizes.md;

  let bg, fg, border;
  if (selected) {
    bg = "var(--color-action-primary-default)"; fg = "var(--color-text-on-action)"; border = "1px solid transparent";
  } else if (variant === "outline") {
    bg = hover && !disabled ? "var(--color-action-secondary-hover)" : "transparent";
    fg = "var(--color-text-primary)"; border = "1px solid var(--color-border-default)";
  } else {
    bg = hover && !disabled ? "var(--color-action-secondary-active)" : "var(--color-background-surface-sunken)";
    fg = "var(--color-text-primary)"; border = "1px solid transparent";
  }
  if (disabled) { fg = "var(--color-text-disabled)"; }

  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={disabled ? undefined : onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        height: sz.height, padding: sz.padding,
        fontFamily: "var(--font-sans)", fontSize: sz.font, fontWeight: "var(--weight-medium)",
        color: fg, background: bg, border, borderRadius: "var(--radius-pill-px)",
        cursor: disabled ? "not-allowed" : (onClick ? "pointer" : "default"),
        whiteSpace: "nowrap", userSelect: "none",
        transition: "background var(--motion-fast) var(--ease-standard)",
        ...style,
      }}
      {...rest}
    >
      {leadingIcon && <span style={{ display: "inline-flex", flexShrink: 0 }}>{leadingIcon}</span>}
      {children}
      {onRemove && (
        <button
          type="button" aria-label="Retirer"
          onClick={(e) => { e.stopPropagation(); onRemove(e); }}
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 16, height: 16, marginRight: -4, padding: 0, border: "none",
            background: "transparent", color: "inherit", cursor: "pointer", opacity: 0.7,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        </button>
      )}
    </span>
  );
}

// ── Card ───────────────────────────────────────
/**
 * DailyUp Card — the base white surface. Rounded 16, soft brand-tinted lift.
 */
function Card({
  children,
  padding = "16px",
  elevation = "card",
  interactive = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const shadows = {
    none: "var(--elevation-0)", card: "var(--elevation-card)",
    1: "var(--elevation-1)", 2: "var(--elevation-2)", 3: "var(--elevation-3)",
  };
  return (
    <div
      onMouseEnter={interactive ? () => setHover(true) : undefined}
      onMouseLeave={interactive ? () => setHover(false) : undefined}
      style={{
        background: "var(--color-background-surface)",
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "var(--radius-lg-px)",
        boxShadow: hover ? "var(--elevation-3)" : (shadows[elevation] || shadows.card),
        padding,
        transition: "box-shadow var(--motion-normal) var(--ease-standard)",
        cursor: interactive ? "pointer" : "default",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

// ── Tooltip ────────────────────────────────────
/**
 * DailyUp Tooltip — dark hover bubble with directional arrow.
 * Wraps a trigger; shows `content` on hover/focus.
 */
function Tooltip({ content, direction = "top", children, style = {} }) {
  const [open, setOpen] = React.useState(false);

  const pos = {
    top:    { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    left:   { right: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
    right:  { left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
  };
  const arrowPos = {
    top:    { top: "100%", left: "50%", marginLeft: -4, borderWidth: "4px 4px 0 4px", borderColor: "var(--dailyup-colors-grey-darken-4) transparent transparent transparent" },
    bottom: { bottom: "100%", left: "50%", marginLeft: -4, borderWidth: "0 4px 4px 4px", borderColor: "transparent transparent var(--dailyup-colors-grey-darken-4) transparent" },
    left:   { left: "100%", top: "50%", marginTop: -4, borderWidth: "4px 0 4px 4px", borderColor: "transparent transparent transparent var(--dailyup-colors-grey-darken-4)" },
    right:  { right: "100%", top: "50%", marginTop: -4, borderWidth: "4px 4px 4px 0", borderColor: "transparent var(--dailyup-colors-grey-darken-4) transparent transparent" },
  };

  return (
    <span
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}
      style={{ position: "relative", display: "inline-flex", ...style }}
    >
      {children}
      {open && (
        <span role="tooltip" style={{
          position: "absolute", zIndex: 50, ...pos[direction],
          padding: "6px 10px", background: "var(--dailyup-colors-grey-darken-4)",
          color: "var(--dailyup-colors-white)", fontFamily: "var(--font-sans)",
          fontSize: "var(--text-label-sm-size)", fontWeight: "var(--weight-medium)",
          borderRadius: "var(--radius-sm-px)", whiteSpace: "nowrap", pointerEvents: "none",
          boxShadow: "var(--elevation-2)",
        }}>
          {content}
          <span style={{ position: "absolute", width: 0, height: 0, borderStyle: "solid", ...arrowPos[direction] }} />
        </span>
      )}
    </span>
  );
}

// ── EmptyState ─────────────────────────────────
/**
 * DailyUp EmptyState — centered illustration slot, message and optional action.
 */
function EmptyState({
  icon,
  title,
  description,
  action,
  style = {},
}) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
      gap: "12px", padding: "48px 24px", ...style,
    }}>
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 64, height: 64, borderRadius: "var(--radius-pill-px)",
        background: "var(--color-background-surface-sunken)", color: "var(--color-icon-muted)",
        marginBottom: "4px",
      }}>
        {icon || (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h10M4 17h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        )}
      </span>
      {title && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-h3-size)", fontWeight: "var(--weight-semibold)", color: "var(--color-text-primary)" }}>{title}</span>}
      {description && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body-md-size)", color: "var(--color-text-secondary)", maxWidth: 360 }}>{description}</span>}
      {action && <div style={{ marginTop: "8px" }}>{action}</div>}
    </div>
  );
}

// ── SearchField ───────────────────────────────────
/**
 * DailyUp SearchField — search input with leading magnifier, on the sunken
 * canvas surface as drawn in the "Recherche" frame.
 */
function SearchField({
  placeholder = "Rechercher",
  value,
  defaultValue,
  onChange,
  size = "md",
  style = {},
  ...rest
}) {
  const heights = { sm: 44, md: 56 };
  const h = heights[size] || heights.md;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "12px",
      height: h, padding: "0 14px",
      background: "var(--color-background-surface-sunken)",
      borderRadius: "var(--radius-field)", width: "100%", ...style,
    }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, color: "var(--color-icon-default)" }}>
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        type="search" value={value} defaultValue={defaultValue} onChange={onChange} placeholder={placeholder}
        style={{
          flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent",
          fontFamily: "var(--font-sans)", fontSize: "var(--text-body-md-size)", color: "var(--color-text-primary)",
        }}
        {...rest}
      />
    </div>
  );
}

const {Icon, Avatar, Toast, Modal, ListItem, ButtonGroup} = window.XEFIDesignSystem_6d8aa5;
window.DuKit = {Button, IconButton, Badge, Chip, Card, Tooltip, EmptyState, SearchField, Icon, Avatar, Toast, Modal, ListItem, ButtonGroup};