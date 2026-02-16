import * as THREE from "three";

export function createSubPath(scene) {
  const position = new THREE.Vector3();
  const WORLD_UP = new THREE.Vector3(0, 1, 0);
  const up = new THREE.Vector3(0, 1, 0);
  const ORIENTATION_BLEND = 0.15;
  let pitch = 0;
  const orientation = new THREE.Quaternion();

  function buildCurveFromPoints(points) {
    return new THREE.CatmullRomCurve3(
      points.map(p => p.pos),
      false,
      "centripetal",
      0.5
    );
  }

  function resolveSegmentIndex(t, count) {
    if (t <= 0) return 0;
    if (t >= 1) return count - 2;
    return Math.min(
      count - 2,
      Math.floor(t * (count - 1))
    );
  }

  function segmentBounds(index, count) {
    const a = index / (count - 1);
    const b = (index + 1) / (count - 1);
    return [a, b];
  }

  function interpolateScalar(t, segmentIndex, points, key) {
    const a = points[segmentIndex];
    const b = points[segmentIndex + 1] ?? a;

    const v0 = a[key] ?? 0;
    const v1 = b[key] ?? v0;

    const segT = (t * (points.length - 1)) - segmentIndex;
    return THREE.MathUtils.lerp(v0, v1, segT);
  }

    // --------------------
  // PATH 0
  // --------------------

  const path0 = {
    lengthPx: 900,

    points: [
      { pos: new THREE.Vector3(5, -2, 55), yaw: 3.5, pitch: 0.1 },
      { pos: new THREE.Vector3(5, -2, 55), yaw: 3.5, pitch: 0.1 },
    ],

    pitch(t, segmentIndex) {
      const p = this.points[segmentIndex];
      return p.pitch ?? 0;
    },

    yaw(t, segmentIndex) {
      const p = this.points[segmentIndex];
      return p.yaw ?? 0;
    }
  };

  path0.curve = buildCurveFromPoints(path0.points);

  // --------------------
  // PATH 1
  // --------------------

  const path1 = {
    lengthPx: 600,

    points: [
      { pos: new THREE.Vector3(5, -2, 55), yaw: 3.5, pitch: 0.1 },
      { pos: new THREE.Vector3(-6, -5, 20), yaw: 3.5, pitch: 0.1 },
      { pos: new THREE.Vector3(-11, 0, 10), yaw: 3.3, pitch: 0.0 },
      { pos: new THREE.Vector3(-10, 7, 0), yaw: 2.3, pitch: 0.1 },
      { pos: new THREE.Vector3(-7, 8, 5), yaw: 0.5, pitch: 0.2 }
    ],

    pitch(t, segmentIndex) {
      const p = this.points[segmentIndex];
      return p.pitch ?? 0;
    },

    yaw(t, segmentIndex) {
      const p = this.points[segmentIndex];
      return p.yaw ?? 0;
    }
  };

  path1.curve = buildCurveFromPoints(path1.points);

  // --------------------
  // PATH 2 (pitch + yaw per point)
  // --------------------

  const path2 = {
    lengthPx: 700,

    points: [
      {pos: new THREE.Vector3(-7, 8, 5), yaw: 0.5, pitch: 0.2},
      {pos: new THREE.Vector3(-5, 8, 5), yaw: 0.375, pitch: 0.2},
      {pos: new THREE.Vector3(-3, 8, 5), yaw: 0.25, pitch: 0.2},
      {pos: new THREE.Vector3(-1, 8, 5), yaw: 0.125, pitch: 0.2},
      {pos: new THREE.Vector3(1, 8, 5), yaw: 0, pitch: 0.2},
      {pos: new THREE.Vector3(3, 8, 5), yaw: -0.125, pitch: 0.2},
      {pos: new THREE.Vector3(5, 8, 5), yaw: -0.25, pitch: 0.2},
      {pos: new THREE.Vector3(7, 8, 5), yaw: -0.375, pitch: 0.2},
      {pos: new THREE.Vector3(9, 6, 5), yaw: -0.5, pitch: 0.2},
    ],

    pitch(t, segmentIndex) {
      const p = this.points[segmentIndex];
      return p.pitch ?? 0;
    },

    yaw(t, segmentIndex) {
      const p = this.points[segmentIndex];
      return p.yaw ?? 0;
    }
  };

  path2.curve = buildCurveFromPoints(path2.points);

  // --------------------
  // PATH 3 (pitch + yaw per point)
  // --------------------

  const path3 = {
    lengthPx: 300,

    points: [
      {pos: new THREE.Vector3(9, 6, 5), yaw: -0.5, pitch: 0.2},
      {pos: new THREE.Vector3(9.5, 4, 5), yaw: -0.5, pitch: 0.1},
      {pos: new THREE.Vector3(10, 0, 5), yaw: -0.5, pitch: 0.0},
      {pos: new THREE.Vector3(9.5, -4, 6), yaw: -0.5, pitch: -0.1},
      {pos: new THREE.Vector3(9, -8, 8), yaw: -0.5, pitch: -0.2},
    ],

    pitch(t, segmentIndex) {
      const p = this.points[segmentIndex];
      return p.pitch ?? 0;
    },

    yaw(t, segmentIndex) {
      const p = this.points[segmentIndex];
      return p.yaw ?? 0;
    }
  };

  path3.curve = buildCurveFromPoints(path3.points);

  // --------------------
  // PATH 4 (pitch + yaw per point)
  // --------------------

  const path4 = {
    lengthPx: 400,

    points: [
      {pos: new THREE.Vector3(9, -8, 8), yaw: -0.5, pitch: -0.2},
      {pos: new THREE.Vector3(8.5, -9, 11), yaw: -1, pitch: -0.2},
      {pos: new THREE.Vector3(8, -10, 17), yaw: -1.5, pitch: -0.1},
      {pos: new THREE.Vector3(7.5, -9, 23), yaw: -2, pitch: -0.1},
      {pos: new THREE.Vector3(6.5, -8, 29), yaw: -2.5, pitch: -0.1},
      {pos: new THREE.Vector3(3, -7, 35), yaw: -3, pitch: -0.1},
    ],

    pitch(t, segmentIndex) {
      const p = this.points[segmentIndex];
      return p.pitch ?? 0;
    },

    yaw(t, segmentIndex) {
      const p = this.points[segmentIndex];
      return p.yaw ?? 0;
    }
  };

  path4.curve = buildCurveFromPoints(path4.points);

  // --------------------
  // PATH 5 (pitch + yaw per point)
  // --------------------

  const path5 = {
    lengthPx: 1000,

    points: [
      {pos: new THREE.Vector3(3, -7, 35), yaw: -3, pitch: -0.1},
      {pos: new THREE.Vector3(2, -7, 35), yaw: -3.05, pitch: -0.1},
      {pos: new THREE.Vector3(1, -7, 35), yaw: -3.09, pitch: -0.1},
      {pos: new THREE.Vector3(0, -7, 35), yaw: -3.14, pitch: -0.1},
      {pos: new THREE.Vector3(-1, -7, 35), yaw: -3.19, pitch: -0.1},
      {pos: new THREE.Vector3(-2, -7, 35), yaw: -3.23, pitch: -0.1},
      {pos: new THREE.Vector3(-3, -7, 35), yaw: -3.28, pitch: -0.1},
    ],

    pitch(t, segmentIndex) {
      const p = this.points[segmentIndex];
      return p.pitch ?? 0;
    },

    yaw(t, segmentIndex) {
      const p = this.points[segmentIndex];
      return p.yaw ?? 0;
    }
  };

  path5.curve = buildCurveFromPoints(path5.points);

  // --------------------
  // PATH 6 (pitch + yaw per point)
  // --------------------

  const path6 = {
    lengthPx: 400,

    points: [
      {pos: new THREE.Vector3(-3, -7, 35), yaw: -3.28, pitch: -0.1},
      {pos: new THREE.Vector3(-4, -5, 31), yaw: -3.78, pitch: -0.05},
      {pos: new THREE.Vector3(-5, -3, 27), yaw: -4.38, pitch: 0},
      {pos: new THREE.Vector3(-6, -1, 24), yaw: -4.88, pitch: 0.1},
      {pos: new THREE.Vector3(-6, 1, 20), yaw: -5.58, pitch: 0.2},
    ],

    pitch(t, segmentIndex) {
      const p = this.points[segmentIndex];
      return p.pitch ?? 0;
    },

    yaw(t, segmentIndex) {
      const p = this.points[segmentIndex];
      return p.yaw ?? 0;
    }
  };

  path6.curve = buildCurveFromPoints(path6.points);

  // --------------------
  // PATH 7 (pitch + yaw per point)
  // --------------------

  const path7 = {
    lengthPx: 1000,

    points: [
      {pos: new THREE.Vector3(-6, 2, 20), yaw: -5.58, pitch: 0.2},
      {pos: new THREE.Vector3(0, 3, 20), yaw: -6, pitch: 0.1},
      {pos: new THREE.Vector3(0, 3, 20), yaw: -6.28, pitch: 0.1},
    ],

    pitch(t, segmentIndex) {
      const p = this.points[segmentIndex];
      return p.pitch ?? 0;
    },

    yaw(t, segmentIndex) {
      const p = this.points[segmentIndex];
      return p.yaw ?? 0;
    }
  };

  path7.curve = buildCurveFromPoints(path7.points);

  // --------------------
  // PATH 8 (pitch + yaw per point)
  // --------------------

  const path8 = {
    lengthPx: 800,

    points: [
      {pos: new THREE.Vector3(0, 3, 20), yaw: -6.28, pitch: 0.1},
      {pos: new THREE.Vector3(0, 2, 28), yaw: -6.28, pitch: 0.1},
      {pos: new THREE.Vector3(0, 1, 38), yaw: -6.28, pitch: 0.1},
      {pos: new THREE.Vector3(0, -0.6, 60), yaw: -6.28, pitch: 0.1},
    ],

    pitch(t, segmentIndex) {
      const p = this.points[segmentIndex];
      return p.pitch ?? 0;
    },

    yaw(t, segmentIndex) {
      const p = this.points[segmentIndex];
      return p.yaw ?? 0;
    }
  };

  path8.curve = buildCurveFromPoints(path8.points);

  const paths = { path0, path1, path2, path3, path4, path5, path6, path7, path8 };

  // --------------------
  // Public API
  // --------------------

  function updatePath(name, progress) {
    const path = paths[name];
    if (!path) return;

    const t = THREE.MathUtils.clamp(progress, 0, 1);

    path.curve.getPointAt(t, position);

    if (path.points) {
      const count = path.points.length;
      const segmentIndex = resolveSegmentIndex(t, count);
      const [segStart, segEnd] = segmentBounds(segmentIndex, count);
      const point = path.points[segmentIndex];
      const yaw = interpolateScalar(t, segmentIndex, path.points, "yaw");
      const pitchVal = interpolateScalar(t, segmentIndex, path.points, "pitch");

      orientation.identity();

      // yaw (world Y)
      orientation.setFromAxisAngle(WORLD_UP, yaw);

      // pitch (local X)
      const qPitch = new THREE.Quaternion();
      qPitch.setFromAxisAngle(new THREE.Vector3(1, 0, 0), pitchVal);
      orientation.multiply(qPitch);
    } else {
      pitch = path.pitch(t);
    }
  }

  function getTransform(outPosition, outQuaternion) {
    outPosition.copy(position);
    outQuaternion.copy(orientation);
  }

  return {
    updatePath,
    getTransform
  };
}
