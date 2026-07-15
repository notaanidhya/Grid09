import { LineChart, Line, ResponsiveContainer, Tooltip, ReferenceLine } from "recharts";
import TacticalPanel from "../shared/TacticalPanel";
import MetadataCard from "./MetadataCard";
import { getMockMetadata } from "../../data/mockMetadata";
import { useConsole } from "../../context/ConsoleContext";
import { Fingerprint, Server, MapPin, Clock, Hash } from "lucide-react";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="clip-corners border border-alert-cyan/30 bg-void-200/95 px-2 py-1">
      <p className="text-[10px] font-mono text-alert-cyan">
        {(payload[0].value * 100).toFixed(0)}%
      </p>
    </div>
  );
};

function InfoRow({ icon: Icon, label, value, danger = false }) {
  return (
    <div className="flex items-start gap-2 py-2 border-b border-cream/5 last:border-0">
      <Icon className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${danger ? "text-alert-red" : "text-cream/30"}`} />
      <div className="flex-1 min-w-0">
        <p className="text-[9px] font-mono text-cream/30 tracking-widest uppercase">{label}</p>
        <p className={`text-[11px] font-mono mt-0.5 break-all ${danger ? "text-alert-red" : "text-cream/70"}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

export default function MetadataPanel() {
  const { state } = useConsole();
  const m = getMockMetadata(state.activeVideoId);

  return (
    <TacticalPanel
      title="Signal Metadata"
      subtitle="LIVE ANALYSIS"
      accent="cyan"
      className="flex flex-col h-full"
    >
      <div className="flex flex-col gap-4 h-full overflow-y-auto">
        {/* Confidence score gauges */}
        <div className="space-y-3">
          <MetadataCard
            label="Audio Sync"
            value={m.audioSyncScore}
            inverted={true}
          />
          <MetadataCard
            label="Face Consistency"
            value={m.faceConsistency}
            inverted={true}
          />
          <MetadataCard
            label="Compression Artefact"
            value={m.compressionArtifacts}
            inverted={false}
          />
          <MetadataCard
            label="Lighting Coherence"
            value={m.lightingCoherence}
            inverted={true}
          />

          {/* Synthetic confidence — prominent */}
          <div className="clip-corners border border-alert-red/30 bg-alert-red/5 p-2.5 mt-1">
            <MetadataCard
              label="⚠ Synthetic Confidence"
              value={m.syntheticConfidence}
              inverted={false}
              displayValue={`${(m.syntheticConfidence * 100).toFixed(0)}%`}
            />
          </div>
        </div>

        {/* Waveform */}
        <div>
          <p className="text-[9px] font-mono text-cream/30 tracking-widest uppercase mb-2">
            Audio Waveform Anomaly
          </p>
          <div className="h-20 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={m.waveformData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={0.7} stroke="#ff3b3b" strokeDasharray="3 3" strokeWidth={0.5} />
                <ReferenceLine y={0.4} stroke="#ffb020" strokeDasharray="3 3" strokeWidth={0.5} />
                <Line
                  type="monotone"
                  dataKey="amp"
                  stroke="#00e5ff"
                  strokeWidth={1.5}
                  dot={false}
                  activeDot={{ r: 3, fill: "#00e5ff" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-3 mt-1">
            <span className="text-[8px] font-mono text-alert-red/70">— HIGH ≥70%</span>
            <span className="text-[8px] font-mono text-alert-amber/70">— MED ≥40%</span>
          </div>
        </div>

        {/* Device / origin info */}
        <div className="space-y-0">
          <p className="text-[9px] font-mono text-cream/30 tracking-widest uppercase mb-1">
            Signal Intelligence
          </p>
          <InfoRow icon={Fingerprint} label="Device Fingerprint" value={m.deviceFingerprint} danger />
          <InfoRow icon={Server} label="Encoding Signature" value={m.encodingSignature} danger />
          <InfoRow icon={MapPin} label="Geo Origin" value={m.geoOrigin} />
          <InfoRow icon={Clock} label="First Seen" value={new Date(m.firstSeen).toUTCString().slice(0, -4)} />
          <InfoRow icon={Hash} label="File Hash" value={m.fileHash} />
        </div>
      </div>
    </TacticalPanel>
  );
}
