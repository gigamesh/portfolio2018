import React, { createRef, useEffect, useState } from "react";
import styled from "styled-components";
import PixiApp from "./../pixi/PixiApp";
import "./styles.scss";

const AspectRatioBox = styled.div`
  width: 100%;
  height: 0;
  padding-top: 100%;
  position: relative;
`;

export default function TunnelCanvas() {
  const [pixiApp, setPixiApp] = useState(null);
  const canvas = createRef(null);

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
