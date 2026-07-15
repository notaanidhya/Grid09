const variantMap = {
  analyzing: {
    label: "ANALYZING",
    classes: "text-alert-cyan border-alert-cyan/50 bg-alert-cyan/10 animate-pulse-slow",
  },
  pending: {
    label: "PENDING",
    classes: "text-alert-amber border-alert-amber/50 bg-alert-amber/10",
  },
  resolved: {
    label: "RESOLVED",
    classes: "text-green-400 border-green-400/50 bg-green-400/10",
  },
  critical: {
    label: "CRITICAL",
    classes: "text-alert-red border-alert-red/50 bg-alert-red/10 animate-pulse-slow",
  },
  high: {
    label: "HIGH",
    classes: "text-alert-amber border-alert-amber/50 bg-alert-amber/10",
  },
  medium: {
    label: "MEDIUM",
    classes: "text-cream/60 border-cream/20 bg-cream/5",
  },
  SYNTHETIC: {
    label: "SYNTHETIC",
    classes: "text-alert-red border-alert-red/50 bg-alert-red/10",
  },
  AUTHENTIC: {
    label: "AUTHENTIC",
    classes: "text-alert-cyan border-alert-cyan/50 bg-alert-cyan/10",
  },
  INCONCLUSIVE: {
    label: "INCONCLUSIVE",
    classes: "text-alert-amber border-alert-amber/50 bg-alert-amber/10",
  },
};

/**
 * StatusBadge — color-coded pill badge for status and priority.
 *
 * @param {string} variant - One of the keys in variantMap
 * @param {string} className
 */
export default function StatusBadge({ variant, className = "" }) {
  const config = variantMap[variant] || variantMap.pending;

  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5 rounded-sm border
        font-mono text-[10px] font-bold tracking-widest uppercase
        clip-corners-sm
        ${config.classes} ${className}
      `}
    >
      {config.label}
    </span>
  );
}
