import { useEffect, useRef } from "react";
import * as THREE from "three";
import Card from "../cards/CardWrapper.jsx";
import Card7 from "../cards/Card7.jsx";

export default function CardLayer3({
  anchorsRef,
  cameraRef,
  anchorIndex = 2,
  cardHeight = 400,
}) {
  const cardRef = useRef(null);
  const tmpVec = useRef(new THREE.Vector3());

  const viewportWidth = window.innerWidth;

  const effectiveCardWidth =
    viewportWidth < 600
      ? 320
      : 600;

  const effectiveCardHeight =
    viewportWidth < 600
      ? 340
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
      const el = cardRef.current;

      if (!anchor || !el) {
        rafId = requestAnimationFrame(update);
        return;
      }

      const w = window.innerWidth;
      const h = window.innerHeight;

      anchor.getWorldPosition(tmpVec.current);
      tmpVec.current.project(camera);

      const x = (tmpVec.current.x * 0.5 + 0.5) * w;
      const y = (-tmpVec.current.y * 0.5 + 0.5) * h;

      el.style.transform = `
        translate3d(${x}px, ${y}px, 0)
        translate(-50%, -50%)
      `;

      el.style.opacity = anchor.userData.visible ? 1 : 0;

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
        ref={cardRef}
        width={`${effectiveCardWidth}px`}
        height={`${effectiveCardHeight}px`}
      >
        <Card7 />
      </Card>
    </div>
  );
}
