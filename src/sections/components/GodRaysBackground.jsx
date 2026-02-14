import { useEffect, useRef } from "react";

/* ======================================================
   TWEAKABLE PARAMETERS (ALL HERE)
   ====================================================== */

const PARAMS = {
  /* Scroll lifetime */
  scrollStart: 0,
  scrollEnd: 2500,

  /* Density */
  pxPerRay: 60,

  /* Geometry */
  meanWidth: 8,
  widthRandom: 10,       // set to 0 to disable randomness

  meanLength: 1.2,      // relative to screen height
  lengthRandom: 0.4,

  /* Position */
  meanY: 0.05,          // relative (0 = top)
  yRandom: 0.2,

  /* Motion */
  meanSpeed: 0.25,
  speedRandom: 0.15,

  /* Velocity variation */
  velocityJitter: 0.15,      // max +/- fraction of base speed
  velocityJitterSpeed: 0.3,   // how fast it fluctuates

  /* Angle (FIXED) */
  angle: 0.25,           // radians from vertical
  angleRandom: 0.0,     // keep at 0 for sharp angle

  /* Visual */
  opacity: 0.075,
  color: [255, 255, 255],
  opacityJitter: 0.2,        // ±8%
  opacityJitterSpeed: 0.2,     // very slow

  /* Animation */
  swayAmplitude: 50,
  swaySpeed: 0.6,

  /* Depth layering */
  depthOpacityMin: 0.4,
  depthOpacityMax: 0.6,

  depthWidthMin: 0.6,
  depthWidthMax: 1.2,

  depthSwayMin: 0.4,
  depthSwayMax: 1.0,

  depthSpeedMin: 0.6,
  depthSpeedMax: 1.0,
};

/* ======================================================
   RANDOMNESS (SELECTIVE)
   ====================================================== */

function rand(mean, spread) {
  if (spread === 0) return mean;
  return mean + (Math.random() - 0.5) * spread * 2;
}

/* ======================================================
   COMPONENT
   ====================================================== */

export default function GodRaysBackground({ scrollPx }) {
  const canvasRef = useRef(null);
  const raysRef = useRef([]);
  const timeRef = useRef(0);
  const scrollPxRef = useRef(0);

  /* =========================
     Sync scroll (NO rerender)
     ========================= */

  useEffect(() => {
    scrollPxRef.current = scrollPx;
  }, [scrollPx]);

  /* =========================
     Main effect (ONE LOOP)
     ========================= */

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let rafId;
    let lastTime = performance.now();

  function computeOpacity(px) {
    const fadeDistance = window.innerHeight;

    // Phase 1: fade in
    if (px < fadeDistance) {
      return px / fadeDistance;
    }

    // Phase 2: original behavior
    if (px >= PARAMS.scrollEnd) return 0;

    const t =
      (px - PARAMS.scrollStart) /
      (PARAMS.scrollEnd - PARAMS.scrollStart);

    return Math.sin(Math.PI * t);
  }


    function initRays(width, height) {
      const count = Math.max(1, Math.floor(width / PARAMS.pxPerRay));

      raysRef.current = Array.from({ length: count }, () => {
        const depth = Math.random();
        const angle = rand(PARAMS.angle, PARAMS.angleRandom);

        // Angle is from vertical → convert to canvas rotation
        const dirX = Math.sin(angle);
        const dirY = Math.cos(angle);

        return {
          x: Math.random() * width,
          y: rand(
            height * PARAMS.meanY,
            height * PARAMS.yRandom
          ),

          opacityPhase: Math.random() * Math.PI * 2,

          width: rand(PARAMS.meanWidth, PARAMS.widthRandom),
          length:
            height *
            rand(PARAMS.meanLength, PARAMS.lengthRandom),

          baseSpeed: rand(PARAMS.meanSpeed, PARAMS.speedRandom),
          speedPhase: Math.random() * Math.PI * 2,

          angle,
          dirX,
          dirY,

          phase: Math.random() * Math.PI * 2,
          depth
        };
      });
    }

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;

      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;

      initRays(width, height);
    }

    function draw() {
      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      timeRef.current += delta;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const opacity = computeOpacity(scrollPxRef.current);
      if (opacity > 0) {
        for (const r of raysRef.current) {
          const depthOpacity =
              PARAMS.depthOpacityMin +
              r.depth * (PARAMS.depthOpacityMax - PARAMS.depthOpacityMin);

          const opacityWave =
              1 +
              Math.sin(
                  timeRef.current * PARAMS.opacityJitterSpeed +
                  r.opacityPhase
              ) * PARAMS.opacityJitter;

          ctx.globalAlpha =
              opacity *
              PARAMS.opacity *
              depthOpacity *
              opacityWave;
        }

        for (const r of raysRef.current) {

          // smooth per-ray speed variation
          const speedFactor =
            1 +
            Math.sin(
              timeRef.current * PARAMS.velocityJitterSpeed +
              r.speedPhase
            ) * PARAMS.velocityJitter;

          // effective speed
          const depthSpeed =
            PARAMS.depthSpeedMin +
            r.depth * (PARAMS.depthSpeedMax - PARAMS.depthSpeedMin);

          const speed =
            r.baseSpeed *
            speedFactor *
            depthSpeed;

          const depthSway =
            PARAMS.depthSwayMin +
            r.depth * (PARAMS.depthSwayMax - PARAMS.depthSwayMin);

          const sway =
            Math.sin(timeRef.current * PARAMS.swaySpeed + r.phase) *
            PARAMS.swayAmplitude *
            depthSway;

          const depthWidth =
            r.width *
            (PARAMS.depthWidthMin +
             r.depth * (PARAMS.depthWidthMax - PARAMS.depthWidthMin));

          // advance along ray direction
          const x = r.x + sway * r.dirX + speed * timeRef.current * r.dirX;
          const y = r.y + sway * r.dirY + speed * timeRef.current * r.dirY;

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(r.angle);

          const gradient = ctx.createLinearGradient(0, 0, 0, r.length);
          gradient.addColorStop(0.0, "rgba(255,255,255,0.0)");
          gradient.addColorStop(0.4, "rgba(255,255,255,0.6)");
          gradient.addColorStop(1.0, "rgba(255,255,255,0.0)");

          ctx.fillStyle = gradient;
          ctx.fillRect(-depthWidth * 0.5, 0, depthWidth, r.length);

          ctx.restore();
        }
      }

      rafId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* =========================
     Render
     ========================= */

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none"
      }}
    />
  );
}
