import { useRef } from "react";
import PageBackground from "../Logic/PageBackground.jsx";
import Orchestration from "../../three/Orchestration.jsx";

import CardsLayer1 from "../../three/sections/components/CardLayer1.jsx";
import CardsLayer2 from "../../three/sections/components/CardLayer2.jsx";
import CardsLayer3 from "../../three/sections/components/CardLayer3.jsx";
import ThreeHeader from "../../three/components/ThreeHeader.jsx";

export default function ThreePage() {
  const cardsAnchorRef = useRef([]);
  const cameraRef = useRef(null);
  const sectionRef = useRef(null);

  return (
    <PageBackground>
      <ThreeHeader />
      <div style={{ height: "50vh" }} /> {/* spacer */}
      <section
        ref={sectionRef}
        style={{
          position: "relative",
          width: "100%",
          height: "6000px",
        }}
      >
        {/* Sticky Viewport */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
          }}
        >

          {/* Three.js World */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
            }}
          >
            <Orchestration
              cardsAnchorRef={cardsAnchorRef}
              cameraRef={cameraRef}
            />
          </div>

          {/* Cards Layers */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 20,
              pointerEvents: "none",
            }}
          >
            <CardsLayer1
              anchorsRef={cardsAnchorRef}
              cameraRef={cameraRef}
              anchorIndex={0}
            />

            <CardsLayer2
              anchorsRef={cardsAnchorRef}
              cameraRef={cameraRef}
              anchorIndex={1}
            />

            <CardsLayer3
              anchorsRef={cardsAnchorRef}
              cameraRef={cameraRef}
              anchorIndex={2}
            />
          </div>

        </div>
      </section>
    </PageBackground>
  );
}
