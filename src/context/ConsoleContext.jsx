import { createContext, useContext, useReducer, useEffect, useRef } from "react";
import { mockQueue } from "../data/mockQueue";

const ConsoleContext = createContext(null);

const COUNTDOWN_START = 5 * 60; // 5 minutes per video in seconds

const initialState = {
  queue: mockQueue,
  activeVideoId: mockQueue[0].id,
  countdown: COUNTDOWN_START,
  reachCounter: mockQueue[0].reachRaw,
  verdictHistory: [],
  isFlashing: false,
  flashColor: null,
  statusMessage: "ANALYSIS IN PROGRESS // AWAITING OPERATOR VERDICT",
};

function reducer(state, action) {
  switch (action.type) {
    case "TICK": {
      const activeVideo = state.queue.find(v => v.id === state.activeVideoId);
      const reachIncrement = activeVideo
        ? Math.floor(activeVideo.reachRaw / (COUNTDOWN_START * 10))
        : 0;
      return {
        ...state,
        countdown: Math.max(0, state.countdown - 1),
        reachCounter: state.reachCounter + reachIncrement,
      };
    }

    case "SET_ACTIVE": {
      const video = state.queue.find(v => v.id === action.payload);
      return {
        ...state,
        activeVideoId: action.payload,
        countdown: COUNTDOWN_START,
        reachCounter: video ? video.reachRaw : 0,
        statusMessage: `LOADING CASE ${action.payload} // STAND BY`,
      };
    }

    case "SUBMIT_VERDICT": {
      const { verdict } = action.payload;
      const activeVideo = state.queue.find(v => v.id === state.activeVideoId);

      // Mark the video as resolved
      const updatedQueue = state.queue.map(v =>
        v.id === state.activeVideoId
          ? { ...v, status: "resolved", verdict }
          : v
      );

      // Add to history
      const historyEntry = {
        ...activeVideo,
        verdict,
        resolvedAt: new Date().toISOString(),
        resolvedBy: "NODE-7F2A-DELTA",
        confidence: verdict === "INCONCLUSIVE" ? 0.5 : Math.random() * 0.15 + 0.82,
      };

      // Find next pending video
      const nextPending = updatedQueue.find(
        v => v.status === "pending" && v.id !== state.activeVideoId
      );

      const flashMap = { SYNTHETIC: "red", AUTHENTIC: "cyan", INCONCLUSIVE: "amber" };

      return {
        ...state,
        queue: updatedQueue,
        verdictHistory: [historyEntry, ...state.verdictHistory],
        activeVideoId: nextPending ? nextPending.id : state.activeVideoId,
        countdown: nextPending ? COUNTDOWN_START : 0,
        reachCounter: nextPending ? nextPending.reachRaw : state.reachCounter,
        isFlashing: true,
        flashColor: flashMap[verdict] || "cyan",
        statusMessage: `VERDICT LOGGED: ${verdict} // ADVANCING QUEUE`,
      };
    }

    case "CLEAR_FLASH":
      return { ...state, isFlashing: false, flashColor: null };

    case "ADVANCE_QUEUE": {
      const nextPending = state.queue.find(
        v => v.status === "pending" && v.id !== state.activeVideoId
      );
      if (!nextPending) return state;
      return {
        ...state,
        activeVideoId: nextPending.id,
        countdown: COUNTDOWN_START,
        reachCounter: nextPending.reachRaw,
        statusMessage: `LOADING CASE ${nextPending.id} // STAND BY`,
      };
    }

    case "SET_STATUS_MESSAGE":
      return { ...state, statusMessage: action.payload };

    default:
      return state;
  }
}

export function ConsoleProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const intervalRef = useRef(null);

  // Tick every second
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // Clear flash after animation
  useEffect(() => {
    if (state.isFlashing) {
      const t = setTimeout(() => dispatch({ type: "CLEAR_FLASH" }), 700);
      return () => clearTimeout(t);
    }
  }, [state.isFlashing]);

  const activeVideo = state.queue.find(v => v.id === state.activeVideoId);

  return (
    <ConsoleContext.Provider value={{ state, dispatch, activeVideo }}>
      {children}
    </ConsoleContext.Provider>
  );
}

export function useConsole() {
  const ctx = useContext(ConsoleContext);
  if (!ctx) throw new Error("useConsole must be used within ConsoleProvider");
  return ctx;
}
