import * as THREE from "three";

/**
 * Underwater lighting system
 * All parameters are centralized here.
 */
export function createLightingSystem(scene) {
  /* =========================
     Tunable parameters
     ========================= */

  const params = {
    // Ambient light
    ambient: {
      surfaceIntensity: 1,
      deepIntensity: 1,
      color: new THREE.Color(0x4fa3ff) // soft underwater blue
    },

    // Directional (sunlight from above)
    directional: {
      surfaceIntensity: 1.5,
      deepIntensity: 0.1,
      color: new THREE.Color(0xffffff),
      position: new THREE.Vector3(0, 10, 5)
    },

    // Global color grading
    colorShift: {
      surfaceColor: new THREE.Color(0xffffff),
      deepColor: new THREE.Color(0x0b1e2d) // deep ocean blue
    }
  };

  /* =========================
     Lights
     ========================= */

  const ambientLight = new THREE.AmbientLight(
    params.ambient.color,
    params.ambient.surfaceIntensity
  );
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(
    params.directional.color,
    params.directional.surfaceIntensity
  );
  directionalLight.position.copy(params.directional.position);
  scene.add(directionalLight);

  /* =========================
     Helpers
     ========================= */

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function lerpColor(out, c1, c2, t) {
    out.copy(c1).lerp(c2, t);
  }

  /* =========================
     Public API
     ========================= */

  return {
    /**
     * depth: normalized value [0, 1]
     * 0 = surface
     * 1 = deepest point
     */
    update(depth) {
      // Clamp defensively
      depth = THREE.MathUtils.clamp(depth, 0, 1);

      // Ambient light fades with depth
      ambientLight.intensity = lerp(
        params.ambient.surfaceIntensity,
        params.ambient.deepIntensity,
        depth
      );

      // Directional light fades faster (sunlight dies quickly underwater)
      directionalLight.intensity = lerp(
        params.directional.surfaceIntensity,
        params.directional.deepIntensity,
        depth
      );

    },

    /**
     * Expose params so you can tweak them live later
     */
    params
  };
}
