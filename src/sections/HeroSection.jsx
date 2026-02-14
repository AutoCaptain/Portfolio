import { useEffect, useState } from "react";

import phoneVideo from "../assets/phone.mp4";
import desktopVideo from "../assets/desktop.mp4";
import Header from "./Header";

export default function HeroSection() {
  const getIsPortrait = () =>
    window.matchMedia("(orientation: portrait)").matches;

  const [isPortrait, setIsPortrait] = useState(() => {
    if (typeof window === "undefined") return false;
    return getIsPortrait();
  });

  useEffect(() => {
    const mql = window.matchMedia("(orientation: portrait)");

    const handleChange = (e) => {
      setIsPortrait(e.matches);
    };

    if (mql.addEventListener) {
      mql.addEventListener("change", handleChange);
    } else {
      mql.addListener(handleChange);
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handleChange);
      } else {
        mql.removeListener(handleChange);
      }
    };
  }, []);

  const videoSrc = isPortrait ? phoneVideo : desktopVideo;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "90vh" }}
    >
      {/* Overlapping header */}
      <Header />

      {/* Video layer */}
      <video
        key={videoSrc}
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Fade-out of video */}
      <div
        className="absolute w-full pointer-events-none"
        style={{
          left: 0,
          right: 0,
          bottom: "-1px",
          height: "calc(22% + 1px)",
          background:
            "linear-gradient(to bottom, rgba(3,57,85,0), rgba(3,57,85,1))",
          zIndex: 1,
        }}
      />
    </section>
  );
}
