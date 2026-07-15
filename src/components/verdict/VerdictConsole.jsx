import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TacticalPanel from "../shared/TacticalPanel";
import VerdictButton from "./VerdictButton";
import Countdown from "./Countdown";
import { useConsole } from "../../context/ConsoleContext";
import { Terminal } from "lucide-react";

const MAX_LOG_LINES = 8;

const LOG_PREFIXES = {
  SYNTHETIC:    "[VERDICT] SYNTHETIC — FLAGGED FOR REMOVAL",
  AUTHENTIC:    "[VERDICT] AUTHENTIC — CLEARED FOR DISTRIBUTION",
  INCONCLUSIVE: "[VERDICT] INCONCLUSIVE — FLAGGED FOR HUMAN REVIEW",
};

export default function VerdictConsole() {
  const { state, activeVideo } = useConsole();
  const logRef = useRef(null);

  // Build log from verdict history
  const logLines = [
    `[BOOT] NODE-7F2A-DELTA ONLINE // VERIFICATION PROTOCOL ACTIVE`,
    `[SYNC] CONNECTED TO GRID-9 RELAY // ENCRYPTION: AES-256`,
    `[INFO] ${state.queue.length} CASES LOADED INTO TRIAGE QUEUE`,
    ...(activeVideo ? [`[LOAD] ACTIVE CASE: ${activeVideo.id} // ${activeVideo.title.slice(0, 40)}`] : []),
    ...state.verdictHistory
      .slice(0, MAX_LOG_LINES)
      .map(v => `${LOG_PREFIXES[v.verdict]} // ${v.id}`),
  ];

  // Auto-scroll log to bottom
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logLines.length]);

  return (
    <TacticalPanel
      title="Verdict Console"
      subtitle={`${state.verdictHistory.length} RESOLVED TODAY`}
      accent="red"
      isFlashing={state.isFlashing}
      flashColor={state.flashColor}
      noPadding
    >
      <div className="flex items-stretch gap-0 h-full">
        {/* Log terminal — left */}
        <div className="flex-1 border-r border-alert-red/20">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-alert-red/10">
            <Terminal className="w-3.5 h-3.5 text-cream/30" />
            <span className="text-[9px] font-mono text-cream/30 tracking-widest">
              OPERATOR LOG
            </span>
          </div>
          <div
            ref={logRef}
            className="h-24 overflow-y-auto px-4 py-2 space-y-1"
            aria-live="polite"
            aria-label="Operator log"
          >
            <AnimatePresence initial={false}>
              {logLines.map((line, i) => (
                <motion.p
                  key={`${i}-${line.slice(0, 20)}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`text-[10px] font-mono leading-relaxed tracking-wide
                    ${line.startsWith("[VERDICT]")
                      ? line.includes("SYNTHETIC") ? "text-alert-red"
                      : line.includes("AUTHENTIC") ? "text-alert-cyan"
                      : "text-alert-amber"
                    : line.startsWith("[BOOT]") || line.startsWith("[SYNC]")
                      ? "text-cream/25"
                      : "text-cream/50"
                    }`}
                >
                  <span className="text-cream/20 mr-2">›</span>
                  {line}
                </motion.p>
              ))}
            </AnimatePresence>

            {/* Blinking cursor */}
            <p className="text-[10px] font-mono text-alert-cyan/50">
              <span className="mr-2 text-cream/20">›</span>
              <span className="animate-blink">█</span>
            </p>
          </div>
        </div>

        {/* Verdict buttons — center */}
        <div className="flex items-center justify-center gap-3 px-6 py-4">
          <VerdictButton verdict="AUTHENTIC" />
          <VerdictButton verdict="SYNTHETIC" />
          <VerdictButton verdict="INCONCLUSIVE" />
        </div>

        {/* Countdown — right */}
        <div className="flex items-center justify-center border-l border-alert-red/20 px-6 py-4">
          <Countdown />
        </div>
      </div>
    </TacticalPanel>
  );
}
