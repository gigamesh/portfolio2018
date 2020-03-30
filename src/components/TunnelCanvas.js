import React, { createRef, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { scaleLinear } from "d3-scale";
import { Renderer, Application, Graphics } from "pixi.js";
import { isWebGlSupported } from "../utils";
import "./tunnel-canvas.scss";

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

const squares = [];

const scale = scaleLinear()
  .domain([0, 500])
  .range([0, 4]);

export default function TunnelCanvas() {
  const container = createRef(null);
  let app;

  useEffect(() => {
    if (container.current) {
      const {
        width,
        height,
      } = container.current.parentNode.getBoundingClientRect();

      app = new Application({
        width,
        height,
        transparent: true,
        autoResize: true,
      });

      // TODO: add resize method
      // app.renderer.resize(newSize, newSize);

      container.current.appendChild(app.view);

      draw(0);
    }
  }, [container.current]);

  function draw(frameCount) {
    const newFrameCount = frameCount + 1;
    const centerPoint = app.view.width / 2;

    if (!squares.length) {
      const square = {
        shape: new Graphics(),
        size: 1,
        x: centerPoint,
        y: centerPoint,
        age: 0,
      };
      squares.push(square);
    }

    // remove oldest square if its bigger than canvas
    if (squares[0].size > app.view.width) {
      squares.shift();
    }

    for (let square of squares) {
      console.log(square);
      square.shape.clear();
      square.age++;
      square.size = square.size + scale(square.age);
      console.log(square.size);

      // sets anchor to center
      square.shape.pivot.set(square.size / 2, square.size / 2);
      square.shape.lineStyle(1, 0x375688, 1);
      square.shape.beginFill(0xffffff);
      square.shape.endFill();
      square.shape.drawRect(square.x, square.y, square.size, square.size);

      app.stage.addChild(square.shape);
    }

    requestAnimationFrame(() => draw(newFrameCount));
  }

  return (
    <AspectRatioBox>
      <div className="tunnel-canvas" ref={container} />
    </AspectRatioBox>
  );
}
