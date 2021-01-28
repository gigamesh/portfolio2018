import React, { useEffect, useLayoutEffect, useRef } from "react";
import { select } from "d3-selection";
import { scaleLinear, scalePow } from "d3-scale";
import "./tunnel.css";

const squareCount = 30;
const strokeWidthScale = scalePow()
  .exponent(6)
  .domain([0, squareCount])
  .range([0.5, 2]);
const framesPerLoop = 120;

const TunnelVision = ({
  hasIntroFinished,
  registerIntroFinished,
  mouseCoords,
  prevMouseCoords,
  updatePrevMouseCoords
}) => {
  const tunnelWrapper = useRef(null);
  const tunnel = useRef(null);
  const squares = [];
  let sizeScale;
  const svgDimensions = { x: null, y: null, size: null };
  const rafId = useRef(null);
  const currentFrame = useRef(0);

  useEffect(() => {
    const { width, top, left } = tunnelWrapper.current.getBoundingClientRect();
    svgDimensions.size = width;
    svgDimensions.x = top;
    svgDimensions.y = left;

    sizeScale = scalePow()
      .exponent(4)
      .domain([0, squareCount])
      .range([0, svgDimensions.size]);

    if (!tunnel.current) {
      tunnel.current = select(".tunnelWrapper").append("svg");
    }

    initSquares();
    rafId.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId.current);
    };
  });

  const initSquares = () => {
    const halfSvg = svgDimensions.size / 2;

    for (let i = 0; i <= squareCount; i++) {
      const centerPosition = halfSvg - sizeScale(i) / 2;
      const square = {
        size: [sizeScale(i)],
        strokeWidth: [strokeWidthScale(i)],
        opacity: 0,
        x: [
          {
            value: centerPosition,
            scaleFn: scaleLinear(
              [window.innerWidth, 0],
              [-(halfSvg - sizeScale(i) / 2), halfSvg - sizeScale(i) / 2]
            )
          }
        ],
        y: [
          {
            value: centerPosition,
            scaleFn: scaleLinear(
              [window.innerHeight, 0],
              [-(halfSvg - sizeScale(i) / 2), halfSvg - sizeScale(i) / 2]
            )
          }
        ]
      };
      squares.push(square);
    }

    // create values for each frame
    for (let frame = 1; frame < framesPerLoop; frame++) {
      squares.forEach((square, sqIdx) => {
        if (sqIdx < squares.length - 1) {
          const currentFrameSquareSize =
            ((squares[sqIdx + 1].size[0] - square.size[0]) / framesPerLoop) *
              frame +
            square.size[0];

          square.x[frame] = {
            value:
              ((squares[sqIdx + 1].x[0].value - square.x[0].value) /
                framesPerLoop) *
                frame +
              square.x[0].value,
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
              ((squares[sqIdx + 1].y[0].value - square.y[0].value) /
                framesPerLoop) *
                frame +
              square.y[0].value,
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
            ((squares[sqIdx + 1].strokeWidth[0] - square.strokeWidth[0]) /
              framesPerLoop) *
              frame +
            square.strokeWidth[0];
        }
      });
    }
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
      .attr("fill", "none")
      .attr("opacity", (d, i) => {
        if (i === currFrame) {
          squares[currFrame].opacity = 1;
          return 1;
        } else {
          return hasIntroFinished ? 1 : d.opacity;
        }
      })
      .attr("width", (currSquare, i) =>
        i < squares.length - 1 ? currSquare.size[currFrame] : svgDimensions.size
      )
      .attr("height", (currSquare, i) =>
        i < squares.length - 1 ? currSquare.size[currFrame] : svgDimensions.size
      )
      .attr("stroke-width", (currSquare, i) =>
        i < squares.length - 1 ? currSquare.strokeWidth[currFrame] : 4
      )
      .attr("x", (currSquare, i) =>
        i < squares.length - 1
          ? currSquare.x[currFrame].value +
            currSquare.x[currFrame].scaleFn(prevMouseCoords.x)
          : 0
      )
      .attr("y", (currSquare, i) =>
        i < squares.length - 1
          ? currSquare.y[currFrame].value +
            currSquare.y[currFrame].scaleFn(prevMouseCoords.y)
          : 0
      );

    updatePrevMouseCoords();

    currentFrame.current = currFrame < framesPerLoop - 1 ? currFrame + 1 : 0;
    rafId.current = requestAnimationFrame(draw);
  };

  return <div ref={tunnelWrapper} className="tunnelWrapper" />;
};

export default TunnelVision;
