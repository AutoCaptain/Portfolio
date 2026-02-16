import { useEffect, useRef } from "react";
import * as THREE from "three";
import Card from "../cards/CardWrapper.jsx";
import Card1 from "../cards/Card1.jsx";
import Card2 from "../cards/Card2.jsx";
import Card3 from "../cards/Card3.jsx";

export default function CardsLayer1({
  anchorsRef,
  cameraRef,
  anchorIndex = 0,
  cardHeight = 400,
  gap = 25,
}) {
  const cardRefs = useRef([]);
  const tmpVec = useRef(new THREE.Vector3());
  const viewportWidth = window.innerWidth;
  const effectiveCardWidth =
    viewportWidth < 360
      ? Math.max(320, viewportWidth * 0.95)
      : 360;

  useEffect(() => {
    let rafId;

    function update() {
      const anchors = anchorsRef.current;
      const camera = cameraRef.current;
      if (!anchors || !camera || anchors.length === 0) {
        rafId = requestAnimationFrame(update);
        return;
      }

      const anchor = anchors[anchorIndex];
      if (!anchor) {
        rafId = requestAnimationFrame(update);
        return;
      }
      const focus = anchor.userData.cardFocus;
      const opacities = focus?.opacities;
      const w = window.innerWidth;
      const h = window.innerHeight;

      anchor.getWorldPosition(tmpVec.current);
      tmpVec.current.project(camera);

      const baseX = (tmpVec.current.x * 0.5 + 0.5) * w;
      const baseY = (-tmpVec.current.y * 0.5 + 0.5) * h;

      const cardCount = cardRefs.current.length;
      const centerIndex = Math.floor(cardCount / 2);

      for (let i = 0; i < cardCount; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        const offsetX = (i - centerIndex) * (effectiveCardWidth + gap);

        el.style.transform = `
          translate3d(${baseX + offsetX}px, ${baseY}px, 0)
          translate(-50%, -50%)
        `;

        el.style.opacity = anchor.userData.visible && opacities
          ? opacities[i]
          : 0;
      }

      rafId = requestAnimationFrame(update);
    }

    update();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <Card
        ref={(el) => (cardRefs.current[0] = el)}
        width={`${effectiveCardWidth}px`}
        height={`${cardHeight}px`}
      >
        <Card1 />
      </Card>

      <Card
        ref={(el) => (cardRefs.current[1] = el)}
        width={`${effectiveCardWidth}px`}
        height={`${cardHeight}px`}
      >
        <Card2 />
      </Card>

      <Card
        ref={(el) => (cardRefs.current[2] = el)}
        width={`${effectiveCardWidth}px`}
        height={`${cardHeight}px`}
      >
        <Card3 />
      </Card>

    </div>
  );
}
