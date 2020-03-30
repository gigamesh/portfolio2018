import React, { createRef, useEffect } from "react";
import styled from "styled-components";

const AspectRatioBox = styled.div`
  width: 100%;
  height: 0;
  padding-top: 100%;
  position: relative;
`;

const Canvas = styled.canvas`
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Square = ctx => {
  this.size = 100;
  this.x = 50;
  this.y = 50;

  this.draw = () => {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.stroke();
  };
};

export default function TunnelCanvas() {
  const canvasRef = createRef(null);

  useEffect(
    () => {
      if (canvasRef.current) {
        console.log(canvasRef.current);
        let ctx = canvasRef.getContext("2d");

        const square = new Square(ctx);
        square.draw();
      }
    },
    [canvasRef.current]
  );

  return (
    <AspectRatioBox>
      <Canvas ref={canvasRef} />
    </AspectRatioBox>
  );
}
