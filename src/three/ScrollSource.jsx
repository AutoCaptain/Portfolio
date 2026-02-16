// ScrollSource
// Single source of truth for scroll → timeline units

const PX_PER_UNIT = 1000; // 1.0 timeline unit = 1000px
const LOG_STEP = 0.05;    // log every 0.05 timeline units

class ScrollSource {
  constructor() {
    this.section = null;
    this.scrollPx = 0;
    this.t = 0;

    this._lastLoggedT = null;

    this._onScroll = this._onScroll.bind(this);
    this._onResize = this._onResize.bind(this);
  }

  attach(section) {
    this.section = section;

    window.addEventListener("scroll", this._onScroll, { passive: true });
    window.addEventListener("resize", this._onScroll);
    window.addEventListener("orientationchange", this._onScroll);

    this._onScroll(); // initial sync
  }

  detach() {
    window.removeEventListener("scroll", this._onScroll);
    window.removeEventListener("resize", this._onScroll);
    window.removeEventListener("orientationchange", this._onScroll);
    this.section = null;
  }

  _onResize() {
    this._onScroll();
  }

  _onScroll() {
    if (!this.section) return;

    const rect = this.section.getBoundingClientRect();
    const triggerY = window.innerHeight * 0.9;

    const rawPx = triggerY - rect.top;
    this.scrollPx = Math.max(rawPx, 0);

    const newT = this.scrollPx / PX_PER_UNIT;

    // ---- DEBUG LOGGING ----
    const steppedT = Math.floor(newT / LOG_STEP) * LOG_STEP;

    if (this._lastLoggedT !== steppedT) {
      this._lastLoggedT = steppedT;
    }
    // ----------------------

    this.t = newT;
  }

  getTime() {
    return this.t;
  }
}

const scrollSource = new ScrollSource();
export default scrollSource;
