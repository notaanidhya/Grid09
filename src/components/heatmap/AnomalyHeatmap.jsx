import { useState } from "react";
import { motion } from "framer-motion";
import TacticalPanel from "../shared/TacticalPanel";
import GlowText from "../shared/GlowText";
import TimelineScrubber from "./TimelineScrubber";
import FrameGrid from "./FrameGrid";
import { getMockFrames, getFrameStats } from "../../data/mockFrames";
import { useConsole } from "../../context/ConsoleContext";
import { Crosshair, AlertTriangle } from "lucide-react";

export default function AnomalyHeatmap() {
  const { activeVideo, state } = useConsole();
  const [scrubPosition, setScrubPosition] = useState(1); // default: all frames visible

  const frames = getMockFrames(state.activeVideoId);
  const stats = getFrameStats(frames);

  const overallPercent = Math.round(parseFloat(stats.overallScore) * 100);
  const scoreColor = overallPercent >= 70 ? "red" : overallPercent >= 40 ? "amber" : "cyan";

  return (
    <TacticalPanel
      title="Anomaly Detection"
      subtitle={`${stats.flaggedFrames} HIGH-RISK FRAMES`}
      accent="red"
      className="flex flex-col h-full"
    >
      <div className="flex flex-col gap-4 h-full">
        {/* Case header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Crosshair className="w-3.5 h-3.5 text-alert-red flex-shrink-0 animate-pulse-slow" />
              <span className="text-[10px] font-mono text-cream/40 tracking-widest uppercase">
                Active Case
              </span>
              {activeVideo && (
                <span className="text-[10px] font-mono text-alert-amber tracking-widest">
                  {activeVideo.id}
                </span>
              )}
            </div>
            <h2 className="font-mono text-sm font-bold text-cream/90 leading-snug line-clamp-2">
              {activeVideo?.title ?? "NO ACTIVE CASE"}
            </h2>
            {activeVideo && (
              <p className="text-[10px] font-mono text-cream/35 mt-0.5 tracking-wider">
                SRC: {activeVideo.source} · REACH: {activeVideo.reach}{activeVideo.reachUnit}
              </p>
            )}
          </div>

          {/* Big score number */}
          <div className="flex-shrink-0 text-right">
            <motion.div
              key={overallPercent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <GlowText color={scoreColor} className="text-4xl leading-none">
                {overallPercent}%
              </GlowText>
            </motion.div>
            <p className="text-[9px] font-mono text-cream/30 mt-0.5 tracking-widest">
              AVG ANOMALY
            </p>
          </div>
        </div>

        {/* Warning banner for high-risk */}
        {overallPercent >= 70 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="clip-corners border border-alert-red/40 bg-alert-red/8 px-3 py-2
              flex items-center gap-2"
          >
            <AlertTriangle className="w-4 h-4 text-alert-red animate-pulse-slow flex-shrink-0" />
            <span className="text-xs font-mono text-alert-red tracking-wider">
              HIGH SYNTHETIC PROBABILITY — {stats.flaggedFrames} FRAMES EXCEED THRESHOLD
            </span>
          </motion.div>
        )}

        {/* Timeline Scrubber */}
        <TimelineScrubber position={scrubPosition} onChange={setScrubPosition} />

        {/* Frame Grid */}
        <div className="flex-1 overflow-y-auto">
          <FrameGrid scrubPosition={scrubPosition} />
        </div>
      </div>
    </TacticalPanel>
  );
}
