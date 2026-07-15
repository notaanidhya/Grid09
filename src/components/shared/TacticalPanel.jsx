import { motion } from "framer-motion";

const accentMap = {
  cyan:  "border-alert-cyan  shadow-glow-cyan  text-alert-cyan",
  amber: "border-alert-amber shadow-glow-amber text-alert-amber",
  red:   "border-alert-red   shadow-glow-red   text-alert-red",
};

const headerBorderMap = {
  cyan:  "border-alert-cyan/40",
  amber: "border-alert-amber/40",
  red:   "border-alert-red/40",
};

/**
 * TacticalPanel — the core reusable bordered panel with cut-corner clip-path.
 *
 * @param {string}   title       - Panel header label (optional)
 * @param {string}   subtitle    - Secondary header line (optional)
 * @param {"cyan"|"amber"|"red"} accent - Border/glow color
 * @param {boolean}  isFlashing  - Triggers flash animation on verdict
 * @param {string}   flashColor  - "red" | "cyan" | "amber"
 * @param {string}   className   - Extra classes
 * @param {ReactNode} children
 */
export default function TacticalPanel({
  title,
  subtitle,
  accent = "cyan",
  isFlashing = false,
  flashColor,
  children,
  className = "",
  noPadding = false,
}) {
  const flash = flashColor || accent;

  return (
    <motion.div
      className={`
        clip-corners border bg-void-100/80 backdrop-blur-sm relative
        ${accentMap[accent]}
        ${isFlashing ? `verdict-flash-${flash}` : ""}
        ${className}
      `}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Corner accent mark */}
      <div className={`absolute top-0 right-0 w-3 h-3 ${accentMap[accent]}`}
        style={{ borderLeft: "1px solid currentColor", borderBottom: "1px solid currentColor" }}
        aria-hidden="true"
      />

      {title && (
        <div className={`px-4 py-2 border-b ${headerBorderMap[accent]} flex items-center gap-3`}>
          {/* Accent dot */}
          <span className={`w-1.5 h-1.5 rounded-full ${
            accent === "cyan" ? "bg-alert-cyan shadow-glow-cyan" :
            accent === "amber" ? "bg-alert-amber shadow-glow-amber" :
            "bg-alert-red shadow-glow-red"
          } animate-pulse-slow`} aria-hidden="true" />

          <span className={`font-display text-xs tracking-widest uppercase ${accentMap[accent].split(" ")[2]}`}>
            {title}
          </span>

          {subtitle && (
            <span className="ml-auto text-xs text-cream/30 font-mono tracking-wider">
              {subtitle}
            </span>
          )}
        </div>
      )}

      <div className={noPadding ? "" : "p-4"}>{children}</div>
    </motion.div>
  );
}
