import * as THREE from "three";

export function createSubBubbleTrail(props, scene) {
  const bubbles = [];
  const spawnAccumulators = props.map(() => 0);
  const geometry = new THREE.SphereGeometry(0.1, 6, 6);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0,
    depthWrite: false
  });

  const spawnRate = 100; // bubbles/sec per prop
  let spawnAccumulator = 0;
  const BASE_LIFETIME = 2.0; // seconds
  const LIFETIME_JITTER = 1.0;
  const tmpPos = new THREE.Vector3();
  const tmpDir = new THREE.Vector3();

  function spawnFromProp(prop) {
    // Disc-shaped emission behind prop
    const radius = 1;
    const angle = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * radius;

    tmpPos.set(
      Math.cos(angle) * r,
      Math.sin(angle) * r,
      -0.15 // behind prop (local Z)
    );

    // Convert to world space
    prop.localToWorld(tmpPos);

    const mesh = new THREE.Mesh(
      geometry,
      material.clone()
    );
    mesh.position.copy(tmpPos);
    mesh.material.transparent = true;
    mesh.material.depthWrite = false;
    mesh.material.depthTest = true;

    // Base backward + upward direction (local space)
    tmpDir.set(0, 0.15, -0.4);

    // Add angular spread BEFORE world transform
    const spread = 0.25; // ← increase for more spread
    tmpDir.x += (Math.random() - 0.5) * spread;
    tmpDir.y += (Math.random() - 0.5) * spread;
    tmpDir.z += (Math.random() - 0.5) * spread * 0.2;

    // Normalize so speed stays consistent
    tmpDir.normalize();

    // Transform to world space
    tmpDir.applyQuaternion(prop.getWorldQuaternion(new THREE.Quaternion()));

    // Final speed scale
    tmpDir.multiplyScalar(0.4);


    scene.add(mesh);

    bubbles.push({
      mesh,
      velocity: tmpDir.clone(),
      age: 0,
      lifetime: BASE_LIFETIME + Math.random() * LIFETIME_JITTER
    });
  }

  return {
    update(delta, intensity = 0) {

      // --- SPAWN (velocity-dependent) ---
      if (intensity > 0) {
        props.forEach((prop, index) => {
          if (!prop) return;

          spawnAccumulators[index] += delta * spawnRate * intensity;

          while (spawnAccumulators[index] >= 1) {
            spawnFromProp(prop);
            spawnAccumulators[index] -= 1;
          }
        });
      }

      // --- UPDATE EXISTING BUBBLES (ALWAYS RUN) ---
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.age += delta;

        b.mesh.position.addScaledVector(b.velocity, delta);
        b.mesh.scale.multiplyScalar(1 + delta * 0.4);

        const t = b.age / b.lifetime;
        b.mesh.material.opacity = 0.4 * (1 - t);

        if (b.age >= b.lifetime) {
          scene.remove(b.mesh);
          bubbles.splice(i, 1);
        }
      }
    }


  };
}
