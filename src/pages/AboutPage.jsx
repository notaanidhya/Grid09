import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ScanlineOverlay from "../components/shared/ScanlineOverlay";
import TopBar from "../components/layout/TopBar";
import TacticalPanel from "../components/shared/TacticalPanel";
import GlowText from "../components/shared/GlowText";

const TIMELINE = [
  { year: "2024", event: "Synthetic media surpasses 18% of all online video content." },
  { year: "2026", event: "The Geneva Digital Accord mandates verified provenance for political media." },
  { year: "2027", event: "GRID protocol v1 established by the Epoch Verification Consortium." },
  { year: "2029", event: "Node network expands to 23 sovereign territories. 40M signals processed." },
  { year: "2031", event: "Epoch-7 launched. GRID-9 goes live. You are here." },
];

const PRINCIPLES = [
  {
    title: "Truth Has a Timestamp",
    body: "Every claim decays in credibility the longer it goes unverified. GRID-9 races the clock — not because speed is everything, but because reach is a weapon.",
    accent: "cyan",
  },
  {
    title: "Humans Stay In The Loop",
    body: "Algorithms flag. Operators decide. The verdict console exists because no model should have unchecked authority over what is real. Accountability is the architecture.",
    accent: "amber",
  },
  {
    title: "The Archive Is Permanent",
    body: "Every verdict logged in this node is immutable. We do not revise history — we add to it, transparently, so the record of what we said stands alongside the record of what was true.",
    accent: "red",
  },
];

const TECH_STACK = [
  ["Frame Analysis", "Eye-flicker, face-warp, lighting inconsistency detection at 48fps"],
  ["Audio Correlation", "Waveform desync scoring against reference fingerprints"],
  ["Compression Forensics", "DCT artifact density mapped to known synthetic encoders"],
  ["Device Fingerprinting", "Metadata chain tracing to detect relay-obscured origins"],
  ["Reach Projection", "Viral velocity modelling across 12 monitored platform feeds"],
];

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen bg-void bg-fixed"
      style={{
        backgroundImage: "url('/backgrounds/hero-secondary.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <ScanlineOverlay />
      <TopBar />

      <main className="max-w-4xl mx-auto px-8 py-10 my-6 space-y-10 bg-void/80 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl" id="about-main">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="text-cream/30 hover:text-alert-cyan transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <GlowText as="h1" color="cyan" className="text-3xl tracking-widest">
                About GRID-9
              </GlowText>
              <p className="text-[11px] font-mono text-cream/30 tracking-widest mt-0.5">
                // MISSION · PRINCIPLES · TECHNOLOGY
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mission statement */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <TacticalPanel title="Mission Statement" accent="cyan">
            <div className="space-y-4">
              <p className="font-mono text-sm text-cream/70 leading-relaxed">
                <GlowText color="cyan" className="text-sm">GRID-9</GlowText> is a distributed
                verification node operating under the Epoch-7 Protocol — an international
                framework for real-time synthetic media detection deployed across 47 sovereign
                territories.
              </p>
              <p className="font-mono text-sm text-cream/60 leading-relaxed">
                Our mandate is narrow and absolute: <em className="text-cream/80 not-italic">assess
                every flagged signal before it crosses 10 million views.</em> Beyond that threshold,
                correction becomes statistically impossible. We operate at the threshold.
              </p>
              <p className="font-mono text-xs text-cream/35 leading-relaxed border-l-2 border-alert-cyan/30 pl-3">
                "A lie repeated 2.4 million times does not become more true.
                But it becomes significantly harder to kill." — Epoch-7 Operational Doctrine, §3.1
              </p>
            </div>
          </TacticalPanel>
        </motion.div>

        {/* Principles */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          aria-label="Core principles"
        >
          <h2 className="font-display text-sm tracking-widest text-cream/40 uppercase mb-4 ml-1">
            Core Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {PRINCIPLES.map(({ title, body, accent }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <TacticalPanel title={title} accent={accent} className="h-full">
                  <p className="text-xs font-mono text-cream/55 leading-relaxed">{body}</p>
                </TacticalPanel>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          aria-label="GRID-9 history timeline"
        >
          <TacticalPanel title="Timeline // GRID History" accent="amber">
            <div className="relative pl-4">
              {/* Vertical line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-alert-amber/20" />

              <div className="space-y-6">
                {TIMELINE.map(({ year, event }, i) => (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.08 }}
                    className="relative flex gap-4 items-start"
                  >
                    {/* Node */}
                    <div className={`absolute -left-4 w-2 h-2 rounded-sm mt-0.5 flex-shrink-0
                      ${i === TIMELINE.length - 1
                        ? "bg-alert-amber shadow-glow-amber animate-pulse-slow"
                        : "bg-alert-amber/30"}`}
                    />
                    <div>
                      <GlowText color="amber" className="text-sm">{year}</GlowText>
                      <p className="text-xs font-mono text-cream/55 mt-0.5 leading-relaxed">{event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TacticalPanel>
        </motion.section>

        {/* Technical capabilities */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          aria-label="Technical capabilities"
        >
          <TacticalPanel title="Detection Capabilities" accent="red" subtitle="v9.4.1">
            <div className="space-y-3">
              {TECH_STACK.map(([name, desc]) => (
                <div key={name} className="flex items-start gap-4 py-2 border-b border-cream/5 last:border-0">
                  <div className="w-1 h-1 bg-alert-red rounded-full mt-1.5 flex-shrink-0 animate-pulse-slow" />
                  <div>
                    <p className="text-[11px] font-mono font-bold text-cream/80 tracking-wider mb-0.5">
                      {name}
                    </p>
                    <p className="text-[10px] font-mono text-cream/40 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </TacticalPanel>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center pb-6"
        >
          <button
            id="about-enter-console"
            onClick={() => navigate("/console")}
            className="group inline-flex items-center gap-3 clip-corners border border-alert-red/50
              px-8 py-3 font-display text-sm tracking-widest text-alert-red
              hover:bg-alert-red/10 hover:border-alert-red transition-all duration-200"
          >
            ENTER CONSOLE
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </main>
    </div>
  );
}
