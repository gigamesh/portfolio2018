import React, { createRef, useEffect } from "react";
import styled from "styled-components";
import "./tunnel-canvas.scss";

const AspectRatioBox = styled.div`
  width: 100%;
  height: 0;
  padding-top: 100%;
  position: relative;
`;

const Square = function(ctx) {
  this.size = 100;
  this.x = 50.5;
  this.y = 50.5;

  this.draw = () => {
    ctx.beginPath();
    ctx.lineWidth = 0.5;
    ctx.strokeRect(this.x, this.y, this.size, this.size);
    // ctx.stroke();
  };
};

export default function TunnelCanvas() {
  const canvasRef = createRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const {
        width,
        height,
      } = canvasRef.current.parentNode.getBoundingClientRect();
      canvasRef.current.width = width * 2;
      canvasRef.current.height = height * 2;
      canvasRef.current.style.width = width;
      canvasRef.current.style.height = height;

      const ctx = canvasRef.current.getContext("2d");
      const dpr = window.devicePixelRatio || 1;
      ctx.scale(dpr, dpr);

      const square = new Square(ctx);
      square.draw();
    }
  }, [canvasRef.current]);

  return (
    <AspectRatioBox>
      <canvas className="tunnel-canvas" ref={canvasRef} />
    </AspectRatioBox>
  );
}
