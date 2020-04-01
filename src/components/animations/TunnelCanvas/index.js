import React, { createRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Renderer } from "pixi.js";
import { isWebGlSupported, useMousePosition } from "../../../utils";
import PixiApp from "./../pixi/PixiApp";
import "./styles.scss";

Renderer.create = function create(options) {
  if (isWebGlSupported()) {
    return new Renderer(options);
  }
  throw new Error(
    'WebGL unsupported in this browser, use "pixi.js-legacy" for fallback canvas2d support.'
  );
};

const AspectRatioBox = styled.div`
  width: 100%;
  height: 0;
  padding-top: 100%;
  position: relative;
`;

export default function TunnelCanvas() {
  const [pixiApp, setPixiApp] = useState(null);
  const canvas = createRef(null);
  const mousePos = useMousePosition({ x: 0, y: 0 });

  useEffect(() => {
    if (canvas.current) {
      const {
        width,
        height,
      } = canvas.current.parentNode.getBoundingClientRect();

      const app = new PixiApp({
        width,
        height,
        transparent: true,
        autoResize: true,
        view: canvas.current,
      });

      setPixiApp(app);
    }
  }, [canvas.current]);

  return (
    <AspectRatioBox>
      <canvas className="tunnel-canvas" ref={canvas} />
    </AspectRatioBox>
  );
}
