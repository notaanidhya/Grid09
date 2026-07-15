import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Filter, ChevronDown, ChevronUp } from "lucide-react";
import ScanlineOverlay from "../components/shared/ScanlineOverlay";
import TopBar from "../components/layout/TopBar";
import GlowText from "../components/shared/GlowText";
import StatusBadge from "../components/shared/StatusBadge";
import { mockVerdictHistory } from "../data/mockVerdictHistory";
import { useConsole } from "../context/ConsoleContext";

const VERDICT_COLORS = {
  SYNTHETIC:    "text-alert-red",
  AUTHENTIC:    "text-alert-cyan",
  INCONCLUSIVE: "text-alert-amber",
};

function formatDate(iso) {
  return new Date(iso).toLocaleString("en-GB", {
    hour:   "2-digit",
    minute: "2-digit",
    day:    "2-digit",
    month:  "2-digit",
    year:   "numeric",
  }).replace(",", " //");
}

export default function VerdictHistoryPage() {
  const navigate = useNavigate();
  const { state } = useConsole();
  const [filter, setFilter] = useState("ALL"); // "ALL" | "SYNTHETIC" | "AUTHENTIC" | "INCONCLUSIVE"
  const [sortAsc, setSortAsc] = useState(false);

  // Merge session history + mock history
  const allHistory = [...state.verdictHistory, ...mockVerdictHistory];

  const filtered = allHistory
    .filter(v => filter === "ALL" || v.verdict === filter)
    .sort((a, b) => {
      const da = new Date(a.resolvedAt), db = new Date(b.resolvedAt);
      return sortAsc ? da - db : db - da;
    });

  const counts = {
    ALL:          allHistory.length,
    SYNTHETIC:    allHistory.filter(v => v.verdict === "SYNTHETIC").length,
    AUTHENTIC:    allHistory.filter(v => v.verdict === "AUTHENTIC").length,
    INCONCLUSIVE: allHistory.filter(v => v.verdict === "INCONCLUSIVE").length,
  };

  return (
    <div 
      className="min-h-screen flex flex-col bg-void bg-fixed"
      style={{
        backgroundImage: "url('/backgrounds/hero-tertiary.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <ScanlineOverlay />
      <TopBar />

      <main className="flex-1 px-8 py-8 my-6 max-w-6xl mx-auto w-full bg-void/85 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl" id="archive-main">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => navigate("/console")}
              className="text-cream/30 hover:text-alert-cyan transition-colors"
              aria-label="Back to console"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <GlowText as="h1" color="amber" className="text-2xl tracking-widest">
              Verdict Archive
            </GlowText>
          </div>
          <p className="text-xs font-mono text-cream/30 tracking-wider ml-7">
            NODE-7F2A-DELTA // PERMANENT RECORD // {allHistory.length} CASES RESOLVED
          </p>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-3 mb-6"
        >
          {[
            { key: "ALL",          label: "Total",        color: "text-cream/70"   },
            { key: "SYNTHETIC",    label: "Synthetic",    color: "text-alert-red"  },
            { key: "AUTHENTIC",    label: "Authentic",    color: "text-alert-cyan" },
            { key: "INCONCLUSIVE", label: "Inconclusive", color: "text-alert-amber"},
          ].map(({ key, label, color }) => (
            <button
              key={key}
              id={`filter-${key.toLowerCase()}`}
              onClick={() => setFilter(key)}
              className={`clip-corners border p-3 text-left transition-all duration-200
                ${filter === key
                  ? "border-alert-amber/50 bg-alert-amber/10"
                  : "border-cream/10 bg-void-100/50 hover:border-cream/20"
                }`}
            >
              <p className={`font-display text-2xl ${color}`}>{counts[key]}</p>
              <p className="text-[10px] font-mono text-cream/30 tracking-widest uppercase mt-0.5">
                {label}
              </p>
            </button>
          ))}
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex items-center justify-between mb-3 px-1"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-cream/30" />
            <span className="text-[10px] font-mono text-cream/30 tracking-widest">
              SHOWING: {filter} ({filtered.length})
            </span>
          </div>
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="flex items-center gap-1 text-[10px] font-mono text-cream/30
              hover:text-alert-cyan transition-colors tracking-widest"
            aria-label="Toggle sort order"
          >
            {sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {sortAsc ? "OLDEST FIRST" : "NEWEST FIRST"}
          </button>
        </motion.div>

        {/* Table */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="clip-corners border border-cream/10 bg-void-100/50 p-16 text-center"
          >
            <GlowText color="cyan" className="text-xl block mb-2">
              ARCHIVE OFFLINE
            </GlowText>
            <p className="text-xs font-mono text-cream/30">
              No verdicts recorded for this filter.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="clip-corners border border-cream/10 bg-void-100/50 overflow-hidden"
          >
            {/* Table header */}
            <div className="grid text-[9px] font-mono text-cream/30 tracking-widest uppercase
              border-b border-cream/10 bg-void-200/50 px-4 py-2"
              style={{ gridTemplateColumns: "90px 1fr 100px 120px 90px 120px" }}>
              <span>CASE ID</span>
              <span>TITLE</span>
              <span>REACH</span>
              <span>VERDICT</span>
              <span>CONF.</span>
              <span>RESOLVED</span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-cream/5">
              {filtered.map((record, i) => (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="grid items-center gap-2 px-4 py-3 hover:bg-cream/3 transition-colors"
                  style={{ gridTemplateColumns: "90px 1fr 100px 120px 90px 120px" }}
                >
                  <span className="text-[10px] font-mono text-alert-amber tracking-wider">
                    {record.id}
                  </span>
                  <span className="text-[11px] font-mono text-cream/70 truncate pr-4" title={record.title}>
                    {record.title}
                  </span>
                  <span className="text-[10px] font-mono text-cream/40">
                    {record.reach}{record.reachUnit}
                  </span>
                  <StatusBadge variant={record.verdict} />
                  <span className={`text-[10px] font-mono font-bold tabular-nums
                    ${VERDICT_COLORS[record.verdict]}`}>
                    {record.confidence
                      ? `${(record.confidence * 100).toFixed(0)}%`
                      : "—"}
                  </span>
                  <span className="text-[9px] font-mono text-cream/25">
                    {formatDate(record.resolvedAt)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Footer note */}
        <p className="text-[9px] font-mono text-cream/20 tracking-widest text-center mt-6">
          ARCHIVE IS APPEND-ONLY // VERDICTS CANNOT BE MODIFIED // EPOCH-7 PROTOCOL
        </p>
      </main>
    </div>
  );
}
