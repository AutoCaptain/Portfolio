import * as THREE from "three";

export function createCardsAnchor2(scene, camera, renderer, {
  getCardWidthPx,
  gapPx,
}) {
  const anchor = new THREE.Object3D();
  scene.add(anchor);

  anchor.userData.visible = false;
    anchor.userData.cardFocus = {
      index: 1,
      strength: 0,
      opacities: [0, 0, 0], // per-card opacity
    };

  // --------------------
  // Path
  // --------------------

  const curve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-50, 7.5, 0),
      new THREE.Vector3(0, 7.5, 0),
      new THREE.Vector3(50, 7.5, 0),
    ],
    false,
    "centripetal",
    0.5
  );

  // --------------------
  // Timeline constants
  // --------------------

  const MOVE = 0.10;
  const HOLD = 0.25;
  const OPACITY_CENTER = 1.0;
  const OPACITY_SIDE = 0.75;
  let lastProgress = 0;

  function computeSnapTs() {
      const fovRad = THREE.MathUtils.degToRad(camera.fov);
      const distance = Math.abs(camera.position.z - anchor.position.z);
      const viewportHeight = renderer.domElement.clientHeight;

      const worldPerPixel =
        (2 * distance * Math.tan(fovRad / 2)) / viewportHeight;

      const spacingPx = getCardWidthPx() + gapPx;
      const spacingWorld = spacingPx * worldPerPixel;

      const start = curve.getPoint(0, new THREE.Vector3());
      const end = curve.getPoint(1, new THREE.Vector3());
      const pathLength = end.x - start.x;

      const snapWorldXs = [
        -spacingWorld,
        0,
        spacingWorld,
      ];

      return snapWorldXs.map(x =>
        THREE.MathUtils.clamp(
          (x - start.x) / pathLength,
          0,
          1
        )
      );
    }

    let SNAP_T = computeSnapTs();

    const ro = new ResizeObserver(() => {
      SNAP_T = computeSnapTs();
      recompute();
    });

    ro.observe(renderer.domElement);

    function getClosestSnapIndex(curveT) {
      let closest = 0;
      let minDist = Infinity;

      for (let i = 0; i < SNAP_T.length; i++) {
        const d = Math.abs(curveT - SNAP_T[i]);
        if (d < minDist) {
          minDist = d;
          closest = i;
        }
      }

      return closest;
    }

    function recompute() {
      if (!curve || SNAP_T.length < 3) return;
      // only recompute SNAP_T, never move the anchor
    }

  // --------------------
  // Build timeline segments
  // --------------------

  const segments = [
    { type: "move", from: 0.0, to: SNAP_T[0], duration: MOVE },
    { type: "hold", at: SNAP_T[0], duration: HOLD },

    { type: "move", from: SNAP_T[0], to: SNAP_T[1], duration: MOVE },
    { type: "hold", at: SNAP_T[1], duration: HOLD },

    { type: "move", from: SNAP_T[1], to: SNAP_T[2], duration: MOVE },
    { type: "hold", at: SNAP_T[2], duration: HOLD },

    { type: "move", from: SNAP_T[2], to: 1.0, duration: MOVE },
  ];

  const totalDuration = segments.reduce(
    (sum, s) => sum + s.duration,
    0
  );

  function smoothstep(t) {
    return t * t * (3 - 2 * t);
  }

  // --------------------
  // Update
  // --------------------

  function update(progress) {
    lastProgress = progress;
      const p = THREE.MathUtils.clamp(progress, 0, 1);

      anchor.userData.visible = p > 0 && p < 1;

      // --------------------
      // Compute curveT from timeline
      // --------------------

      let time = p * totalDuration;
      let curveT = 0;

      for (const segment of segments) {
        if (time > segment.duration) {
          time -= segment.duration;
          continue;
        }

        if (segment.type === "hold") {
          curveT = segment.at;
        } else {
          const t = smoothstep(time / segment.duration);
          curveT = THREE.MathUtils.lerp(segment.from, segment.to, t);
        }

        break;
      }

      // --------------------
      // Active card = spatially closest snap
      // --------------------

      const activeIndex = 2 - getClosestSnapIndex(curveT);
      anchor.userData.cardFocus.index = activeIndex;

      // --------------------
      // Opacity (purely spatial)
      // --------------------

      const opacities = [0, 0, 0];

      // Fade in before first snap
      if (curveT < SNAP_T[0]) {
        const t = THREE.MathUtils.clamp(curveT / SNAP_T[0], 0, 1);
        for (let i = 0; i < 3; i++) {
          opacities[i] = THREE.MathUtils.lerp(
            0,
            i === activeIndex ? OPACITY_CENTER : OPACITY_SIDE,
            t
          );
        }
      }

      // Fade out after last snap
      else if (curveT > SNAP_T[2]) {
        const t = THREE.MathUtils.clamp(
          (1 - curveT) / (1 - SNAP_T[2]),
          0,
          1
        );
        for (let i = 0; i < 3; i++) {
          opacities[i] = THREE.MathUtils.lerp(
            0,
            i === activeIndex ? OPACITY_CENTER : OPACITY_SIDE,
            t
          );
        }
      }

      // Stable middle region
      else {
        for (let i = 0; i < 3; i++) {
          opacities[i] = i === activeIndex
            ? OPACITY_CENTER
            : OPACITY_SIDE;
        }
      }

      anchor.userData.cardFocus.opacities = opacities;

      // --------------------
      // Apply position
      // --------------------

      curve.getPointAt(curveT, anchor.position);
    }


    return {
      anchors: [anchor],
      update,
      recompute,
      dispose() {
        ro.disconnect();
      }
    };
}
