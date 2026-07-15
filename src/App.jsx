import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ConsoleProvider } from "./context/ConsoleContext";
import { lazy, Suspense } from "react";

// Lazy-load all pages — each becomes a separate chunk, loaded only when visited
const LandingPage       = lazy(() => import("./pages/LandingPage"));
const ConsolePage       = lazy(() => import("./pages/ConsolePage"));
const VerdictHistoryPage = lazy(() => import("./pages/VerdictHistoryPage"));
const AboutPage         = lazy(() => import("./pages/AboutPage"));

function PageLoader() {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center">
      <p className="font-mono text-xs text-cream/30 tracking-widest animate-pulse">
        LOADING // STAND BY
      </p>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"        element={<LandingPage />} />
        <Route path="/console" element={<ConsolePage />} />
        <Route path="/archive" element={<VerdictHistoryPage />} />
        <Route path="/about"   element={<AboutPage />} />
        {/* Fallback */}
        <Route path="*"        element={<LandingPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ConsoleProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <AnimatedRoutes />
        </Suspense>
      </BrowserRouter>
    </ConsoleProvider>
  );
}
