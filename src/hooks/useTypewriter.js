import { useState, useEffect, useRef } from "react";

/**
 * useTypewriter — progressively reveals a string character by character.
 * Restarts whenever the text changes.
 *
 * @param {string} text   - The full string to reveal
 * @param {number} speed  - Milliseconds per character (default 35)
 * @returns {string}      - The progressively revealed string
 */
export function useTypewriter(text, speed = 35) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    // Reset on new text
    setDisplayed("");
    indexRef.current = 0;

    if (!text) return;

    timerRef.current = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) {
        clearInterval(timerRef.current);
      }
    }, speed);

    return () => clearInterval(timerRef.current);
  }, [text, speed]);

  return displayed;
}
