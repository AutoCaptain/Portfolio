import { useEffect, useState } from "react";
import PageGodRays from "./PageGodRays.jsx";

const DEPTH_COLORS = {
  surface: "#033955",
  deep: "#003057",
  abyss: "#000000",
};

const DEPTH_SEGMENTS = [
  { start: 0, end: 600, hold: "surface" },
  { start: 600, end: 1200, from: "surface", to: "deep" },
  { start: 1200, end: 2600, from: "deep", to: "abyss" },
  { start: 7200, end: 50000, hold: "abyss" },
];

function lerpColor(a, b, t) {
  const ah = parseInt(a.replace("#", ""), 16);
  const bh = parseInt(b.replace("#", ""), 16);

  const ar = (ah >> 16) & 255;
  const ag = (ah >> 8) & 255;
  const ab = ah & 255;

  const br = (bh >> 16) & 255;
  const bg = (bh >> 8) & 255;
  const bb = bh & 255;

  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);

  return `rgb(${rr}, ${rg}, ${rb})`;
}

export default function PageBackground({ children }) {
  const [scrollPx, setScrollPx] = useState(0);

  useEffect(() => {
    function onScroll() {
      const rect = document.body.getBoundingClientRect();
      setScrollPx(Math.max(-rect.top, 0));
    }

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function evaluateDepth(scroll) {
    for (const seg of DEPTH_SEGMENTS) {
      if (scroll < seg.start || scroll > seg.end) continue;

      if (seg.hold) {
        return DEPTH_COLORS[seg.hold];
      }

      const t = (scroll - seg.start) / (seg.end - seg.start);
      return lerpColor(
        DEPTH_COLORS[seg.from],
        DEPTH_COLORS[seg.to],
        t
      );
    }

    return DEPTH_COLORS.abyss;
  }

  const bgColor = evaluateDepth(scrollPx);

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: bgColor,
        minHeight: "100vh",
      }}
    >
      {/* God Rays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <PageGodRays scrollPx={scrollPx} />
      </div>

      {/* Page Content Layer */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
        }}
      >
        {children}
      </div>
    </div>
  );
}
