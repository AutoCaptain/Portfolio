import { useEffect, useRef } from "react";
import createScene from "./Scene";
import createTimeline from "./Timeline";
import scrollSource from "./ScrollSource";

export default function Orchestration({ cardsAnchorRef, cameraRef }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Attach scroll source to the section
    const section = container.closest("section");
    if (section) scrollSource.attach(section);

    // Create Three.js scene
    const scene = createScene(container);
    requestAnimationFrame(() => {
      scene.updateCardsAnchor1?.(0);
      scene.updateCardsAnchor2?.(0);
    });
    if (cameraRef) {
      cameraRef.current = scene.camera;
    }

    // expose anchors to React
    if (cardsAnchorRef) {
      cardsAnchorRef.current = [
        ...(scene.cardsAnchors1 ?? []),
        ...(scene.cardsAnchors2 ?? []),
        ...(scene.cardsAnchors3 ?? [])
      ];
    }

    // Create timeline (the manager of everything)
    const timeline = createTimeline({
      subPath: scene.subPath,
      submarineSystem: scene.submarineSystem,

      auvPath: scene.auvPath,
      // auvSystem: scene.auvSystem,

      lightingSystem: scene.lightingSystem,
      visionText: scene.visionText,
      updateCardsAnchor1: scene.updateCardsAnchor1,
      updateCardsAnchor2: scene.updateCardsAnchor2,
      updateCardsAnchor3: scene.updateCardsAnchor3,
    });

    function resync() {
      timeline.update(0); // delta irrelevant, forces re-eval
      scene.render();
    }

    window.addEventListener("resize", resync);
    window.addEventListener("orientationchange", resync);

    let lastTime = performance.now();
    let rafId;

    function animate(time) {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      timeline.update(delta);
      scene.render();

      rafId = requestAnimationFrame(animate);
    }

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resync);
      window.removeEventListener("orientationchange", resync);
      cancelAnimationFrame(rafId);
      scrollSource.detach();
      scene.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%"
      }}
    />
  );
}
