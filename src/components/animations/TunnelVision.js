import React, { useEffect } from "react";
import { select } from "d3-selection";
import { scaleLinear, scaleTime } from "d3-scale";

// const xScale = scaleTime(
//   [new Date(2007, 3, 24), new Date(2007, 4, 1)],
//   [0, 100]
// );
// const yScale = scaleLinear([90, 100], [0, 100]);

const canvasSize = 500;

const TunnelVision = () => {
  useEffect(() => {
    draw();
  }, []);

  const draw = () => {
    select(".tunnel-wrapper")
      .append("svg")
      .attr("width", canvasSize)
      .attr("height", canvasSize)
      .append("g")
      .append("rect")
      .attr("transform-origin", `${canvasSize / 2}px ${canvasSize / 2}px`)
      .attr("transform", `center`)
      .attr("width", canvasSize)
      .attr("height", canvasSize)
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("fill", "none");
  };

  return <div class="tunnel-wrapper" />;
};

export default TunnelVision;
