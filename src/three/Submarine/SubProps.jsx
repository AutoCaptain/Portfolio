import * as THREE from "three";

export function createSubProps(submarine) {
  const propLeft = submarine.getObjectByName("prop_F_L");
  const propRight = submarine.getObjectByName("prop_F_R");

  if (!propLeft || !propRight) {
    console.warn("Sub propellers not found");
  }

  const IDLE_RPS = 0.25;        // 1 rotation per second when stopped
  const MAX_RPS = 10.0;        // max additional RPS at full speed

  return {
    update(delta, intensity = 0) {
      // Clamp intensity just in case
      const t = THREE.MathUtils.clamp(intensity, 0, 1);

      // Total rotations per second
      const rps = IDLE_RPS + MAX_RPS * t;

      const angle = rps * Math.PI * 2 * delta;

      if (propLeft) {
        propLeft.rotation.z += angle;
      }

      if (propRight) {
        propRight.rotation.z -= angle;
      }
    }
  };
}

