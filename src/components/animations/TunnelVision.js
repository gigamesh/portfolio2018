import React, { useEffect } from "react";
import { select } from "d3-selection";
import { line as d3Line } from "d3-shape";
import { scaleLinear, scaleTime } from "d3-scale";

const xScale = scaleTime(
  [new Date(2007, 3, 24), new Date(2007, 4, 1)],
  [0, 100]
);
const yScale = scaleLinear([90, 100], [0, 100]);

var data = [
  { date: new Date(2007, 3, 24), value: 93.24 },
  { date: new Date(2007, 3, 25), value: 95.35 },
  { date: new Date(2007, 3, 26), value: 98.84 },
  { date: new Date(2007, 3, 27), value: 99.92 },
  { date: new Date(2007, 3, 30), value: 99.8 },
  { date: new Date(2007, 4, 1), value: 99.47 },
];

var line = d3Line()
  .x(function(d) {
    return xScale(d.date);
  })
  .y(function(d) {
    return yScale(d.value);
  });

const TunnelVision = () => {
  useEffect(() => {
    draw();
  }, []);

  const draw = () => {
    select(".tunnel-wrapper")
      .append("svg")
      .attr("width", 500)
      .attr("height", 500)
      .append("g")
      .attr("transform", "translate(20,20)")
      .append("path")
      .attr("stroke-width", 1)
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("d", line(data));
  };

  return (
    <div
      class="tunnel-wrapper"
      // style={{ transform: "scale(1)" }}
    />
  );
};

export default TunnelVision;
