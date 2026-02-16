import createVisionTextShader from "./VisionTextShader";

export default function createVisionText(container) {

  // --------------------
  // Offscreen text cache
  // --------------------
  const textCanvas = document.createElement("canvas");
  const textCtx = textCanvas.getContext("2d");

  // --------------------
  // Constants
  // --------------------
  const LAYERS = [
    { angle: 0 },
    { angle: 2.094 }, // 120°
    { angle: 4.189 }  // 240°
  ];

  const LAYER_OPACITY = 1 / 3;
  const DISSOLVE_DISTANCE = 5;

  const TRACK_LENGTH = 1.0;
  const FADE_LENGTH = 0.25;
  const FADE_FRAC = FADE_LENGTH / TRACK_LENGTH;

  const MAX_BLUR_PX = 5; // keep cheap

  const TYPOGRAPHY_MAX_WIDTH = 900;
  const FONT_SCALE = 1.0;
  const BASE_TITLE_SIZE = 36;
  const BASE_BODY_SIZE  = 18;
  const MAX_TEXT_WIDTH = 1080;
  const TITLE_BODY_GAP = 0.6;

  // --------------------
  // State
  // --------------------

  let dpr = window.devicePixelRatio || 1;
  let width = 0;
  let height = 0;
  let dissolveP = 0;

  // --------------------
  // Utils
  // --------------------

  function getResponsiveFactor(width, height) {
    const widthFactor = getViewportFactor(width);

    // Portrait penalty: softly suppress scaling
    const portraitPenalty = height > width ? 0.45 : 1.0;

    return Math.max(0.35, widthFactor * portraitPenalty);
  }

  function getViewportFactor(width) {
    const minW = 360;
    const maxW = TYPOGRAPHY_MAX_WIDTH;

    if (width <= minW) return width / minW * 0.5;
    return Math.min((width - minW) / (maxW - minW), 1);
  }

  // --------------------
  // Resize
  // --------------------

  function resize() {
    const rect = container.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = window.devicePixelRatio || 1;

    textCanvas.width  = Math.floor(width * dpr);
    textCanvas.height = Math.floor(height * dpr);

    textCtx.setTransform(1, 0, 0, 1, 0, 0);
    textCtx.scale(dpr, dpr);

    renderTextToCache();

    if (shaderLayer) {
      shaderLayer.resize(width, height);
      shaderLayer.updateTexture();
    }
  }

  let shaderLayer;

  function initShader() {
    shaderLayer = createVisionTextShader({
      container,
      textCanvas,
      width,
      height
    });
  }

  // --------------------
  // Render text ONCE
  // --------------------

  function renderTextToCache() {
    textCtx.clearRect(0, 0, width, height);

    const factor = getResponsiveFactor(width, height);

    const isMobile = width < 480 && window.innerWidth < 768;

    const MARGIN_LEFT = Math.round(Math.max(16, width * 0.03));
    const MARGIN_TOP  = Math.round(Math.max(24, height * 0.1));


    const titleSize = Math.round(BASE_TITLE_SIZE * FONT_SCALE);
    const bodySize  = Math.round(BASE_BODY_SIZE * FONT_SCALE);
    const textX = MARGIN_LEFT;
    const titleLineHeight = Math.round(titleSize * 1.15);
    const bodyLineHeight  = Math.round(bodySize * 1.45);

    const topY = Math.round(height * 0.1)
    const minColumnWidth = isMobile
      ? Math.min(width * 0.85, 220)
      : Math.min(width * 0.9, 280);

    const maxTextWidth = Math.min(
      Math.round(width * 0.9),
      MAX_TEXT_WIDTH
    );

    textCtx.textBaseline = "top";
    textCtx.fillStyle = "#ffffff";
    textCtx.textAlign = "left";

    // Title
    textCtx.font =
      `600 ${titleSize}px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial`;

    const titleHeight = drawWrappedText(
      textCtx,
      "Scroll down for a journey into the abyss",
      textX,
      topY,
      maxTextWidth,
      titleLineHeight
    );

    const bodyY =
      topY +
      titleHeight +
      titleLineHeight * TITLE_BODY_GAP;

    // Body
    textCtx.font =
      `400 ${bodySize}px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial`;

    drawWrappedText(
      textCtx,
      "A Three.js showcase",
      textX,
      bodyY,
      maxTextWidth,
      bodyLineHeight
    );

    if (shaderLayer) {
      shaderLayer.updateTexture();
    }

  }

  // --------------------
  // Draw animated layers
  // --------------------

  function draw() {
    ctx.clearRect(0, 0, width, height);

    if (dissolveP <= 0) {
      ctx.globalAlpha = 1;
      ctx.filter = "none";
      ctx.drawImage(textCanvas, 0, 0);
      return;
    }

    const blurPx = dissolveP * MAX_BLUR_PX;

    for (let i = 0; i < LAYERS.length; i++) {
      const layer = LAYERS[i];

      const dx = Math.sin(layer.angle) * DISSOLVE_DISTANCE * dissolveP;
      const dy = -Math.cos(layer.angle) * DISSOLVE_DISTANCE * dissolveP;
      const blurPx = dissolveP > 0.02 ? dissolveP * MAX_BLUR_PX : 0;

      const alpha = LAYER_OPACITY * (1 - dissolveP);
      if (alpha <= 0) continue;

      ctx.save();
      ctx.translate(dx, dy);
      ctx.globalAlpha = alpha;
      ctx.filter = "none";
      ctx.drawImage(textCanvas, 0, 0);

      ctx.restore();
    }

    ctx.filter = "none";
  }

  // --------------------
  // Word wrapping helper
  // --------------------

  function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    const lines = [];

    for (let i = 0; i < words.length; i++) {
      const test = line + words[i] + " ";
      if (ctx.measureText(test).width > maxWidth && i > 0) {
        lines.push(line);
        line = words[i] + " ";
      } else {
        line = test;
      }
    }
    lines.push(line);

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], x, y + i * lineHeight);
    }

    return lines.length * lineHeight;
  }


  // --------------------
  // Timeline update
  // --------------------

  function update(p) {
    if (p <= 1 - FADE_FRAC) {
      dissolveP = 0;
    } else {
      dissolveP = (p - (1 - FADE_FRAC)) / FADE_FRAC;
    }

    if (shaderLayer) {
      shaderLayer.setDissolve(dissolveP);
    }
  }

  // --------------------
  // Cleanup
  // --------------------

  function dispose() {
    window.removeEventListener("resize", resize);
    if (shaderLayer) {
      shaderLayer.dispose();
    }
  }

  window.addEventListener("resize", resize);
  resize();
  initShader();

  return {
    update,
    dispose
  };
}
