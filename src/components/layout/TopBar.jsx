import { useState, useEffect } from "react";
import { Radio, Shield, Activity } from "lucide-react";
import GlowText from "../shared/GlowText";
import { Link } from "react-router-dom";

function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="font-mono text-xs text-cream/60 tracking-widest tabular-nums">
      {time.toISOString().slice(0, 19).replace("T", " ")}Z
    </span>
  );
}

export default function TopBar() {
  return (
    <header
      id="topbar"
      className="relative flex items-center justify-between px-6 py-3
        border-b border-alert-cyan/30 bg-void-100/90 backdrop-blur-md
        shadow-glow-cyan/20 z-30"
    >
      {/* Left — Branding */}
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-3 group" aria-label="GRID-9 Home">
          {/* Logo glyph */}
          <div className="relative w-8 h-8 clip-corners border border-alert-cyan/60 bg-alert-cyan/10
            flex items-center justify-center shadow-glow-cyan">
            <Shield className="w-4 h-4 text-alert-cyan" />
          </div>
          <div>
            <GlowText color="cyan" className="text-xl leading-none tracking-widest">
              GRID-9
            </GlowText>
            <p className="text-[10px] text-cream/40 font-mono tracking-widest mt-0.5">
              // VERIFICATION PROTOCOL
            </p>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-4 ml-8" aria-label="Main navigation">
          {[
            { to: "/console", label: "CONSOLE" },
            { to: "/archive", label: "ARCHIVE" },
            { to: "/about",   label: "ABOUT"   },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-[11px] font-mono tracking-widest text-cream/40
                hover:text-alert-cyan transition-colors duration-200 uppercase"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Center — Clock */}
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
        <LiveClock />
        <span className="text-[9px] text-cream/25 font-mono tracking-widest mt-0.5">
          SYNC: UTC // EPOCH-7
        </span>
      </div>

      {/* Right — Status indicators */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-alert-cyan animate-pulse-slow" />
          <span className="text-[10px] font-mono text-cream/50 tracking-wider">
            UPLINK: <span className="text-alert-cyan">NOMINAL</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-alert-amber animate-pulse-slow" />
          <span className="text-[10px] font-mono text-cream/50 tracking-wider">
            NODE-<span className="text-alert-amber">7F2A-DELTA</span>
          </span>
        </div>
      </div>
    </header>
  );
}
