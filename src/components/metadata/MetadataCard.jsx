import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * MetadataCard — a labeled row with animated gauge bar + value.
 *
 * @param {string}  label      - Row label
 * @param {number}  value      - 0.0 – 1.0
 * @param {boolean} inverted   - If true, LOW value = more danger (consistency metrics)
 * @param {string}  displayValue - Optional override for the displayed value text
 */
export default function MetadataCard({ label, value, inverted = false, displayValue }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(t);
  }, []);

  // Danger level: higher = worse
  const dangerLevel = inverted ? (1 - value) : value;

  const barColor =
    dangerLevel >= 0.7 ? "#ff3b3b" :
    dangerLevel >= 0.4 ? "#ffb020" :
    "#00e5ff";

  const textColor =
    dangerLevel >= 0.7 ? "text-alert-red" :
    dangerLevel >= 0.4 ? "text-alert-amber" :
    "text-alert-cyan";

  const displayVal = displayValue ?? `${(value * 100).toFixed(0)}%`;

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-cream/40 tracking-widest uppercase">
          {label}
        </span>
        <span className={`text-xs font-mono font-bold ${textColor} tracking-wider tabular-nums`}>
          {displayVal}
        </span>
      </div>

      {/* Gauge bar */}
      <div className="h-1.5 bg-void-300 rounded-full overflow-hidden relative">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: barColor, boxShadow: `0 0 6px ${barColor}60` }}
          initial={{ width: 0 }}
          animate={{ width: animated ? `${value * 100}%` : 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Tick marks */}
        {[0.25, 0.5, 0.75].map((tick) => (
          <div
            key={tick}
            className="absolute top-0 bottom-0 w-px bg-void-200"
            style={{ left: `${tick * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}
