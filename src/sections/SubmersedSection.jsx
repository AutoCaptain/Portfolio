import { useRef, useEffect, useState } from "react";
import GodRaysBackground from "./components/GodRaysBackground.jsx";
import ArrowDown from "./components/ArrowDown.jsx";
import IntroText from "./components/IntroText.jsx";
import OutroText from "./components/OutroText.jsx";
import CardDisplay from "./components/CardDisplay.jsx";
import MetricsStrip from "./components/MetricsStrip";

const DEPTH_COLORS = {
  surface: "#033955",
  deep: "#003057",
  abyss: "#000000"
};

const DEPTH_SEGMENTS = [
  { start: 0, end: 600, hold: "surface" },
  { start: 600, end: 1200, from: "surface", to: "deep" },
  { start: 1200, end: 2600, from: "deep", to: "abyss" },
  { start: 7200, end: 50000, hold: "abyss" }
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

export default function SubmersedSection() {
  const sectionRef = useRef(null);
  const [scrollPx, setScrollPx] = useState(0);

  // Track scroll relative to this section
    useEffect(() => {
      function onScroll() {
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();

        const fadeDistance = window.innerHeight;

        // 0 when section just touches bottom of screen
        // fadeDistance when section top reaches top
        const raw = fadeDistance - rect.top;

        const clamped = Math.max(0, Math.min(raw, fadeDistance));

        setScrollPx(clamped);
      }

      window.addEventListener("scroll", onScroll);
      onScroll();

      return () => window.removeEventListener("scroll", onScroll);
    }, []);



  function evaluateDepth(scrollPx) {
    for (const seg of DEPTH_SEGMENTS) {
      if (scrollPx < seg.start || scrollPx > seg.end) continue;

      if (seg.hold) {
        return DEPTH_COLORS[seg.hold];
      }

      const t = (scrollPx - seg.start) / (seg.end - seg.start);
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
    <section
      ref={sectionRef}
      style={{
        backgroundColor: bgColor,
        position: "relative"
      }}
    >
      {/* Arrow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          pointerEvents: "none"
        }}
      >
        <ArrowDown size={50} color="#52616E" />
      </div>

      {/* God Rays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          overflow: "hidden"
        }}
      >
        <GodRaysBackground scrollPx={scrollPx} />
      </div>

      {/* Content */}
        <div
            style={{
                position: "relative",
                zIndex: 10,
                paddingTop: "10vh"
            }}
        >
            <IntroText/>
            <MetricsStrip />
            <CardDisplay />
            <OutroText/>
        </div>
    </section>
  );
}
