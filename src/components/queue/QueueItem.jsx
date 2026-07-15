import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, Clock } from "lucide-react";
import StatusBadge from "../shared/StatusBadge";

const priorityBorder = {
  critical: "border-l-alert-red",
  high:     "border-l-alert-amber",
  medium:   "border-l-cream/20",
};

const priorityBg = {
  critical: "bg-alert-red/5",
  high:     "bg-alert-amber/5",
  medium:   "bg-transparent",
};

/** Placeholder thumbnail — colored square with frame number */
function FramePlaceholder({ videoId, priority }) {
  const isGeneric = videoId === "VID-7746";
  const priorityImage = priority === "critical" || priority === "high" ? "synthetic" : "clean";
  const thumbUrl = isGeneric
    ? `/backgrounds/frame-${priorityImage}.webp`
    : `/frames/thumb-${videoId.replace("VID-", "")}.webp`;

  return (
    <div 
      className={`w-14 h-10 flex-shrink-0 clip-corners-sm border border-cream/10 flex items-center justify-center`}
      style={{
        backgroundImage: `url('${thumbUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: priority === "critical" ? "rgba(255,59,59,0.3)" : priority === "high" ? "rgba(255,176,32,0.3)" : "rgba(0,229,255,0.2)",
        backgroundBlendMode: "overlay"
      }}
    >
      <span className="text-[8px] font-mono text-cream/30 tracking-widest">
        {videoId.replace("VID-", "")}
      </span>
    </div>
  );
}

/**
 * QueueItem — a single video card in the triage queue.
 */
export default function QueueItem({ video, isActive, onSelect }) {
  const isResolved = video.status === "resolved";

  return (
    <motion.button
      id={`queue-item-${video.id}`}
      whileHover={!isResolved ? { x: 4 } : {}}
      whileTap={!isResolved ? { scale: 0.98 } : {}}
      onClick={() => onSelect(video.id)}
      disabled={isResolved}
      className={`
        w-full text-left px-4 py-3 border-l-2 transition-all duration-200
        ${isActive
          ? "border-l-alert-amber bg-alert-amber/10 shadow-glow-amber/30"
          : isResolved
            ? "border-l-cream/10 opacity-40 cursor-not-allowed"
            : `${priorityBorder[video.priority]} ${priorityBg[video.priority]}
               hover:bg-cream/5 cursor-pointer`
        }
      `}
      aria-pressed={isActive}
      aria-label={`Select ${video.title}, ${video.status}`}
    >
      <div className="flex items-start gap-3">
        <FramePlaceholder videoId={video.id} priority={video.priority} />

        <div className="flex-1 min-w-0">
          {/* Title */}
          <p className={`text-[11px] font-mono font-bold leading-tight mb-1 tracking-wide
            ${isResolved ? "line-through text-cream/30" : "text-cream/90"}`}>
            {video.title}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <StatusBadge variant={video.status} />
            <StatusBadge variant={video.priority} />
          </div>

          {/* Reach */}
          <div className="flex items-center gap-1 mt-1.5">
            {isResolved ? (
              <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
            ) : video.priority === "critical" ? (
              <AlertTriangle className="w-3 h-3 text-alert-red flex-shrink-0 animate-pulse-slow" />
            ) : (
              <Clock className="w-3 h-3 text-cream/30 flex-shrink-0" />
            )}
            <span className="text-[10px] font-mono text-cream/40 tracking-wider">
              {isResolved && video.verdict
                ? video.verdict
                : `${video.reach}${video.reachUnit} REACH`}
            </span>
          </div>
        </div>

        {/* Active indicator */}
        {isActive && (
          <div className="flex-shrink-0 w-1 self-stretch bg-alert-amber rounded-full
            shadow-glow-amber animate-pulse-slow" />
        )}
      </div>
    </motion.button>
  );
}
