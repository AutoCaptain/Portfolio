export default function createVisionTextCursor(container, onRedraw) {
  // ----------------------------------
  // Adjustable parameters
  // ----------------------------------

  const MIN_DISTANCE = 0;     // px
  const MAX_DISTANCE = 200;   // px

  const MIN_FONT_SIZE = 22;   // px
  const MAX_FONT_SIZE = 48;   // px

  const BASE_FONT_SIZE = 22;
  const FONT_FAMILY =
    "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial";

  const PUSH_STRENGTH = 0.25;

  // ----------------------------------
  // State
  // ----------------------------------

  let active = false;
  let ctxRef = null;
  let widthRef = 0;
  let heightRef = 0;

  let pointer = { x: -9999, y: -9999 };
  let glyphs = [];
  let isMobile = false;

  // ----------------------------------
  // Layout
  // ----------------------------------

  function layoutText(ctx, text, x, y, maxWidth) {
    glyphs = [];
    ctx.font = `400 ${BASE_FONT_SIZE}px ${FONT_FAMILY}`;

    if (!isMobile) {
      // Desktop — original single line
      let cursorX = x;

      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const metrics = ctx.measureText(char);

        glyphs.push({
          char,
          baseX: cursorX,
          baseY: y,
          width: metrics.width
        });

        cursorX += metrics.width;
      }

      return;
    }

    // MOBILE WRAPPED LAYOUT
    const words = text.split(" ");
    const spaceWidth = ctx.measureText(" ").width;

    let cursorX = x;
    let cursorY = y;
    const lineHeight = BASE_FONT_SIZE * 1.4;

    for (let w = 0; w < words.length; w++) {
      const word = words[w];
      const wordWidth = ctx.measureText(word).width;

      if (cursorX + wordWidth > maxWidth) {
        cursorX = x;
        cursorY += lineHeight;
      }

      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        const metrics = ctx.measureText(char);

        glyphs.push({
          char,
          baseX: cursorX,
          baseY: cursorY,
          width: metrics.width
        });

        cursorX += metrics.width;
      }

      // space after word
      cursorX += spaceWidth;
    }
  }

  // ----------------------------------
  // Distance → size mapping
  // ----------------------------------

  function computeFontSize(distance) {
    if (distance >= MAX_DISTANCE) return MIN_FONT_SIZE;
    if (distance <= MIN_DISTANCE) return MAX_FONT_SIZE;

    const t =
      1 - (distance - MIN_DISTANCE) /
      (MAX_DISTANCE - MIN_DISTANCE);

    return MIN_FONT_SIZE + t * (MAX_FONT_SIZE - MIN_FONT_SIZE);
  }

  // ----------------------------------
  // Render
  // ----------------------------------

  function render() {
    if (!ctxRef) return;

    ctxRef.clearRect(0, 0, widthRef, heightRef);
    ctxRef.textBaseline = "top";
    ctxRef.fillStyle = "#ffffff";
    ctxRef.textAlign = "left";

    // -------------------------
    // MOBILE: static rendering
    // -------------------------
    if (isMobile) {
      ctxRef.font = `400 ${BASE_FONT_SIZE}px ${FONT_FAMILY}`;
      for (let i = 0; i < glyphs.length; i++) {
        const g = glyphs[i];
        ctxRef.fillText(g.char, g.baseX, g.baseY);
      }

      if (onRedraw) onRedraw();
      return;
    }

    // -------------------------
    // DESKTOP INTERACTIVE LOGIC
    // -------------------------

    const sizes = [];
    const scaledWidths = [];

    ctxRef.font = `400 ${BASE_FONT_SIZE}px ${FONT_FAMILY}`;

    // PASS 1 — compute sizes
    for (let i = 0; i < glyphs.length; i++) {
      const g = glyphs[i];

      const centerX = g.baseX + g.width / 2;
      const centerY = g.baseY + BASE_FONT_SIZE / 2;

      const dx = pointer.x - centerX;
      const dy = pointer.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const size = computeFontSize(distance);
      sizes.push(size);

      const scale = size / BASE_FONT_SIZE;
      const pushScale = 1 + (scale - 1) * PUSH_STRENGTH;

      scaledWidths.push(g.width * pushScale);
    }

    // PASS 2 — reflow layout
    let cursorX = glyphs.length > 0 ? glyphs[0].baseX : 0;

    for (let i = 0; i < glyphs.length; i++) {
      const g = glyphs[i];
      const size = sizes[i];

      ctxRef.font = `400 ${size}px ${FONT_FAMILY}`;
      ctxRef.fillText(g.char, cursorX, g.baseY);

      cursorX += scaledWidths[i];
    }

    if (onRedraw) onRedraw();
  }

  // ----------------------------------
  // Pointer
  // ----------------------------------

  function handlePointerMove(e) {
    if (!active) return;

    const rect = container.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;

    render();
  }

  function handlePointerLeave() {
    pointer.x = -9999;
    pointer.y = -9999;
    render();
  }

  // ----------------------------------
  // Public API
  // ----------------------------------

  function renderText(canvas, ctx, width, height, dpr) {
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    ctxRef = ctx;
    widthRef = width;
    heightRef = height;

    const paddingLeft = 24;
    const maxWidth = width - paddingLeft - 24;

    layoutText(
      ctx,
      "Scroll, Move, Interact for a journey into the Abyss",
      paddingLeft,
      height * 0.2,
      maxWidth
    );

    render();
  }

  function attach() {
    if (active || isMobile) return;
    active = true;
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);
  }

  function detach() {
    if (!active) return;
    active = false;
    container.removeEventListener("pointermove", handlePointerMove);
    container.removeEventListener("pointerleave", handlePointerLeave);
  }

  function setMobile(value) {
    isMobile = value;
    if (isMobile) {
      detach();
    }
  }

  function dispose() {
    detach();
  }

  return {
    attach,
    detach,
    dispose,
    renderText,
    setMobile
  };
}
