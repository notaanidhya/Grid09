// Frame-by-frame anomaly data for active video (48 frames)
// anomalyScore: 0.0 (clean) → 1.0 (maximum synthetic marker)
// flags: detected anomaly types per frame

const baseFrames = [
  { frameId: 1,  timestamp: "00:01", anomalyScore: 0.12, flags: [] },
  { frameId: 2,  timestamp: "00:02", anomalyScore: 0.18, flags: [] },
  { frameId: 3,  timestamp: "00:03", anomalyScore: 0.21, flags: ["compression-artifact"] },
  { frameId: 4,  timestamp: "00:04", anomalyScore: 0.35, flags: ["compression-artifact"] },
  { frameId: 5,  timestamp: "00:05", anomalyScore: 0.61, flags: ["eye-flicker", "compression-artifact"] },
  { frameId: 6,  timestamp: "00:06", anomalyScore: 0.88, flags: ["eye-flicker", "face-warp", "audio-desync"] },
  { frameId: 7,  timestamp: "00:07", anomalyScore: 0.91, flags: ["face-warp", "lighting-inconsistency", "audio-desync"] },
  { frameId: 8,  timestamp: "00:08", anomalyScore: 0.84, flags: ["face-warp", "eye-flicker"] },
  { frameId: 9,  timestamp: "00:09", anomalyScore: 0.77, flags: ["lighting-inconsistency", "eye-flicker"] },
  { frameId: 10, timestamp: "00:10", anomalyScore: 0.52, flags: ["compression-artifact"] },
  { frameId: 11, timestamp: "00:11", anomalyScore: 0.39, flags: ["compression-artifact"] },
  { frameId: 12, timestamp: "00:12", anomalyScore: 0.28, flags: [] },
  { frameId: 13, timestamp: "00:13", anomalyScore: 0.22, flags: [] },
  { frameId: 14, timestamp: "00:14", anomalyScore: 0.19, flags: [] },
  { frameId: 15, timestamp: "00:15", anomalyScore: 0.31, flags: ["compression-artifact"] },
  { frameId: 16, timestamp: "00:16", anomalyScore: 0.44, flags: ["audio-desync"] },
  { frameId: 17, timestamp: "00:17", anomalyScore: 0.58, flags: ["audio-desync", "face-warp"] },
  { frameId: 18, timestamp: "00:18", anomalyScore: 0.72, flags: ["face-warp", "eye-flicker"] },
  { frameId: 19, timestamp: "00:19", anomalyScore: 0.93, flags: ["face-warp", "eye-flicker", "lighting-inconsistency", "audio-desync"] },
  { frameId: 20, timestamp: "00:20", anomalyScore: 0.95, flags: ["face-warp", "eye-flicker", "lighting-inconsistency", "audio-desync"] },
  { frameId: 21, timestamp: "00:21", anomalyScore: 0.89, flags: ["face-warp", "lighting-inconsistency"] },
  { frameId: 22, timestamp: "00:22", anomalyScore: 0.76, flags: ["lighting-inconsistency"] },
  { frameId: 23, timestamp: "00:23", anomalyScore: 0.63, flags: ["compression-artifact", "audio-desync"] },
  { frameId: 24, timestamp: "00:24", anomalyScore: 0.41, flags: ["compression-artifact"] },
  { frameId: 25, timestamp: "00:25", anomalyScore: 0.29, flags: [] },
  { frameId: 26, timestamp: "00:26", anomalyScore: 0.17, flags: [] },
  { frameId: 27, timestamp: "00:27", anomalyScore: 0.14, flags: [] },
  { frameId: 28, timestamp: "00:28", anomalyScore: 0.11, flags: [] },
  { frameId: 29, timestamp: "00:29", anomalyScore: 0.23, flags: ["compression-artifact"] },
  { frameId: 30, timestamp: "00:30", anomalyScore: 0.37, flags: ["compression-artifact"] },
  { frameId: 31, timestamp: "00:31", anomalyScore: 0.51, flags: ["audio-desync"] },
  { frameId: 32, timestamp: "00:32", anomalyScore: 0.66, flags: ["eye-flicker", "audio-desync"] },
  { frameId: 33, timestamp: "00:33", anomalyScore: 0.79, flags: ["eye-flicker", "face-warp"] },
  { frameId: 34, timestamp: "00:34", anomalyScore: 0.87, flags: ["face-warp", "lighting-inconsistency"] },
  { frameId: 35, timestamp: "00:35", anomalyScore: 0.82, flags: ["face-warp", "eye-flicker"] },
  { frameId: 36, timestamp: "00:36", anomalyScore: 0.74, flags: ["eye-flicker"] },
  { frameId: 37, timestamp: "00:37", anomalyScore: 0.55, flags: ["compression-artifact"] },
  { frameId: 38, timestamp: "00:38", anomalyScore: 0.38, flags: ["compression-artifact"] },
  { frameId: 39, timestamp: "00:39", anomalyScore: 0.26, flags: [] },
  { frameId: 40, timestamp: "00:40", anomalyScore: 0.18, flags: [] },
  { frameId: 41, timestamp: "00:41", anomalyScore: 0.15, flags: [] },
  { frameId: 42, timestamp: "00:42", anomalyScore: 0.13, flags: [] },
  { frameId: 43, timestamp: "00:43", anomalyScore: 0.22, flags: ["compression-artifact"] },
  { frameId: 44, timestamp: "00:44", anomalyScore: 0.34, flags: [] },
  { frameId: 45, timestamp: "00:45", anomalyScore: 0.28, flags: [] },
  { frameId: 46, timestamp: "00:46", anomalyScore: 0.16, flags: [] },
  { frameId: 47, timestamp: "00:47", anomalyScore: 0.12, flags: [] },
  { frameId: 48, timestamp: "00:48", anomalyScore: 0.08, flags: [] },
];

export function getMockFrames(videoId) {
  if (!videoId) return baseFrames;
  const hash = parseInt(videoId.replace(/\D/g, "")) || 1;
  const shift = (hash % 10) / 10; // 0.0 to 0.9

  return baseFrames.map(f => {
    // Randomize slightly but keep it somewhat structured
    const newScore = Math.max(0, Math.min(1, f.anomalyScore + (shift - 0.5) * 0.4));
    let flags = f.flags;
    if (newScore > 0.8 && flags.length === 0) flags = ["face-warp"];
    if (newScore < 0.4) flags = [];
    return { ...f, anomalyScore: newScore, flags };
  });
}

export function getFrameStats(frames) {
  return {
    totalFrames: frames.length,
    flaggedFrames: frames.filter(f => f.anomalyScore >= 0.7).length,
    overallScore: (frames.reduce((sum, f) => sum + f.anomalyScore, 0) / frames.length).toFixed(2),
  };
}
