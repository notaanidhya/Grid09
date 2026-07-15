import { useConsole } from "../../context/ConsoleContext";
import { useTypewriter } from "../../hooks/useTypewriter";
import { useCountdown } from "../../hooks/useCountdown";

export default function StatusStrip() {
  const { state, activeVideo } = useConsole();
  const { display: countdownDisplay } = useCountdown(state.countdown);

  const reach = activeVideo
    ? `${(state.reachCounter / 1_000_000).toFixed(2)}M`
    : "—";

  const rawMessage = activeVideo
    ? `INCOMING: ${activeVideo.title}  ·  SOURCE: ${activeVideo.source}  ·  REACH: ${reach} ↑  ·  PRIORITY: ${activeVideo.priority.toUpperCase()}  ·  TIME REMAINING: ${countdownDisplay}  ·  CASE: ${activeVideo.id}  ·  NODE: 7F2A-DELTA  ·  STATUS: ${state.statusMessage}`
    : "AWAITING INCOMING SIGNAL // STAND BY";

  const typewriterText = useTypewriter(rawMessage, 18);

  return (
    <div
      id="status-strip"
      className="relative overflow-hidden border-b border-alert-amber/20
        bg-void-200/60 backdrop-blur-sm px-4 py-1.5"
      aria-live="polite"
      aria-label="Status strip"
    >
      {/* Left label */}
      <div className="absolute left-0 top-0 bottom-0 flex items-center px-3
        border-r border-alert-amber/20 bg-alert-amber/5 z-10">
        <span className="text-[10px] font-mono text-alert-amber tracking-widest uppercase whitespace-nowrap">
          ► SIG
        </span>
      </div>

      {/* Scrolling text */}
      <p className="pl-16 pr-4 text-[11px] font-mono text-cream/50 tracking-wider whitespace-nowrap overflow-hidden text-ellipsis">
        {typewriterText}
        <span className="animate-blink ml-1 text-alert-amber">█</span>
      </p>
    </div>
  );
}
