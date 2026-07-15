import { motion, AnimatePresence } from "framer-motion";
import TacticalPanel from "../shared/TacticalPanel";
import QueueItem from "./QueueItem";
import { useConsole } from "../../context/ConsoleContext";

export default function TriageQueue() {
  const { state, dispatch, activeVideo } = useConsole();

  const handleSelect = (id) => {
    if (state.queue.find(v => v.id === id)?.status === "resolved") return;
    dispatch({ type: "SET_ACTIVE", payload: id });
  };

  const pending  = state.queue.filter(v => v.status !== "resolved");
  const resolved = state.queue.filter(v => v.status === "resolved");

  return (
    <TacticalPanel
      title="Triage Queue"
      subtitle={`${pending.length} PENDING`}
      accent="amber"
      className="flex flex-col h-full"
      noPadding
    >
      <div className="flex flex-col h-full overflow-y-auto">
        {/* Pending */}
        <AnimatePresence initial={false}>
          {pending.map((video) => (
            <motion.div
              key={video.id}
              layout
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              <QueueItem
                video={video}
                isActive={activeVideo?.id === video.id}
                onSelect={handleSelect}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Resolved separator */}
        {resolved.length > 0 && (
          <>
            <div className="mx-4 my-2 border-t border-cream/10 flex items-center gap-2">
              <span className="text-[9px] font-mono text-cream/25 tracking-widest uppercase">
                Resolved
              </span>
            </div>
            <AnimatePresence initial={false}>
              {resolved.map((video) => (
                <motion.div
                  key={video.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <QueueItem
                    video={video}
                    isActive={false}
                    onSelect={() => {}}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </>
        )}

        {pending.length === 0 && resolved.length === state.queue.length && (
          <div className="p-6 text-center">
            <p className="text-xs font-mono text-alert-cyan/60 tracking-widest">
              QUEUE CLEAR
            </p>
            <p className="text-[10px] font-mono text-cream/30 mt-1">
              AWAITING NEW SIGNALS
            </p>
          </div>
        )}
      </div>
    </TacticalPanel>
  );
}
