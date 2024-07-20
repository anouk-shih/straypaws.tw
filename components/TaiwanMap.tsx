import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import * as topojson from "topojson-client";

import topoData from "@/public/tw_topojson.json";
import { TwTopoJson } from "@/types/topoJson";

const twTopoJson = topoData as unknown as TwTopoJson;

// interface CountyFeature {
//   type: string;
//   properties: {
//     name: string;
//   };
//   geometry: any;
// }

interface TaiwanMapProps {
  data: ShelterCombined[];
}

const TaiwanMap: React.FC<TaiwanMapProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 600;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;");
    const g = svg.append("g");

    const projection = d3
      .geoMercator()
      .fitSize([width, height], topojson.feature(twTopoJson, twTopoJson.objects.twTopoJson));
    const path = d3.geoPath().projection(projection);

    const zoom = d3.zoom<SVGSVGElement, unknown>().scaleExtent([1, 8]).on("zoom", zoomed);

    const counties = g
      .append("g")
      .attr("fill", "#444")
      .attr("cursor", "pointer")
      .selectAll("path")
      .data(topojson.feature(twTopoJson, twTopoJson.objects.twTopoJson).features)
      .join("path")
      .on("click", clicked)
      .attr("d", path);
  }, []);

  // useEffect(() => {
  //   if (!data || !topoData || !svgRef.current) return;

  //   const width = 800;
  //   const height = 600;

  //   const svg = d3
  //     .select(svgRef.current)
  //     .attr("viewBox", [0, 0, width, height])
  //     .attr("width", width)
  //     .attr("height", height)
  //     .attr("style", "max-width: 100%; height: auto;");

  //   const zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", zoomed);

  //   const path = d3.geoPath();

  //   const g = svg.append("g");

  //   const counties = g
  //     .append("g")
  //     .attr("fill", "#444")
  //     .attr("cursor", "pointer")
  //     .selectAll("path")
  //     .data(topojson.feature(topoData, topoData.objects.counties))
  //     .join("path")
  //     .on("click", clicked)
  //     .attr("d", path);

  //   counties.append("title").text((d) => d.properties.name);

  //   g.append("path")
  //     .attr("fill", "none")
  //     .attr("stroke", "white")
  //     .attr("stroke-linejoin", "round")
  //     .attr("d", path(topojson.mesh(topoData, topoData.objects.counties, (a, b) => a !== b)));

  //   // Add circles for shelters
  //   const shelters = g
  //     .selectAll(".shelter")
  //     .data(data)
  //     .enter()
  //     .append("circle")
  //     .attr("class", "shelter")
  //     .attr(
  //       "cx",
  //       (d) =>
  //         path.centroid(
  //           topojson.feature(
  //             topoData,
  //             topoData.objects.counties.geometries.find((c) => c.properties.name === d.rpt_country)
  //           )
  //         )[0]
  //     )
  //     .attr(
  //       "cy",
  //       (d) =>
  //         path.centroid(
  //           topojson.feature(
  //             topoData,
  //             topoData.objects.counties.geometries.find((c) => c.properties.name === d.rpt_country)
  //           )
  //         )[1]
  //     )
  //     .attr("r", 5)
  //     .attr("fill", "red")
  //     .attr("opacity", 0.7);

  //   svg.call(zoom as any);

  //   function reset() {
  //     counties.transition().style("fill", null);
  //     svg
  //       .transition()
  //       .duration(750)
  //       .call(zoom.transform as any, d3.zoomIdentity, d3.zoomTransform(svg.node()!).invert([width / 2, height / 2]));
  //   }

  //   function clicked(event: MouseEvent, d: any) {
  //     const [[x0, y0], [x1, y1]] = path.bounds(d);
  //     event.stopPropagation();
  //     counties.transition().style("fill", null);
  //     d3.select(event.currentTarget as Element)
  //       .transition()
  //       .style("fill", "red");
  //     svg
  //       .transition()
  //       .duration(750)
  //       .call(
  //         zoom.transform as any,
  //         d3.zoomIdentity
  //           .translate(width / 2, height / 2)
  //           .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
  //           .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
  //         d3.pointer(event, svg.node()!)
  //       );
  //   }

  //   function zoomed(event: d3.D3ZoomEvent<SVGSVGElement, any>) {
  //     const { transform } = event;
  //     g.attr("transform", transform);
  //     g.attr("stroke-width", 1 / transform.k);
  //   }

  //   svg.on("click", reset);
  // }, [data, topoData]);

  return <svg ref={svgRef}></svg>;
};

export default TaiwanMap;
