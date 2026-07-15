/** ScanlineOverlay — fixed-position CRT scanline texture over the entire viewport. */
export default function ScanlineOverlay() {
  return (
    <>
      {/* Scanlines */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.04] mix-blend-screen"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, #00e5ff 0px, transparent 1px, transparent 4px)",
        }}
      />
      {/* Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.7) 100%)",
        }}
      />
    </>
  );
}
