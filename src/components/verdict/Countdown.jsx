import { motion, AnimatePresence } from "framer-motion";
import { useConsole } from "../../context/ConsoleContext";
import { useCountdown } from "../../hooks/useCountdown";
import { TrendingUp } from "lucide-react";

export default function Countdown() {
  const { state, activeVideo } = useConsole();
  const { display, isUrgent } = useCountdown(state.countdown);

  const reachDisplay = (state.reachCounter / 1_000_000).toFixed(2);

  return (
    <div className="flex flex-col items-center gap-2 min-w-40">
      {/* Timer */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={display}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            className={`font-display text-4xl tabular-nums leading-none tracking-widest
              ${isUrgent
                ? "text-alert-red drop-shadow-[0_0_12px_rgba(255,59,59,0.9)] animate-pulse-fast"
                : "text-alert-cyan drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]"
              }`}
          >
            {display}
          </motion.div>
        </AnimatePresence>

        {/* Urgency label */}
        <AnimatePresence>
          {isUrgent && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -top-4 left-0 right-0 text-center
                text-[8px] font-mono text-alert-red tracking-widest animate-pulse-fast"
            >
              CRITICAL — ACT NOW
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <p className="text-[9px] font-mono text-cream/30 tracking-widest uppercase">
        Time Remaining
      </p>

      {/* Reach counter */}
      <div className="flex items-center gap-1.5 mt-1">
        <TrendingUp className="w-3.5 h-3.5 text-alert-amber" />
        <motion.span
          key={reachDisplay}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          className="font-mono text-sm font-bold text-alert-amber tabular-nums tracking-wider"
        >
          {reachDisplay}M
        </motion.span>
        <span className="text-[9px] font-mono text-cream/30 tracking-wider uppercase">
          reach ↑
        </span>
      </div>

      {/* Case ID */}
      {activeVideo && (
        <p className="text-[9px] font-mono text-cream/20 tracking-widest">
          {activeVideo.id}
        </p>
      )}
    </div>
  );
}
