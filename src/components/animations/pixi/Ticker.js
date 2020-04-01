const Signal = require("signals");

/**
 * A global callback timer.
 */
class Ticker {
  /**
   * Create a ticker.
   * @return {Ticker}
   */
  constructor() {
    this.onUpdate = new Signal();
    this.updateBind = this.update.bind(this);

    this.active = false;
    this.deltaTime = 1;
    this.timeElapsed = 0;
    this.lastTime = 0;
    this.speed = 1;
    this.fps = 60;
    this.fpsInterval = 1000 / this.fps;
  }

  /**
   * Start the ticker.
   */
  start() {
    if (this.active) return;
    this.lastTime = window.performance.now();
    this.active = true;
    requestAnimationFrame(this.updateBind);
  }

  /**
   * Stop the ticker.
   */
  stop() {
    if (!this.active) return;
    this.active = false;
  }

  /**
   * Main update from raf.
   * @param {Number} rafTime Timing information.
   */
  update(rafTime) {
    if (this.active) {
      requestAnimationFrame(this.updateBind);
      const currentTime = rafTime;
      const timeElapsed = currentTime - this.lastTime;
      if (timeElapsed > this.fpsInterval) {
        this.lastTime = rafTime - (timeElapsed % this.fpsInterval);
        this.onUpdate.dispatch(currentTime);
      }
    }
  }

  /**
   * Add a new callback to the Ticker.
   * @param {Function} listener The function to call.
   * @param {Object} scope    The scope under which to run the callback.
   */
  add(listener, scope) {
    this.onUpdate.add(listener, scope);
  }

  /**
   * Remove a callback from the ticker.
   * @param  {Function} listener The function we were calling.
   * @param  {Object} scope    The scope we were running.
   */
  remove(listener, scope) {
    this.onUpdate.remove(listener, scope);
  }
}

export default new Ticker();
