"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

const barHeight = 25;
const marginTop = 30;
const marginRight = 60;
const marginBottom = 10;
const marginLeft = 60;

interface Props {
  range: "yearly" | "monthly";
  city?: string; // city code
  data: ShelterSummary[];
}

const AdoptChart: React.FC<Props> = ({ range, city, data }) => {
  // save map svg element
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current || !data) return;

    // Specify the chart’s dimensions.
    const height = Math.ceil((data.length + 0.1) * barHeight) + marginTop + marginBottom;

    // Create the positional scales.
    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => ))
      .rangeRound([marginLeft, width - marginRight]);
  }, [data]);

  return <svg ref={svgRef} className="chart"></svg>;
};

export default AdoptChart;
