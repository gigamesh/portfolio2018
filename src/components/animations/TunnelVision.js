import React, { useEffect, useState } from "react";
import { select } from "d3-selection";
import { transition } from "d3-transition";
import { scaleLinear, scalePow } from "d3-scale";
import { easeLinear } from "d3-ease";

const canvasSize = 400;
const halfCanvas = canvasSize / 2;
const squareCount = 40;
const sizeScale = scalePow()
  .exponent(6)
  .domain([0, squareCount])
  .range([0, canvasSize]);
const alphaScale = scalePow()
  .exponent(6)
  .domain([0, squareCount])
  .range([0.5, 1]);
const strokeWidthScale = scalePow()
  .exponent(6)
  .domain([0, squareCount])
  .range([0.5, 2]);
const squares = [];

for (let i = 0; i < squareCount; i++) {
  const square = {
    size: sizeScale(i),
    alpha: alphaScale(i),
    strokeWidth: strokeWidthScale(i),
    x: halfCanvas - sizeScale(i) / 2,
    y: halfCanvas - sizeScale(i) / 2
  };
  squares.push(square);
}

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

    draw();
  }, []);

  const draw = () => {
    const t = transition()
      .duration(5000)
      .ease(easeLinear);

    wrapper
      .selectAll("rect")
      .data(squares)
      .join("rect")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("opacity", d => d.alpha)
      .attr("width", d => d.size)
      .attr("height", d => d.size)
      .attr("stroke", "black")
      .attr("stroke-width", d => d.strokeWidth)
      .attr("fill", "none")
      .transition(t)
      .attr("opacity", (d, i) =>
        i < squares.length - 1 ? squares[i + 1].opacity : 1
      )
      .attr("x", (d, i) =>
        i < squares.length - 1 ? halfCanvas - squares[i + 1].size / 2 : 0
      )
      .attr("y", (d, i) =>
        i < squares.length - 1 ? halfCanvas - squares[i + 1].size / 2 : 0
      )
      .attr("width", (d, i) =>
        i < squares.length - 1 ? squares[i + 1].size : canvasSize
      )
      .attr("height", (d, i) =>
        i < squares.length - 1 ? squares[i + 1].size : canvasSize
      )
      .attr("stroke-width", (d, i) =>
        i < squares.length - 1 ? squares[i + 1].strokeWidth : d.strokeWidth
      )
      .on("end", draw);
  };

  return <div className="tunnel-wrapper" />;
};

export default TunnelVision;
