/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#0a0a0a",
          100: "#111114",
          200: "#1a1a1e",
          300: "#232328",
        },
        alert: {
          red: "#ff3b3b",
          amber: "#ffb020",
          cyan: "#00e5ff",
        },
        cream: "#f2ede3",
      },
      fontFamily: {
        display: ["Anton", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "glow-red": "0 0 12px rgba(255,59,59,0.6)",
        "glow-amber": "0 0 12px rgba(255,176,32,0.6)",
        "glow-cyan": "0 0 12px rgba(0,229,255,0.6)",
        "glow-red-lg": "0 0 24px rgba(255,59,59,0.8), 0 0 48px rgba(255,59,59,0.4)",
        "glow-cyan-lg": "0 0 24px rgba(0,229,255,0.8), 0 0 48px rgba(0,229,255,0.4)",
        "glow-amber-lg": "0 0 24px rgba(255,176,32,0.8), 0 0 48px rgba(255,176,32,0.4)",
      },
      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "pulse-fast": "pulse 1s ease-in-out infinite",
        scan: "scan 6s linear infinite",
        "flicker": "flicker 0.15s ease-in-out 3",
        "ticker": "ticker 30s linear infinite",
        "blink": "blink 1s step-end infinite",
      },
      keyframes: {
        scan: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 100%" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        ticker: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
