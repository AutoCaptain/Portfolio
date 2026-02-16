import * as THREE from "three";

export function addCapInteriorLight(subRoot, scene) {
  const cap = subRoot.getObjectByName("cap");

  if (!cap) {
    console.warn("Cap interior light: object 'cap' not found");
    return null;
  }

  // Ensure transforms are valid before any world-space queries
  cap.updateMatrixWorld(true);

  // --- Compute cap interior position (local space) ---
  const capBox = new THREE.Box3().setFromObject(cap);
  const capCenterWorld = capBox.getCenter(new THREE.Vector3());
  const capCenterLocal = cap.worldToLocal(capCenterWorld.clone());

  const capSize = capBox.getSize(new THREE.Vector3());

  // --- SpotLight ---
  const spotLight = new THREE.SpotLight(
    0xffffff,      // color
    5.0,           // intensity
    80,           // distance
    Math.PI / 4,   // angle
    0.4,           // penumbra
    1.0            // decay
  );

  spotLight.name = "CapInteriorSpotLight";
  spotLight.castShadow = false;
  spotLight.visible = false;

  // Position light slightly inside the cap
  spotLight.position.copy(capCenterLocal);
  spotLight.position.y += capSize.y * 10;
  spotLight.position.y += 0;
  const Y_OFFSET = 0; // units in cap local space
  spotLight.position.y += Y_OFFSET;

  const Z_OFFSET = 50; // units in cap local space
  spotLight.position.z += Z_OFFSET;
  // --- Target ---
  const target = new THREE.Object3D();
  target.name = "CapInteriorSpotTarget";

  // Aim downward into the sub interior (local space)
  target.position.set(
    capCenterLocal.x,
    capCenterLocal.y,
    capCenterLocal.z
  );

  // Parent everything to the cap
  cap.add(spotLight);
  cap.add(target);

  spotLight.target = target;

  const angle = 0.0; // radians

  // vector from light to target (local space)
  const dir = target.position.clone().sub(spotLight.position);

  // rotate direction vector
  dir.applyAxisAngle(new THREE.Vector3(1, 0, 0), angle);

  // reapply target position
  target.position.copy(spotLight.position).add(dir);

  // required update
  target.updateMatrixWorld(true);

  spotLight.target.updateMatrixWorld(true);


  // Store references for per-frame updates
  spotLight.userData.target = target;

  return spotLight;
}



export function createSubLights(subRoot) {
  const LIGHTS = [
    // FRONT beams
    {
      name: "Light_F_L",
      beamDir: -1,
      color: 0x88bfff,
      beamOffset: -70,
      beamLength: 250,
      beamOpacity: 0.4
    },
    {
      name: "Light_F_R",
      beamDir: -1,
      color: 0x88bfff,
      beamOffset: -70,
      beamLength: 250,
      beamOpacity: 0.4
    },

    // BACK beams
    {
      name: "Light_B_RL",
      beamDir: 1,
      color: 0xff4444,
      beamOffset: -50,
      beamLength: 120,
      beamOpacity: 0.25
    },
    {
      name: "Light_B_LL",
      beamDir: 1,
      color: 0xff4444,
      beamOffset: -50,
      beamLength: 120,
      beamOpacity: 0.25
    },
    {
      name: "Light_B_LR",
      beamDir: 1,
      color: 0xff4444,
      beamOffset: -50,
      beamLength: 120,
      beamOpacity: 0.25
    },
    {
      name: "Light_B_RR",
      beamDir: 1,
      color: 0xff4444,
      beamOffset: -50,
      beamLength: 120,
      beamOpacity: 0.25
    }
  ];

  const beams = [];

  // Shared low-poly cone (unit size, scaled per beam)
  const sharedBeamGeometry = new THREE.ConeGeometry(1, 1, 16, 1, true);

  LIGHTS.forEach(
    ({ name, beamDir, color, beamOffset, beamLength, beamOpacity }) => {
      const anchor = subRoot.getObjectByName(name);

      if (!anchor) {
        console.warn(`SubLights: anchor not found: ${name}`);
        return;
      }

      // Compute cone radius from desired spread
      const spreadAngle = Math.PI / 12; // ~15°
      const beamRadius = Math.tan(spreadAngle) * beamLength;

      const beamMaterial = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: beamOpacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        fog: true
      });

      const beam = new THREE.Mesh(
        sharedBeamGeometry,
        beamMaterial
      );

      // Scale unit cone to desired size
      beam.scale.set(beamRadius, beamLength, beamRadius);

      // Orient cone so it points along local -Z or +Z
      beam.rotation.x = (Math.PI / 2) * beamDir;

      // Position so cone tip starts at anchor
      beam.position.z = beamOffset * beamDir;

      beam.visible = false;
      beam.castShadow = false;
      beam.receiveShadow = false;

      // Parent directly to anchor (no light, no target)
      anchor.add(beam);

      beams.push(beam);
    }
  );

  return {
    setEnabled(enabled) {
      beams.forEach((beam) => {
        beam.visible = enabled;
      });
    }
  };
}
