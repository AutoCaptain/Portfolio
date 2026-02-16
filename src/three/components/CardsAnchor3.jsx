import * as THREE from "three";

export function createCardsAnchor3(scene) {
  const anchor = new THREE.Object3D();
  anchor.position.set(0, -7.5, 0);
  scene.add(anchor);

  // mirror existing anchor metadata shape
  anchor.userData.visible = false;
  anchor.userData.cardFocus = {
    index: 0,
    strength: 1,
    opacities: [1],
  };

  /**
   * Timeline-controlled update
   * progress expected in [0, 1]
   * visible only from ~5.0 to 6.0
   */
  function update(progress) {
    const p = THREE.MathUtils.clamp(progress, 0, 1);

    // visible only in the window
    anchor.userData.visible = p > 0 && p < 1;

    // no motion, no recompute, no opacity math
    // anchor stays fixed in world space
  }

  return {
    anchors: [anchor],
    update,
    recompute() {
      /* noop – static */
    },
    dispose() {
      /* noop */
    }
  };
}
