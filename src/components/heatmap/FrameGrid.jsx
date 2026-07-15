import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getMockFrames } from "../../data/mockFrames";
import { useConsole } from "../../context/ConsoleContext";

const FLAG_COLORS = {
  "eye-flicker":           "#ff3b3b",
  "face-warp":             "#ff6b6b",
  "audio-desync":          "#ffb020",
  "compression-artifact":  "#ff8c00",
  "lighting-inconsistency":"#ffd700",
};

function getFrameColor(score) {
  if (score >= 0.7) return { bg: "rgba(255,59,59,0.25)",   border: "#ff3b3b", shadow: "0 0 8px rgba(255,59,59,0.6)" };
  if (score >= 0.4) return { bg: "rgba(255,176,32,0.15)",  border: "#ffb020", shadow: "0 0 6px rgba(255,176,32,0.5)" };
  return             { bg: "rgba(255,255,255,0.03)",        border: "rgba(255,255,255,0.1)", shadow: "none" };
}

function FrameTooltip({ frame, x, y }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.12 }}
      className="absolute z-50 pointer-events-none"
      style={{ left: x, top: y, transform: "translate(-50%, -110%)" }}
    >
      <div className="clip-corners border border-alert-red/50 bg-void-200/95
        backdrop-blur-md p-3 min-w-36 shadow-glow-red">
        <p className="font-mono text-[10px] text-cream/40 mb-1">
          FRAME: {frame.frameId.toString().padStart(3, "0")} // {frame.timestamp}
        </p>
        <p className="font-display text-lg text-alert-red mb-2">
          CONF: {(frame.anomalyScore * 100).toFixed(1)}%
        </p>
        <div className="space-y-1">
          {frame.flags.length > 0 ? (
            frame.flags.map(f => (
              <p key={f} className="font-mono text-[9px] uppercase" style={{ color: FLAG_COLORS[f] || "#fff" }}>
                ► {f.replace("-", " ")}
              </p>
            ))
          ) : (
            <p className="font-mono text-[9px] uppercase text-alert-cyan">► NO ANOMALIES</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function FrameGrid({ scrubPosition = 1 }) {
  const [hoveredFrame, setHoveredFrame] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const { state } = useConsole();
  
  const mockFrames = getMockFrames(state.activeVideoId);
  const [selectedFrame, setSelectedFrame] = useState(null);

  const handleMouseEnter = (frame, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = e.currentTarget.closest("[data-frame-grid]").getBoundingClientRect();
    setHoveredFrame(frame);
    setTooltipPos({
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top  - containerRect.top,
    });
  };

  // Derive stats dynamically for the legend
  const stats = {
    totalFrames: mockFrames.length,
    flaggedHigh: mockFrames.filter(f => f.anomalyScore >= 0.7).length,
    flaggedMedium: mockFrames.filter(f => f.anomalyScore >= 0.4 && f.anomalyScore < 0.7).length,
    flaggedClean: mockFrames.filter(f => f.anomalyScore < 0.4).length,
    overallScore: (mockFrames.reduce((a, b) => a + b.anomalyScore, 0) / mockFrames.length).toFixed(2),
  };

  return (
    <div className="relative" data-frame-grid="">
      {/* Legend */}
      <div className="flex items-center gap-4 mb-3 px-1">
        {[
          { color: "#ff3b3b", label: `HIGH (${stats.flaggedHigh})` },
          { color: "#ffb020", label: `MED (${stats.flaggedMedium})` },
          { color: "rgba(255,255,255,0.15)", label: `CLEAN (${stats.flaggedClean})` },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
            <span className="text-[9px] font-mono text-cream/40 tracking-wider">{label}</span>
          </div>
        ))}
        <div className="ml-auto text-[9px] font-mono text-cream/30 tracking-wider">
          {stats.totalFrames} FRAMES · AVG {(parseFloat(stats.overallScore) * 100).toFixed(0)}%
        </div>
      </div>

      {/* Frame grid — 8 columns */}
      <div className="grid gap-1.5" style={{ gridTemplateColumns: "repeat(8, 1fr)" }}>
        {mockFrames.map((frame) => {
          const colors = getFrameColor(frame.anomalyScore);
          const isInScrubRange = frame.frameId <= Math.max(1, Math.floor(scrubPosition * mockFrames.length));
          const isSelected = selectedFrame?.frameId === frame.frameId;

          return (
            <motion.button
              key={frame.frameId}
              id={`frame-${frame.frameId}`}
              className="relative aspect-square clip-corners-sm border cursor-pointer
                flex items-center justify-center overflow-hidden group"
              style={{
                backgroundImage: isInScrubRange 
                  ? state.activeVideoId === "VID-7746"
                    ? `url('/backgrounds/frame-${frame.anomalyScore >= 0.7 ? 'synthetic' : 'clean'}.png')`
                    : `url('/frames/thumb-${state.activeVideoId.replace("VID-", "")}.png')` 
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: isInScrubRange ? colors.bg : "rgba(255,255,255,0.02)",
                backgroundBlendMode: "overlay",
                borderColor: isInScrubRange ? colors.border : "rgba(255,255,255,0.06)",
                boxShadow: isInScrubRange && frame.anomalyScore >= 0.7 ? colors.shadow : "none",
              }}
              onMouseEnter={(e) => handleMouseEnter(frame, e)}
              onMouseLeave={() => setHoveredFrame(null)}
              onClick={() => setSelectedFrame(isSelected ? null : frame)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Frame ${frame.frameId}, anomaly score ${(frame.anomalyScore * 100).toFixed(0)}%`}
            >
              {/* Frame number */}
              <span className="text-[8px] font-mono text-cream/20 group-hover:text-cream/60
                transition-colors select-none">
                {String(frame.frameId).padStart(2, "0")}
              </span>

              {/* Flag count indicator */}
              {frame.flags.length > 0 && isInScrubRange && (
                <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: colors.border }} />
              )}

              {/* Selected ring */}
              {isSelected && (
                <div className="absolute inset-0 border-2 border-alert-cyan
                  pointer-events-none animate-pulse-slow" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredFrame && (
          <FrameTooltip
            frame={hoveredFrame}
            x={tooltipPos.x}
            y={tooltipPos.y}
          />
        )}
      </AnimatePresence>

      {/* Selected frame detail */}
      <AnimatePresence>
        {selectedFrame && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden"
          >
            <div className="clip-corners border border-alert-cyan/30 bg-alert-cyan/5 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-alert-cyan tracking-widest">
                  FRAME #{String(selectedFrame.frameId).padStart(3, "0")} DETAIL
                </span>
                <button
                  onClick={() => setSelectedFrame(null)}
                  className="text-[10px] font-mono text-cream/30 hover:text-cream/70"
                >
                  [CLOSE]
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
                <div>
                  <p className="text-cream/40">TIMESTAMP</p>
                  <p className="text-cream/80">{selectedFrame.timestamp}</p>
                </div>
                <div>
                  <p className="text-cream/40">ANOMALY</p>
                  <p style={{ color: getFrameColor(selectedFrame.anomalyScore).border }}>
                    {(selectedFrame.anomalyScore * 100).toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-cream/40">FLAGS</p>
                  <p className="text-alert-red">{selectedFrame.flags.length || "NONE"}</p>
                </div>
              </div>
              {selectedFrame.flags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {selectedFrame.flags.map(f => (
                    <span key={f} className="text-[9px] font-mono px-1.5 py-0.5
                      border border-alert-amber/30 bg-alert-amber/10 text-alert-amber
                      tracking-wider uppercase">
                      {f.replace(/-/g, " ")}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
