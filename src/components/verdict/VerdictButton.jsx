import { motion } from "framer-motion";
import { useConsole } from "../../context/ConsoleContext";

const VARIANTS = {
  AUTHENTIC: {
    label: "AUTHENTIC",
    sublabel: "CONFIRMED REAL",
    accent: "cyan",
    classes: "border-alert-cyan text-alert-cyan hover:bg-alert-cyan/15 hover:shadow-glow-cyan-lg",
    activeClasses: "bg-alert-cyan/20 shadow-glow-cyan",
  },
  SYNTHETIC: {
    label: "SYNTHETIC",
    sublabel: "AI GENERATED",
    accent: "red",
    classes: "border-alert-red text-alert-red hover:bg-alert-red/15 hover:shadow-glow-red-lg",
    activeClasses: "bg-alert-red/20 shadow-glow-red",
  },
  INCONCLUSIVE: {
    label: "INCONCLUSIVE",
    sublabel: "INSUFFICIENT DATA",
    accent: "amber",
    classes: "border-alert-amber text-alert-amber hover:bg-alert-amber/15 hover:shadow-glow-amber-lg",
    activeClasses: "bg-alert-amber/20 shadow-glow-amber",
  },
};

export default function VerdictButton({ verdict }) {
  const { dispatch, activeVideo } = useConsole();
  const config = VARIANTS[verdict];
  const isDisabled = !activeVideo || activeVideo.status === "resolved";

  const handleClick = () => {
    if (isDisabled) return;
    dispatch({ type: "SUBMIT_VERDICT", payload: { verdict } });
  };

  return (
    <motion.button
      id={`verdict-btn-${verdict.toLowerCase()}`}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.96 } : {}}
      onClick={handleClick}
      disabled={isDisabled}
      className={`
        relative clip-corners border-2 px-6 py-3 font-display tracking-widest
        uppercase text-sm transition-all duration-200 cursor-pointer
        disabled:opacity-30 disabled:cursor-not-allowed
        ${config.classes}
      `}
      aria-label={`Submit verdict: ${verdict}`}
    >
      {/* Corner decorations */}
      <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-current opacity-60" />
      <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-current opacity-60" />

      <span className="block leading-none">{config.label}</span>
      <span className="block text-[9px] opacity-50 mt-0.5 tracking-widest font-mono normal-case">
        {config.sublabel}
      </span>
    </motion.button>
  );
}
