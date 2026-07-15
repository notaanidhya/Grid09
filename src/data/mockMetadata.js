// Base metadata
const baseMetadata = {
  audioSyncScore: 0.31,       // 0 = perfect sync, 1 = maximum desync
  faceConsistency: 0.22,      // 0 = perfect consistency, 1 = max inconsistency
  compressionArtifacts: 0.78, // 0 = clean, 1 = heavily artifacted
  lightingCoherence: 0.34,    // 0 = fully coherent, 1 = fully incoherent
  deviceFingerprint: "UNKNOWN_NODE_7F2A",
  encodingSignature: "H.264 // SYNTHETIC_MARKER_DETECTED",
  geoOrigin: "REDACTED — PROXY RELAY x4",
  firstSeen: "2031-07-15T14:33:12Z",
  fileHash: "SHA-256: 8f3a1b2c...9e7d4f01",
  syntheticConfidence: 0.84,  // overall model confidence: synthetic

  // Waveform data for Recharts LineChart (50 samples)
  waveformData: [
    { t: 0,  amp: 0.10 }, { t: 1,  amp: 0.12 }, { t: 2,  amp: 0.09 },
    { t: 3,  amp: 0.14 }, { t: 4,  amp: 0.28 }, { t: 5,  amp: 0.51 },
    { t: 6,  amp: 0.73 }, { t: 7,  amp: 0.81 }, { t: 8,  amp: 0.69 },
    { t: 9,  amp: 0.55 }, { t: 10, amp: 0.42 }, { t: 11, amp: 0.31 },
    { t: 12, amp: 0.22 }, { t: 13, amp: 0.18 }, { t: 14, amp: 0.21 },
    { t: 15, amp: 0.33 }, { t: 16, amp: 0.49 }, { t: 17, amp: 0.67 },
    { t: 18, amp: 0.88 }, { t: 19, amp: 0.93 }, { t: 20, amp: 0.91 },
    { t: 21, amp: 0.82 }, { t: 22, amp: 0.71 }, { t: 23, amp: 0.58 },
    { t: 24, amp: 0.44 }, { t: 25, amp: 0.31 }, { t: 26, amp: 0.22 },
    { t: 27, amp: 0.16 }, { t: 28, amp: 0.13 }, { t: 29, amp: 0.11 },
    { t: 30, amp: 0.19 }, { t: 31, amp: 0.28 }, { t: 32, amp: 0.42 },
    { t: 33, amp: 0.61 }, { t: 34, amp: 0.77 }, { t: 35, amp: 0.84 },
    { t: 36, amp: 0.79 }, { t: 37, amp: 0.65 }, { t: 38, amp: 0.52 },
    { t: 39, amp: 0.38 }, { t: 40, amp: 0.27 }, { t: 41, amp: 0.19 },
    { t: 42, amp: 0.14 }, { t: 43, amp: 0.12 }, { t: 44, amp: 0.10 },
    { t: 45, amp: 0.11 }, { t: 46, amp: 0.09 }, { t: 47, amp: 0.10 },
    { t: 48, amp: 0.08 }, { t: 49, amp: 0.09 },
  ],
};

export function getMockMetadata(videoId) {
  if (!videoId) return baseMetadata;
  const hash = parseInt(videoId.replace(/\D/g, "")) || 1;
  const shift = (hash % 10) / 10; // 0.0 to 0.9

  return {
    ...baseMetadata,
    audioSyncScore: Math.min(0.99, baseMetadata.audioSyncScore + (shift * 0.5)),
    faceConsistency: Math.min(0.99, baseMetadata.faceConsistency + (shift * 0.4)),
    compressionArtifacts: Math.min(0.99, baseMetadata.compressionArtifacts + (shift * 0.3)),
    syntheticConfidence: Math.min(0.99, baseMetadata.syntheticConfidence + (shift * 0.1) - 0.05),
    waveformData: baseMetadata.waveformData.map(d => ({
      t: d.t,
      amp: Math.max(0.05, Math.min(0.95, d.amp + ((hash % 5 - 2) * 0.1)))
    }))
  };
}

// Metadata labels for display
export const metadataLabels = {
  audioSyncScore:      { label: "AUDIO SYNC",          inverted: true  },
  faceConsistency:     { label: "FACE CONSISTENCY",    inverted: true  },
  compressionArtifacts:{ label: "COMPRESSION ARTEFACT",inverted: false },
  lightingCoherence:   { label: "LIGHTING COHERENCE",  inverted: true  },
  syntheticConfidence: { label: "SYNTHETIC CONFIDENCE", inverted: false },
};
