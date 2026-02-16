import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createSubLights, addCapInteriorLight } from "./SubLights.jsx";
import { createSubProps } from "./SubProps.jsx";
import { createSubBubbleTrail } from "./SubBubbles.jsx";

export function createSubmarineSystem(scene, camera, renderer) {
  const loader = new GLTFLoader();

  let sub = null;
  let subProps = null;
  let bubbleTrail = null;
  let subLights = null;
  let capLight = null;
  let lightsEnabled = false;
  let pendingLightsEnabled = false;

  let lastPosition = new THREE.Vector3();
  let speed = 0;

  // --------------------
  // Load submarine
  // --------------------

  loader.load("/assets/sub.glb", (gltf) => {
    sub = gltf.scene;
    scene.add(sub);

    const box = new THREE.Box3().setFromObject(sub);
    const center = new THREE.Vector3();
    box.getCenter(center);

    sub.position.sub(center);
    sub.scale.setScalar(3.0);

    const propL = sub.getObjectByName("prop_F_L");
    const propR = sub.getObjectByName("prop_F_R");

    subLights = createSubLights(sub);
    capLight = addCapInteriorLight(sub, scene);
    subProps = createSubProps(sub);
    bubbleTrail = createSubBubbleTrail([propL, propR], scene);

    setLightsEnabled(pendingLightsEnabled);
    renderer.render(scene, camera);
  });

  // --------------------
  // Public API
  // --------------------

  function setTransform(position, quaternion) {
    if (!sub) return;

    // speed calculation (unchanged)
    if (lastPosition.lengthSq() === 0) {
      lastPosition.copy(position);
      speed = 0;
    } else {
      speed = position.distanceTo(lastPosition);
      lastPosition.copy(position);
    }

    sub.position.copy(position);
    sub.quaternion.copy(quaternion);
  }


  function update(delta) {
    if (!sub) return;

    if (capLight) {
      capLight.target.updateMatrixWorld();
      capLight.userData.helper?.update();
    }

    const velocity = speed / Math.max(delta, 1e-6);
    const normalizedSpeed = THREE.MathUtils.clamp(velocity / 5, 0, 1);

    subProps?.update(delta, normalizedSpeed);
    bubbleTrail?.update(delta, normalizedSpeed);
  }

  function setLightsEnabled(enabled) {
    pendingLightsEnabled = enabled;

    if (!subLights) return;

    if (lightsEnabled === enabled) return;

    subLights.setEnabled(enabled);
    if (capLight) capLight.visible = enabled;
    lightsEnabled = enabled;
  }

  return {
    setTransform,
    update,
    setLightsEnabled
  };
}
