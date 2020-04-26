import React, { useEffect } from "react";
import { select } from "d3-selection";
import { scaleLinear, scalePow } from "d3-scale";
import "./tunnel.css";

const canvasSize = 500;
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
  .range([-halfCanvas, halfCanvas]);
const yMouseScale = scaleLinear()
  .domain([0, window.innerHeight])
  .range([-halfCanvas, halfCanvas]);
const squares = [];
const framesPerLoop = 60;
let currentFrame = 0;

// create squares
for (let i = 0; i <= squareCount; i++) {
  const centerPosition = halfCanvas - sizeScale(i) / 2;
  const square = {
    size: [sizeScale(i)],
    opacity: [opacityScale(i)],
    strokeWidth: [strokeWidthScale(i)],
    x: [{ value: centerPosition, scaleFn: () => {} }],
    xScale: scaleLinear(
      [0, window.innerWidth],
      [-(canvasSize - sizeScale(i)), canvasSize - sizeScale(i)]
    ),
    y: [{ value: centerPosition, scaleFn: () => {} }],
    yScale: scaleLinear(
      [0, window.innerHeight],
      [-(canvasSize - sizeScale(i)), canvasSize - sizeScale(i)]
    )
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
  const mouseCoords = { x: null, y: null };
  const wrappingDiv = { x: null, y: null, width: null, height: null };

  useEffect(() => {
    const { width, height, top, left } = document
      .querySelector(".tunnelWrapper")
      .getBoundingClientRect();

    wrappingDiv.width = width;
    wrappingDiv.height = height;
    wrappingDiv.x = top;
    wrappingDiv.y = left;

    wrapper = select(".tunnelWrapper")
      .append("svg")
      .attr("width", wrappingDiv.width)
      .attr("height", wrappingDiv.height);

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
        .attr("opacity", (currSquare, i) =>
          i < squares.length - 1 ? currSquare.opacity[currentFrame] : 1
        )
        .attr("width", (currSquare, i) =>
          i < squares.length - 1 ? currSquare.size[currentFrame] : canvasSize
        )
        .attr("height", (currSquare, i) =>
          i < squares.length - 1 ? currSquare.size[currentFrame] : canvasSize
        )
        .attr("stroke-width", (currSquare, i) =>
          i < squares.length - 1 ? currSquare.strokeWidth[currentFrame] : 4
        )
        .attr("x", (currSquare, i) =>
          i < squares.length - 1
            ? currSquare.x[currentFrame].value +
              currSquare.xScale(mouseCoords.x)
            : 0
        )
        .attr("y", (currSquare, i) =>
          i < squares.length - 1
            ? currSquare.y[currentFrame].value +
              currSquare.yScale(mouseCoords.y)
            : 0
        );
      currentFrame++;
    } else {
      currentFrame = 0;
    }

    requestAnimationFrame(draw);
  };

  return <div className="tunnelWrapper" />;
};

export default TunnelVision;
