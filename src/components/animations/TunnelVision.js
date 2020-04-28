import React, { useEffect, useLayoutEffect, useRef } from "react";
import { select } from "d3-selection";
import { scaleLinear, scalePow } from "d3-scale";
import "./tunnel.css";

const squareCount = 30;
const strokeWidthScale = scalePow()
  .exponent(6)
  .domain([squareCount, 1])
  .range([2, 0.5]);
const framesPerLoop = 120;
const mouseEaseDuration = 15;

const TunnelVision = ({ hasIntroFinished, registerIntroFinished }) => {
  const tunnelWrapper = useRef(null);
  const tunnel = useRef(null);
  const squares = [];
  let sizeScale;
  const mouseCoords = {
    x: window.innerWidth * 0.85,
    y: window.innerHeight * 0.15
  };
  const prevMouseCoords = {
    x: window.innerWidth * 0.85,
    y: window.innerHeight * 0.15
  };
  const svgDimensions = { x: null, y: null, size: null };
  const rafId = useRef(null);
  const currentFrame = useRef(0);

  useEffect(() => {
    const { width, top, left } = tunnelWrapper.current.getBoundingClientRect();
    svgDimensions.size = width;
    svgDimensions.x = top;
    svgDimensions.y = left;

    sizeScale = scalePow()
      .exponent(6)
      .domain([squareCount, 1])
      .range([svgDimensions.size, 0]);

    if (!tunnel.current) {
      tunnel.current = select(".tunnelWrapper").append("svg");
    }

    const mouseMove = e => {
      mouseCoords.x = e.clientX;
      mouseCoords.y = e.clientY;
    };

    document.body.addEventListener("mousemove", mouseMove);

    initSquares();
    rafId.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId.current);
      document.body.removeEventListener("mousemove", mouseMove, true);
    };
  });

  const initSquares = () => {
    const halfSvg = svgDimensions.size / 2;

    for (let i = squareCount; i > 0; i--) {
      const centerPosition = halfSvg - sizeScale(i) / 2;
      const square = {
        size: [sizeScale(i)],
        strokeWidth: [strokeWidthScale(i)],
        opacity: 0,
        x: [
          {
            value: centerPosition,
            scaleFn: scaleLinear(
              [0, window.innerWidth],
              [halfSvg - sizeScale(i) / 2, -(halfSvg - sizeScale(i) / 2)]
            )
          }
        ],
        y: [
          {
            value: centerPosition,
            scaleFn: scaleLinear(
              [0, window.innerHeight],
              [halfSvg - sizeScale(i) / 2, -(halfSvg - sizeScale(i) / 2)]
            )
          }
        ]
      };
      squares.push(square);
    }

    // create values for each frame
    for (let frame = 1; frame <= framesPerLoop; frame++) {
      squares.forEach((square, sqIdx) => {
        if (sqIdx < squares.length - 1) {
          const currentFrameSquareSize =
            ((square.size[0] - squares[sqIdx + 1].size[0]) / framesPerLoop) *
              frame +
            squares[sqIdx + 1].size[0];

          square.x[frame] = {
            value:
              ((square.x[0].value - squares[sqIdx + 1].x[0].value) /
                framesPerLoop) *
                frame +
              squares[sqIdx + 1].x[0].value,
            scaleFn: scaleLinear(
              [window.innerWidth, 0],
              [
                -(halfSvg - currentFrameSquareSize / 2),
                halfSvg - currentFrameSquareSize / 2
              ]
            )
          };
          square.y[frame] = {
            value:
              ((square.y[0].value - squares[sqIdx + 1].y[0].value) /
                framesPerLoop) *
                frame +
              squares[sqIdx + 1].y[0].value,
            scaleFn: scaleLinear(
              [window.innerHeight, 0],
              [
                -(halfSvg - currentFrameSquareSize / 2),
                halfSvg - currentFrameSquareSize / 2
              ]
            )
          };
          square.size[frame] = currentFrameSquareSize;
          square.strokeWidth[frame] =
            ((square.strokeWidth[0] - squares[sqIdx + 1].strokeWidth[0]) /
              framesPerLoop) *
              frame +
            squares[sqIdx + 1].strokeWidth[0];
        }
      });
    }

    console.log(squares);
  };

  const draw = () => {
    const currFrame = currentFrame.current;

    if (!hasIntroFinished && currFrame > squares.length) {
      registerIntroFinished();
    }

    tunnel.current
      .attr("width", svgDimensions.size)
      .attr("height", svgDimensions.size)
      .selectAll("rect")
      .data(squares)
      .join("rect")
      .attr("stroke", "black")
      .attr("fill", "#fff")
      .attr("opacity", (d, i) => {
        if (!hasIntroFinished && i === squares.length - currFrame) {
          squares[squares.length - currFrame].opacity = 1;
          return 1;
        } else {
          return hasIntroFinished ? 1 : d.opacity;
        }
      })
      .attr("width", (currSquare, i) =>
        i === 0 ? svgDimensions.size : currSquare.size[currFrame]
      )
      .attr("height", (currSquare, i) =>
        i === 0 ? svgDimensions.size : currSquare.size[currFrame]
      )
      .attr(
        "stroke-width",
        (currSquare, i) => currSquare.strokeWidth[currFrame]
      )
      .attr("x", (currSquare, i) =>
        i > 0 && i < squares.length - 1
          ? currSquare.x[currFrame].value +
            currSquare.x[currFrame].scaleFn(prevMouseCoords.x)
          : 0
      )
      .attr("y", (currSquare, i) =>
        i > 0 && i < squares.length - 1
          ? currSquare.y[currFrame].value +
            currSquare.y[currFrame].scaleFn(prevMouseCoords.y)
          : 0
      );

    prevMouseCoords.x =
      prevMouseCoords.x +
      (mouseCoords.x - prevMouseCoords.x) / mouseEaseDuration;
    prevMouseCoords.y =
      prevMouseCoords.y +
      (mouseCoords.y - prevMouseCoords.y) / mouseEaseDuration;

    currentFrame.current = currFrame < framesPerLoop - 1 ? currFrame + 1 : 0;

    rafId.current = requestAnimationFrame(draw);
  };

  return <div ref={tunnelWrapper} className="tunnelWrapper" />;
};

export default TunnelVision;
