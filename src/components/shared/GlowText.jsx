const colorMap = {
  cyan:  "text-alert-cyan  drop-shadow-[0_0_8px_rgba(0,229,255,0.7)]",
  amber: "text-alert-amber drop-shadow-[0_0_8px_rgba(255,176,32,0.7)]",
  red:   "text-alert-red   drop-shadow-[0_0_8px_rgba(255,59,59,0.7)]",
  cream: "text-cream       drop-shadow-[0_0_8px_rgba(242,237,227,0.4)]",
};

/**
 * GlowText — displays text with a colored glow drop-shadow.
 *
 * @param {"cyan"|"amber"|"red"|"cream"} color
 * @param {string} as     - HTML tag to render (default: "span")
 * @param {string} className
 * @param {ReactNode} children
 */
export default function GlowText({
  children,
  color = "amber",
  as: Tag = "span",
  className = "",
}) {
  return (
    <Tag className={`font-display uppercase tracking-wide ${colorMap[color]} ${className}`}>
      {children}
    </Tag>
  );
}
