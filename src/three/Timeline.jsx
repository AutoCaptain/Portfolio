import scrollSource from "./ScrollSource";
import * as THREE from "three";

export default function createTimeline({
  subPath,
  submarineSystem,
  lightingSystem,
  visionText,
  updateCardsAnchor1,
  updateCardsAnchor2,
  updateCardsAnchor3,
}) {

  // temp vectors reused every frame
  const tmpPosition = new THREE.Vector3();
  const tmpQuaternion = new THREE.Quaternion();

  // --------------------
  // Timeline tracks
  // --------------------

  const tracks = [
    // Submarine path motion

    {
      type: "path",
      start: 0.0,
      end: 0.6,
      update(p) {
        subPath.updatePath("path0", p);
        subPath.getTransform(tmpPosition, tmpQuaternion);
        submarineSystem.setTransform(tmpPosition, tmpQuaternion);
      }
    },

    {
      type: "path",
      start: 0.6,
      end: 1.2,
      update(p) {
        subPath.updatePath("path1", p);
        subPath.getTransform(tmpPosition, tmpQuaternion);
        submarineSystem.setTransform(tmpPosition, tmpQuaternion);
      }
    },

    {
      type: "path",
      start: 1.2,
      end: 2.2,
      update(p) {
        subPath.updatePath("path2", p);
        subPath.getTransform(tmpPosition, tmpQuaternion);
        submarineSystem.setTransform(tmpPosition, tmpQuaternion);
      }
    },

    {
      type: "path",
      start: 2.2,
      end: 2.5,
      update(p) {
        subPath.updatePath("path3", p);
        subPath.getTransform(tmpPosition, tmpQuaternion);
        submarineSystem.setTransform(tmpPosition, tmpQuaternion);
      }
    },

    {
      type: "path",
      start: 2.5,
      end: 2.9,
      update(p) {
        subPath.updatePath("path4", p);
        subPath.getTransform(tmpPosition, tmpQuaternion);
        submarineSystem.setTransform(tmpPosition, tmpQuaternion);
      }
    },

    {
      type: "path",
      start: 2.9,
      end: 3.9,
      update(p) {
        subPath.updatePath("path5", p);
        subPath.getTransform(tmpPosition, tmpQuaternion);
        submarineSystem.setTransform(tmpPosition, tmpQuaternion);
      }
    },

    {
      type: "path",
      start: 3.9,
      end: 4.5,
      update(p) {
        subPath.updatePath("path6", p);
        subPath.getTransform(tmpPosition, tmpQuaternion);
        submarineSystem.setTransform(tmpPosition, tmpQuaternion);
      }
    },

    {
      type: "path",
      start: 4.5,
      end: 5.2,
      update(p) {
        subPath.updatePath("path7", p);
        subPath.getTransform(tmpPosition, tmpQuaternion);
        submarineSystem.setTransform(tmpPosition, tmpQuaternion);
      }
    },

    {
      type: "path",
      start: 5.2,
      end: 6,
      update(p) {
        subPath.updatePath("path8", p);
        subPath.getTransform(tmpPosition, tmpQuaternion);
        submarineSystem.setTransform(tmpPosition, tmpQuaternion);
      }
    },

    {
      start: 0.0,
      end: 1.0,
      update(p) {
        visionText.update(p);
      }
    },

    {
      start: 1.1,
      end: 2.25,
      update(p) {
        updateCardsAnchor1(p);
      }
    },

    {
      start: 2.8,
      end: 3.95,
      update(p) {
        updateCardsAnchor2(p);
      }
    },

    {
      start: 5.0,
      end: 6.0,
      update(p) {
        updateCardsAnchor3(p);
      }
    },

    {
      start: 2.2,
      end: 5.0,
      update(p) {
        submarineSystem.setLightsEnabled(p > 0);
      }
    },

    {
      start: 0.0,
      end: 5.0,
      update(p) {
        lightingSystem.update(p);
      }
    },

  ];

  // --------------------
  // Execution
  // --------------------

  function update(delta) {
    const t = scrollSource.getTime();

    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];

      // --- PATH TRACKS (exclusive) ---
      if (track.type === "path") {
        if (t < track.start || t > track.end) continue;

        const p = (t - track.start) / (track.end - track.start);
        track.update(p);
        continue;
      }

      // --- NON-PATH TRACKS (clamped) ---
      let p;
      if (track.start === track.end) {
        p = t >= track.start ? 1 : 0;
      } else if (t < track.start) {
        p = 0;
      } else if (t > track.end) {
        p = 1;
      } else {
        p = (t - track.start) / (track.end - track.start);
      }

      track.update(p);
    }
    submarineSystem.update(delta);
    submarineSystem.update(delta);
  }

  return {
    update
  };
}
