import { scaleLinear, scalePow } from "d3-scale";
import { select } from "d3-selection";
import React, { useEffect, useRef } from "react";
import "./tunnel.css";

// Define types
interface MouseCoords {
  x: number;
  y: number;
}

interface ScaleFunction {
  (value: number): number;
}

interface CoordinatePoint {
  value: number;
  scaleFn: ScaleFunction;
}

interface Square {
  size: number[];
  strokeWidth: number[];
  opacity: number;
  x: CoordinatePoint[];
  y: CoordinatePoint[];
}

interface SVGDimensions {
  x: number | null;
  y: number | null;
  size: number | null;
}

interface TunnelVisionProps {
  prevMouseCoords: MouseCoords;
  updatePrevMouseCoords: () => void;
}

const squareCount = 30;
const strokeWidthScale = scalePow()
  .exponent(6)
  .domain([0, squareCount])
  .range([0.5, 2]);
const framesPerLoop = 120;

export const TunnelVision: React.FC<TunnelVisionProps> = ({
  prevMouseCoords,
  updatePrevMouseCoords
}) => {
  const tunnelWrapper = useRef<HTMLDivElement>(null);
  const tunnel = useRef<any>(null);
  const squares: Square[] = [];
  let sizeScale: any;
  const svgDimensions: SVGDimensions = { x: null, y: null, size: null };
  const rafId = useRef<number | null>(null);
  const currentFrame = useRef<number>(0);

  useEffect(() => {
    if (!tunnelWrapper.current) return;

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
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  });

  const initSquares = (): void => {
    if (svgDimensions.size === null) return;

    const halfSvg = svgDimensions.size / 2;

    for (let i = 0; i <= squareCount; i++) {
      const centerPosition = halfSvg - sizeScale(i) / 2;
      const square: Square = {
        size: [sizeScale(i)],
        strokeWidth: [strokeWidthScale(i)],
        opacity: 0,
        x: [
          {
            value: centerPosition,
            scaleFn: scaleLinear()
              .domain([window.innerWidth, 0])
              .range([
                -(halfSvg - sizeScale(i) / 2),
                halfSvg - sizeScale(i) / 2
              ])
          }
        ],
        y: [
          {
            value: centerPosition,
            scaleFn: scaleLinear()
              .domain([window.innerHeight, 0])
              .range([
                -(halfSvg - sizeScale(i) / 2),
                halfSvg - sizeScale(i) / 2
              ])
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
            scaleFn: scaleLinear()
              .domain([window.innerWidth, 0])
              .range([
                -(halfSvg - currentFrameSquareSize / 2),
                halfSvg - currentFrameSquareSize / 2
              ])
          };
          square.y[frame] = {
            value:
              ((squares[sqIdx + 1].y[0].value - square.y[0].value) /
                framesPerLoop) *
                frame +
              square.y[0].value,
            scaleFn: scaleLinear()
              .domain([window.innerHeight, 0])
              .range([
                -(halfSvg - currentFrameSquareSize / 2),
                halfSvg - currentFrameSquareSize / 2
              ])
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

  const draw = (): void => {
    if (svgDimensions.size === null) return;

    const currFrame = currentFrame.current;

    tunnel.current
      .attr("width", svgDimensions.size)
      .attr("height", svgDimensions.size)
      .selectAll("rect")
      .data(squares)
      .join("rect")
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("opacity", (d: Square, i: number) => {
        if (i === currFrame) {
          squares[currFrame].opacity = 1;
        }
        return 1;
      })
      .attr("width", (currSquare: Square, i: number) =>
        i < squares.length - 1 ? currSquare.size[currFrame] : svgDimensions.size
      )
      .attr("height", (currSquare: Square, i: number) =>
        i < squares.length - 1 ? currSquare.size[currFrame] : svgDimensions.size
      )
      .attr("stroke-width", (currSquare: Square, i: number) =>
        i < squares.length - 1 ? currSquare.strokeWidth[currFrame] : 4
      )
      .attr("x", (currSquare: Square, i: number) =>
        i < squares.length - 1
          ? currSquare.x[currFrame].value +
            currSquare.x[currFrame].scaleFn(prevMouseCoords.x)
          : 0
      )
      .attr("y", (currSquare: Square, i: number) =>
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
