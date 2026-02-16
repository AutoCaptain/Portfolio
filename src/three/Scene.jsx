import * as THREE from "three";
import { createSubPath } from "./Submarine/SubPath.jsx";
import { createSubmarineSystem } from "./Submarine/SubmarineSystem";
import { createLightingSystem } from "./LightingSystem";
import createVisionText from "./components/VisionText/VisionText.jsx";
import { createCardsAnchor1 } from "./components/CardsAnchor1.jsx";
import { createCardsAnchor2 } from "./components/CardsAnchor2.jsx";
import { createCardsAnchor3 } from "./components/CardsAnchor3.jsx";

export default function createScene(container) {
  // --------------------
  // Scene & camera
  // --------------------

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x041421, 0, 200);

  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 50);
  camera.lookAt(0, 0, 0);

  // --------------------
  // Renderer
  // --------------------

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  renderer.domElement.style.position = "relative";
  renderer.domElement.style.zIndex = "2";

  // --------------------
  // Systems
  // --------------------

  const subPath = createSubPath(scene);
  const lightingSystem = createLightingSystem(scene);
  const submarineSystem = createSubmarineSystem(scene, camera, renderer);
  const visionText = createVisionText(container);
  const cardsAnchor1 = createCardsAnchor1(scene, camera, renderer, {
    getCardWidthPx: () => {
      const vw = window.innerWidth;
      return vw < 360 ? Math.max(320, vw * 0.95) : 360;
    },
    gapPx: 25,
  });
  const cardsAnchor2 = createCardsAnchor2(scene, camera, renderer, {
    getCardWidthPx: () => {
      const vw = window.innerWidth;
      return vw < 360 ? Math.max(320, vw * 0.95) : 360;
    },
    gapPx: 25,
  });
  const cardsAnchor3 = createCardsAnchor3(scene, camera, renderer, {
    getCardWidthPx: () => {
      const vw = window.innerWidth;
      return vw < 360 ? Math.max(320, vw * 0.95) : 600;
    },
  });
  // --------------------
  // Resize
  // --------------------

  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;

    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);

    cardsAnchor1.recompute();
    cardsAnchor2.recompute();
    cardsAnchor3.recompute();
  }


  window.addEventListener("resize", resize);

  // --------------------
  // Public API
  // --------------------

  return {
    scene,
    camera,
    renderer,
    visionText,

    subPath,
    submarineSystem,

    lightingSystem,

    cardsAnchors1: cardsAnchor1.anchors,
    updateCardsAnchor1: cardsAnchor1.update,
    cardsAnchors2: cardsAnchor2.anchors,
    updateCardsAnchor2: cardsAnchor2.update,
    cardsAnchors3: cardsAnchor3.anchors,
    updateCardsAnchor3: cardsAnchor3.update,

    render() {
      renderer.render(scene, camera);
    },

    dispose() {
      window.removeEventListener("resize", resize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      visionText.dispose();
    }
  };
}
