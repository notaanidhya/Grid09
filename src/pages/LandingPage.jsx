import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Globe, Zap } from "lucide-react";
import ScanlineOverlay from "../components/shared/ScanlineOverlay";
import GlowText from "../components/shared/GlowText";

const STATS = [
  { label: "Signals Processed Today", value: "2,847" },
  { label: "Synthetic Detected",      value: "1,203" },
  { label: "Active Truth Nodes",       value: "47"    },
  { label: "Avg. Analysis Time",       value: "4:22"  },
];

const FEATURES = [
  {
    icon: Shield,
    title: "Frame-Level Analysis",
    desc: "Every frame is individually scored for synthetic markers, eye-flicker, face-warp, and lighting inconsistency.",
  },
  {
    icon: Globe,
    title: "Reach Intelligence",
    desc: "Real-time tracking of how fast disinformation spreads — analysis prioritized by viral velocity.",
  },
  {
    icon: Zap,
    title: "Operator Verdict Loop",
    desc: "Human-in-the-loop verification. AI flags, you decide. Verdicts are logged to the permanent archive.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div 
      className="relative min-h-screen flex flex-col overflow-hidden bg-void"
      style={{
        backgroundImage: "url('/backgrounds/hero-primary.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <ScanlineOverlay />

      {/* Background grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Radial glow origin — top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]
          opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,229,255,0.8) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Topbar minimal */}
      <header className="relative z-20 flex items-center justify-between px-8 py-5
        border-b border-alert-cyan/10">
        <GlowText color="cyan" className="text-lg tracking-widest">GRID-9</GlowText>
        <nav className="flex items-center gap-6" aria-label="Landing navigation">
          {[
            { path: "/console", label: "CONSOLE" },
            { path: "/archive", label: "ARCHIVE" },
            { path: "/about",   label: "ABOUT"   },
          ].map(({ path, label }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="text-[11px] font-mono text-cream/40 hover:text-alert-cyan
                tracking-widest uppercase transition-colors duration-200"
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center
        text-center px-6 py-20">

        {/* System label */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center gap-2 mb-6"
        >
          <div className="w-1.5 h-1.5 bg-alert-red rounded-full animate-pulse-slow" />
          <span className="text-[11px] font-mono text-alert-red font-bold tracking-[0.3em] uppercase bg-void/60 px-3 py-1 rounded backdrop-blur-sm">
            Verification Protocol Active · Node 7F2A-Delta
          </span>
          <div className="w-1.5 h-1.5 bg-alert-red rounded-full animate-pulse-slow" />
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="mb-4"
        >
          <h1 className="font-display text-[clamp(4rem,12vw,9rem)] leading-none tracking-widest
            text-alert-red drop-shadow-[0_0_12px_rgba(0,229,255,0.8)] glitch"
            data-text="GRID-9">
            GRID-9
          </h1>
          <p className="font-display text-[clamp(1rem,3vw,2rem)] tracking-[0.5em] text-void font-bold drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)] mt-2">
            // TRUTH NODE
          </p>
        </motion.div>

        {/* Tagline — typewriter feel via CSS animation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-mono text-sm text-void font-bold tracking-widest max-w-xl mb-12 leading-relaxed bg-white/30 backdrop-blur-sm px-6 py-3 rounded-sm border border-white/20 shadow-lg"
        >
          "TRUTH DECAYS AT 2.4M VIEWS / HOUR. WE ARE THE LAST CHECKPOINT."
        </motion.p>

        {/* CTA */}
        <motion.button
          id="cta-enter-truth-node"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/console")}
          className="group relative clip-corners border-2 border-alert-red px-10 py-4
            font-display text-lg tracking-widest text-alert-red bg-void/70 backdrop-blur-md
            hover:bg-alert-red hover:text-void hover:shadow-glow-red-lg
            transition-all duration-300 shadow-glow-red"
          aria-label="Enter GRID-9 Truth Node console"
        >
          <span className="flex items-center gap-3">
            ENTER TRUTH NODE
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </span>
          {/* Corner decorations */}
          <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-alert-red/60" />
          <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-alert-red/60" />
        </motion.button>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-8 mt-16"
        >
          {STATS.map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="font-display text-2xl text-alert-amber drop-shadow-[0_0_8px_rgba(255,176,32,0.6)]">
                {value}
              </p>
              <p className="text-[10px] font-mono text-void font-bold tracking-widest uppercase mt-1 bg-white/40 px-2 py-1 rounded backdrop-blur-sm inline-block border border-white/20">
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Features strip */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="relative z-10 border-t border-cream/5 px-8 py-12"
        aria-label="Features"
      >
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="clip-corners border border-void/20 bg-void/80 backdrop-blur-md p-5 group
              hover:border-alert-cyan/50 transition-colors duration-300">
              <Icon className="w-5 h-5 text-alert-cyan mb-3 group-hover:drop-shadow-[0_0_6px_rgba(0,229,255,0.8)]
                transition-all duration-300" />
              <h3 className="font-display text-sm tracking-widest text-cream/80 mb-2 uppercase">
                {title}
              </h3>
              <p className="text-xs font-mono text-cream/60 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-cream/5 px-8 py-4
        flex items-center justify-between">
        <span className="text-[10px] font-mono text-cream/20 tracking-widest">
          GRID-9 // EPOCH-7 VERIFICATION NETWORK
        </span>
        <span className="text-[10px] font-mono text-cream/20 tracking-widest">
          NODE-7F2A-DELTA // UPLINK: NOMINAL
        </span>
      </footer>
    </div>
  );
}
