import { useState, useEffect, useRef } from "react";

/**
 * useCountdown — reads the countdown value from ConsoleContext
 * and returns formatted time + urgency flag.
 * 
 * @param {number} seconds - raw seconds remaining
 * @returns {{ display: string, minutes: number, seconds: number, isUrgent: boolean }}
 */
export function useCountdown(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const display = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  const isUrgent = seconds < 60;

  return { display, minutes: mins, seconds: secs, isUrgent };
}
