import { useState, useRef, useCallback } from "react";
import { getMockFrames } from "../../data/mockFrames";
import { useConsole } from "../../context/ConsoleContext";

function getSegmentColor(score) {
  if (score >= 0.7) return "#ff3b3b";
  if (score >= 0.4) return "#ffb020";
  return "rgba(255,255,255,0.08)";
}

export default function TimelineScrubber({ position, onChange }) {
  const { state } = useConsole();
  const mockFrames = getMockFrames(state.activeVideoId);
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const getPositionFromEvent = useCallback((e) => {
    const rect = trackRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  }, []);

  const handlePointerDown = (e) => {
    setDragging(true);
    onChange(getPositionFromEvent(e));
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e) => {
    if (!dragging) return;
    onChange(getPositionFromEvent(e));
  };
  const handlePointerUp = () => setDragging(false);

  const segmentWidth = 100 / mockFrames.length;

  return (
    <div className="space-y-1" id="timeline-scrubber">
      {/* Labels */}
      <div className="flex justify-between text-[9px] font-mono text-cream/30 tracking-wider px-0.5">
        <span>00:00</span>
        <span className="text-alert-amber">TIMELINE // {mockFrames.length} FRAMES</span>
        <span>{mockFrames[mockFrames.length - 1].timestamp}</span>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-8 cursor-crosshair select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        role="slider"
        aria-label="Timeline scrubber"
        aria-valuenow={Math.round(position * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft")  onChange(Math.max(0, position - 1/mockFrames.length));
          if (e.key === "ArrowRight") onChange(Math.min(1, position + 1/mockFrames.length));
        }}
      >
        {/* Background track */}
        <div className="absolute inset-0 border border-cream/10 bg-void-300 rounded-sm overflow-hidden">
          {/* Segment blocks */}
          <svg width="100%" height="100%" className="absolute inset-0">
            {mockFrames.map((frame, i) => (
              <rect
                key={frame.frameId}
                x={`${i * segmentWidth}%`}
                y="4"
                width={`${segmentWidth - 0.3}%`}
                height="24"
                fill={getSegmentColor(frame.anomalyScore)}
                opacity={i / mockFrames.length <= position ? 1 : 0.25}
              />
            ))}
          </svg>

          {/* Playhead */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-alert-cyan shadow-glow-cyan z-10
              transition-[left] duration-75"
            style={{ left: `${position * 100}%` }}
          >
            {/* Playhead handle */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2
              w-2.5 h-2.5 bg-alert-cyan clip-corners-sm" />
          </div>
        </div>

        {/* Timestamp markers */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-0">
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
            const frameIdx = Math.min(
              mockFrames.length - 1,
              Math.round(pct * (mockFrames.length - 1))
            );
            return (
              <div key={pct} className="relative">
                <div className="absolute bottom-0 w-px h-2 bg-cream/20" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Current position indicator */}
      <div className="flex justify-between text-[9px] font-mono text-cream/25 px-0.5">
        <span>
          SCRUB: {mockFrames[Math.min(mockFrames.length - 1, Math.floor(position * mockFrames.length))].timestamp}
        </span>
        <span className="text-alert-cyan">
          FRAME {Math.min(mockFrames.length, Math.max(1, Math.ceil(position * mockFrames.length)))}/{mockFrames.length}
        </span>
      </div>
    </div>
  );
}
