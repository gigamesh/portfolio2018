import React, { useEffect } from "react";
import { select } from "d3-selection";
import { scaleLinear, scalePow } from "d3-scale";

const canvasSize = 400;
const halfCanvas = canvasSize / 2;
const squareCount = 30;
const sizeScale = scalePow()
  .exponent(6)
  .domain([0, squareCount])
  .range([0, canvasSize]);
const opacityScale = scalePow()
  .exponent(3)
  .domain([0, squareCount])
  .range([0.5, 1]);
const strokeWidthScale = scalePow()
  .exponent(6)
  .domain([0, squareCount])
  .range([0.5, 2]);
const xMouseScale = scaleLinear()
  .domain([0, window.innerWidth])
  .range([0, canvasSize]);
const yMouseScale = scaleLinear()
  .domain([0, window.innerHeight])
  .range([0, canvasSize]);
const squares = [];
const framesPerLoop = 60;
let currentFrame = 0;

// create squares
for (let i = 0; i <= squareCount; i++) {
  const square = {
    size: [sizeScale(i)],
    opacity: [opacityScale(i)],
    strokeWidth: [strokeWidthScale(i)],
    x: [{ value: halfCanvas - sizeScale(i) / 2, scaleFn: () => {} }],
    y: [{ value: halfCanvas - sizeScale(i) / 2, scaleFn: () => {} }]
  };
  squares.push(square);
}

// create values for each frame
for (let frame = 1; frame < framesPerLoop; frame++) {
  squares.forEach((square, sqIdx) => {
    if (sqIdx < squares.length - 1) {
      square.x[frame] = {
        value:
          ((squares[sqIdx + 1].x[0].value - square.x[0].value) /
            framesPerLoop) *
            frame +
          square.x[0].value,
        scaleFn: () => {}
      };
      square.y[frame] = {
        value:
          ((squares[sqIdx + 1].y[0].value - square.y[0].value) /
            framesPerLoop) *
            frame +
          square.y[0].value,
        scaleFn: () => {}
      };
      square.size[frame] =
        ((squares[sqIdx + 1].size[0] - square.size[0]) / framesPerLoop) *
          frame +
        square.size[0];
      square.opacity[frame] =
        ((squares[sqIdx + 1].opacity[0] - square.opacity[0]) / framesPerLoop) *
          frame +
        square.opacity[0];
      square.strokeWidth[frame] =
        ((squares[sqIdx + 1].strokeWidth[0] - square.strokeWidth[0]) /
          framesPerLoop) *
          frame +
        square.strokeWidth[0];
    }
  });
}

console.log(squares);

const TunnelVision = () => {
  let wrapper;
  const mouseCoords = { x: 0, y: 0 };

  useEffect(() => {
    wrapper = select(".tunnel-wrapper")
      .append("svg")
      .attr("width", canvasSize)
      .attr("height", canvasSize);

    document.body.addEventListener("mousemove", e => {
      mouseCoords.x = e.clientX;
      mouseCoords.y = e.clientY;
    });

    requestAnimationFrame(draw);
  }, []);

  const draw = () => {
    // console.log(mouseCoords.x, mouseCoords.y);
    if (currentFrame < framesPerLoop) {
      wrapper
        .selectAll("rect")
        .data(squares)
        .join("rect")
        .attr("stroke", "black")
        .attr("fill", "none")
        .attr("opacity", (d, i) =>
          i < squares.length - 1 ? squares[i].opacity[currentFrame] : 1
        )
        .attr("width", (d, i) =>
          i < squares.length - 1 ? squares[i].size[currentFrame] : canvasSize
        )
        .attr("height", (d, i) =>
          i < squares.length - 1 ? squares[i].size[currentFrame] : canvasSize
        )
        .attr("stroke-width", (d, i) =>
          i < squares.length - 1 ? squares[i].strokeWidth[currentFrame] : 4
        )
        .attr("x", (d, i) =>
          i < squares.length - 1
            ? squares[i].x[currentFrame].value + xMouseScale(mouseCoords.x)
            : 0
        )
        .attr("y", (d, i) =>
          i < squares.length - 1
            ? squares[i].y[currentFrame].value + yMouseScale(mouseCoords.y)
            : 0
        );
      currentFrame++;
    } else {
      currentFrame = 0;
    }

    requestAnimationFrame(draw);
  };

  return <div className="tunnel-wrapper" />;
};

export default TunnelVision;
