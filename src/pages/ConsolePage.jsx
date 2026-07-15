import { motion } from "framer-motion";
import ScanlineOverlay from "../components/shared/ScanlineOverlay";
import TopBar from "../components/layout/TopBar";
import StatusStrip from "../components/layout/StatusStrip";
import TriageQueue from "../components/queue/TriageQueue";
import AnomalyHeatmap from "../components/heatmap/AnomalyHeatmap";
import MetadataPanel from "../components/metadata/MetadataPanel";
import VerdictConsole from "../components/verdict/VerdictConsole";
import { useConsole } from "../context/ConsoleContext";

export default function ConsolePage() {
  const { state } = useConsole();

  return (
    <div className="min-h-screen flex flex-col bg-void overflow-hidden">
      <ScanlineOverlay />

      {/* Flash overlay on the whole page */}
      {state.isFlashing && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-40"
          style={{
            backgroundColor:
              state.flashColor === "red"   ? "rgba(255,59,59,0.07)"  :
              state.flashColor === "cyan"  ? "rgba(0,229,255,0.07)"  :
              "rgba(255,176,32,0.07)",
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          aria-hidden="true"
        />
      )}

      {/* Top bar */}
      <TopBar />

      {/* Status strip */}
      <StatusStrip />

      {/* Main 3-column grid */}
      <main
        id="console-main"
        className="flex-1 grid gap-3 p-3 min-h-0"
        style={{ gridTemplateColumns: "280px 1fr 300px" }}
        aria-label="Analysis console"
      >
        {/* Left — Triage Queue */}
        <motion.section
          key="triage"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="min-h-0 overflow-hidden"
          aria-label="Triage queue"
        >
          <TriageQueue />
        </motion.section>

        {/* Center — Anomaly Heatmap */}
        <motion.section
          key="heatmap"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="min-h-0 overflow-hidden"
          aria-label="Anomaly heatmap"
        >
          <AnomalyHeatmap />
        </motion.section>

        {/* Right — Metadata */}
        <motion.section
          key="metadata"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="min-h-0 overflow-hidden"
          aria-label="Signal metadata"
        >
          <MetadataPanel />
        </motion.section>
      </main>

      {/* Bottom — Verdict Console */}
      <motion.footer
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex-shrink-0 px-3 pb-3"
        aria-label="Verdict console"
      >
        <VerdictConsole />
      </motion.footer>
    </div>
  );
}
