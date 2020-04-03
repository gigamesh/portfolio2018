import { autoDetectRenderer, Renderer, Loader } from "pixi.js";
import Signal from "signals";
import { isWebGlSupported } from "../../../utils";
import TunnelContainer from "./TunnelContainer";
import Ticker from "./Ticker";

Renderer.create = function create(options) {
  if (isWebGlSupported()) {
    return new Renderer(options);
  }
  throw new Error(
    'WebGL unsupported in this browser, use "pixi.js-legacy" for fallback canvas2d support.'
  );
};

/**
 * A new PIXI application.
 */
export default class PixiApp {
  /**
   * Create the app.
   * @param {Object} props Setup options.
   */
  constructor(props) {
    const {
      width,
      height,
      view,
      resizingMethod,
      toLoad,
      onLoaded,
      backgroundColor,
      transparent,
    } = props;

    this.width = width;
    this.height = height;
    this.view = view;
    this.onLoaded = onLoaded;
    this.resizingMethod = resizingMethod;
    this.backgroundColor = backgroundColor || 0x000000;
    this.transparent = transparent || false;
    this.onUpdate = new Signal();

    if (toLoad) {
      const sharedLoader = Loader.shared;
      sharedLoader.add(toLoad).load(this.loaded.bind(this));
    } else {
      this.loaded();
    }
  }

  loaded() {
    const ratio = window.devicePixelRatio;
    if (ratio) {
      window.DEVICE_SCALE = ratio;
      if (window.DEVICE_SCALE > 2) {
        window.DEVICE_SCALE = 2;
      }
    } else {
      const xdpi = window.screen.deviceXDPI;
      const logical = window.screen.logicalXDPI;
      window.DEVICE_SCALE = xdpi / logical;
    }

    this.renderer = autoDetectRenderer({
      width: this.width,
      height: this.height,
      resolution: window.DEVICE_SCALE,
      backgroundColor: this.backgroundColor,
      view: this.view,
      autoDensity: true,
      transparent: this.transparent,
    });

    this.renderer.safeSize = this.safeSize;

    window.addEventListener("resize", this.resize.bind(this));

    this.container = new TunnelContainer({ renderer: this.renderer });

    Ticker.add(this.update, this);
    Ticker.start();

    if (this.onLoaded) {
      this.onLoaded();
    }
  }

  /**
   * Main update loop.
   */
  update() {
    this.renderer.render(this.container);
    this.onUpdate.dispatch();
  }

  /**
   * Safe size parameters.
   * @TODO: Change later.
   * @type {Object}
   */
  safeSize = {
    width: 1136,
    height: 640,
  };

  /**
   * Max size parameters.
   * @TODO: Change later.
   * @type {Object}
   */
  maxSize = {
    width: 1136,
    height: 640,
  };

  /**
   * Resize the application.
   */
  resize() {
    console.error("TODO: Implement resize");
    // const { resizingMethod } = this;
    // const w = this.view.parentNode.clientWidth;
    // const h = this.view.parentNode.clientHeight;

    // if (resizingMethod === "fullscreen") {
    //   this.renderer.resize(w, h);
    //   this.screenManager.resize(w, h);
    // } else {
    //   const scale = 1;
    //   let ratio = 0;
    //   if (w / this.safeSize.width < h / this.safeSize.height) {
    //     ratio = w / this.safeSize.width;
    //   } else {
    //     ratio = h / this.safeSize.height;
    //   }
    //   const w2 = Math.min(this.maxSize.width * ratio, w);
    //   const h2 = Math.min(this.maxSize.height * ratio, h);

    //   this.renderer.resize((w2 * scale) | 0, (h2 * scale) | 0);

    //   this.renderer.view.style.width = Math.ceil(w2) + "px";
    //   this.renderer.view.style.height = Math.ceil(h2) + "px";

    //   this.screenManager.resize(w2 / ratio, h2 / ratio);
    //   this.screenManager.container.scale.set(ratio * scale);
    // }
  }
}
