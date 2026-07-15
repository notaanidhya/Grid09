import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ConsoleProvider } from "./context/ConsoleContext";
import LandingPage from "./pages/LandingPage";
import ConsolePage from "./pages/ConsolePage";
import VerdictHistoryPage from "./pages/VerdictHistoryPage";
import AboutPage from "./pages/AboutPage";

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
        <AnimatedRoutes />
      </BrowserRouter>
    </ConsoleProvider>
  );
}
