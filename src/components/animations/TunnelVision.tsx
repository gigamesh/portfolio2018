"use client";

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

// We don't need to pass mouse coordinates anymore
interface TunnelVisionProps {
  // Optional props in case we want to control some aspects from parent
  mouseEaseDuration?: number;
}

const squareCount = 30;
const strokeWidthScale = scalePow()
  .exponent(6)
  .domain([0, squareCount])
  .range([0.5, 2]);
const framesPerLoop = 120;
const DEFAULT_MOUSE_EASE_DURATION = 12;

export const TunnelVision: React.FC<TunnelVisionProps> = ({
  mouseEaseDuration = DEFAULT_MOUSE_EASE_DURATION
}) => {
  const tunnelWrapper = useRef<HTMLDivElement>(null);
  const tunnel = useRef<any>(null);
  const squares = useRef<Square[]>([]);
  const sizeScale = useRef<any>(null);
  const svgDimensions = useRef<SVGDimensions>({ x: null, y: null, size: null });
  const rafId = useRef<number | null>(null);
  const currentFrame = useRef<number>(0);

  if (typeof window === "undefined") return null;

  // Manage mouse coordinates internally
  const mouseCoords = useRef<MouseCoords>({
    x: window.innerWidth * 0.9,
    y: window.innerHeight * 0.1
  });

  const prevMouseCoords = useRef<MouseCoords>({
    x: window.innerWidth * 0.9,
    y: window.innerHeight * 0.1
  });

  // Mouse movement handler
  const handleMouseMove = (e: MouseEvent): void => {
    mouseCoords.current.x = e.clientX;
    mouseCoords.current.y = e.clientY;
  };

  // Update previous mouse coordinates with easing
  const updatePrevMouseCoords = (): void => {
    prevMouseCoords.current.x =
      prevMouseCoords.current.x +
      (mouseCoords.current.x - prevMouseCoords.current.x) / mouseEaseDuration;
    prevMouseCoords.current.y =
      prevMouseCoords.current.y +
      (mouseCoords.current.y - prevMouseCoords.current.y) / mouseEaseDuration;
  };

  // Setup effect - runs once on mount
  useEffect(() => {
    if (!tunnelWrapper.current) return;

    const {
      width,
      height,
      top,
      left
    } = tunnelWrapper.current.getBoundingClientRect();
    svgDimensions.current.size = width > height ? height : width;
    svgDimensions.current.x = top;
    svgDimensions.current.y = left;

    sizeScale.current = scalePow()
      .exponent(4)
      .domain([0, squareCount])
      .range([0, svgDimensions.current.size]);

    if (!tunnel.current) {
      tunnel.current = select(".tunnelWrapper").append("svg");
    }

    // Add mouse move event listener
    document.addEventListener("mousemove", handleMouseMove);

    // Initialize and start animation
    initSquares();
    rafId.current = requestAnimationFrame(draw);

    // Cleanup function
    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const initSquares = (): void => {
    if (svgDimensions.current.size === null || !sizeScale.current) return;

    // Reset squares array
    squares.current = [];

    const halfSvg = svgDimensions.current.size / 2;

    for (let i = 0; i <= squareCount; i++) {
      const centerPosition = halfSvg - sizeScale.current(i) / 2;
      const square: Square = {
        size: [sizeScale.current(i)],
        strokeWidth: [strokeWidthScale(i)],
        opacity: 0,
        x: [
          {
            value: centerPosition,
            scaleFn: scaleLinear()
              .domain([window.innerWidth, 0])
              .range([
                -(halfSvg - sizeScale.current(i) / 2),
                halfSvg - sizeScale.current(i) / 2
              ])
          }
        ],
        y: [
          {
            value: centerPosition,
            scaleFn: scaleLinear()
              .domain([window.innerHeight, 0])
              .range([
                -(halfSvg - sizeScale.current(i) / 2),
                halfSvg - sizeScale.current(i) / 2
              ])
          }
        ]
      };
      squares.current.push(square);
    }

    // create values for each frame
    for (let frame = 1; frame < framesPerLoop; frame++) {
      squares.current.forEach((square, sqIdx) => {
        if (sqIdx < squares.current.length - 1) {
          const currentFrameSquareSize =
            ((squares.current[sqIdx + 1].size[0] - square.size[0]) /
              framesPerLoop) *
              frame +
            square.size[0];

          square.x[frame] = {
            value:
              ((squares.current[sqIdx + 1].x[0].value - square.x[0].value) /
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
              ((squares.current[sqIdx + 1].y[0].value - square.y[0].value) /
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
            ((squares.current[sqIdx + 1].strokeWidth[0] -
              square.strokeWidth[0]) /
              framesPerLoop) *
              frame +
            square.strokeWidth[0];
        }
      });
    }
  };

  const draw = (): void => {
    if (svgDimensions.current.size === null) return;

    const currFrame = currentFrame.current;

    tunnel.current
      .attr("width", svgDimensions.current.size)
      .attr("height", svgDimensions.current.size)
      .selectAll("rect")
      .data(squares.current)
      .join("rect")
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("opacity", (d: Square, i: number) => {
        if (i === currFrame && squares.current.length > currFrame) {
          squares.current[currFrame].opacity = 1;
        }
        return 1;
      })
      .attr("width", (currSquare: Square, i: number) =>
        i < squares.current.length - 1
          ? currSquare.size[currFrame]
          : svgDimensions.current.size
      )
      .attr("height", (currSquare: Square, i: number) =>
        i < squares.current.length - 1
          ? currSquare.size[currFrame]
          : svgDimensions.current.size
      )
      .attr("stroke-width", (currSquare: Square, i: number) =>
        i < squares.current.length - 1 ? currSquare.strokeWidth[currFrame] : 4
      )
      .attr("x", (currSquare: Square, i: number) =>
        i < squares.current.length - 1
          ? currSquare.x[currFrame].value +
            currSquare.x[currFrame].scaleFn(prevMouseCoords.current.x)
          : 0
      )
      .attr("y", (currSquare: Square, i: number) =>
        i < squares.current.length - 1
          ? currSquare.y[currFrame].value +
            currSquare.y[currFrame].scaleFn(prevMouseCoords.current.y)
          : 0
      );

    updatePrevMouseCoords();

    currentFrame.current = currFrame < framesPerLoop - 1 ? currFrame + 1 : 0;
    rafId.current = requestAnimationFrame(draw);
  };

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!tunnelWrapper.current) return;

      const {
        height,
        width,
        top,
        left
      } = tunnelWrapper.current.getBoundingClientRect();
      svgDimensions.current.size = width > height ? height : width;
      svgDimensions.current.x = top;
      svgDimensions.current.y = left;

      sizeScale.current = scalePow()
        .exponent(4)
        .domain([0, squareCount])
        .range([0, svgDimensions.current.size]);

      initSquares();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={tunnelWrapper} className="tunnelWrapper" />;
};
