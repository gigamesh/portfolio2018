import React, { createRef, useEffect } from "react";
import styled from "styled-components";
import * as PIXI from "pixi.js";
import { isWebGlSupported } from "../utils";
import "./tunnel-canvas.scss";

PIXI.Renderer.create = function create(options) {
  if (isWebGlSupported()) {
    return new PIXI.Renderer(options);
  }
  throw new Error(
    'WebGL unsupported in this browser, use "pixi.js-legacy" for fallback canvas2d support.'
  );
};

const app = new PIXI.Application();

const AspectRatioBox = styled.div`
  width: 100%;
  height: 0;
  padding-top: 100%;
  position: relative;
`;

export default function TunnelCanvas() {
  const container = createRef(null);

  useEffect(() => {
    if (container.current) {
      const {
        width,
        height,
      } = container.current.parentNode.getBoundingClientRect();
      container.current.width = width;
      container.current.height = height;

      container.current.appendChild(app.view);
    }
  }, [container.current]);

  return (
    <AspectRatioBox>
      <div className="tunnel-canvas" ref={container} />
    </AspectRatioBox>
  );
}
