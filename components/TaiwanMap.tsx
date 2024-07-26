"use client";

import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import * as topojson from "topojson-client";

import topoData from "@/public/tw_topojson.json";
import { PureTwTopoJson, TwTopoJson } from "@/types/topoJson";
import { combineGeoDataNShelterData } from "@/utils/shelterFn";

const twTopoJson = topoData as unknown as PureTwTopoJson;

// svg size
const width = 800;
const height = 600;
// info box size
const infoBoxWidth = 300;
const infoBoxHeight = 300;
interface TaiwanMapProps {
  data: ShelterCombined[];
}

const TaiwanMap: React.FC<TaiwanMapProps> = ({ data }) => {
  // save map svg element
  const svgRef = useRef<SVGSVGElement | null>(null);
  // combined data of topojson and shelter data
  const [combinedData, setCombinedData] = useState<TwTopoJson | undefined>();

  useEffect(() => {
    // if the datasets are not ready, return
    if (!data || !twTopoJson) return;
    // combine the topojson and shelter data
    setCombinedData(() => combineGeoDataNShelterData(data, twTopoJson));
  }, [data]);

  useEffect(() => {
    // if the svg element or combined data is not ready, return
    if (!svgRef.current || !combinedData) return;

    // start drawing the map

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .on("zoom", zoomed)
      // ignore events originating from the info box
      .filter((event) => {
        return !event.target.closest(".info-box-container");
      });

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;")
      .on("click", (event) => {
        if (!event.target.closest(".info-box-container")) {
          reset();
        }
      });

    // clear any existing content
    svg.selectAll("*").remove();

    const g = svg.append("g");

    const geometries = topojson.feature(combinedData, combinedData.objects.twTopoJson);
    const projection = d3.geoMercator().center([123, 24]).scale(5500).fitSize([width, height], geometries);
    // draw the map
    const path = d3.geoPath().projection(projection);

    // draw counties
    g.selectAll("path")
      .data(geometries.features)
      .enter()
      .append("path")
      .attr("class", "county")
      .attr("fill", "#ebf0e4")
      .attr("d", path)
      .attr("cursor", "pointer")
      .on("click", function (event, d) {
        if (!event.target.closest(".info-box-container")) {
          clicked.call(this, event, d);
        }
      });
    // draw county borders
    g.append("path")
      .datum(topojson.mesh(combinedData, combinedData.objects.twTopoJson, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "lightgray")
      .attr("stroke-linejoin", "round")
      .attr("d", path);

    // Add circles for shelters
    g.selectAll(".shelter")
      .data(data.flatMap((cityData) => cityData.shelters))
      .enter()
      .append("circle")
      .attr("class", "shelter")
      .attr("cursor", "pointer")
      .attr("cx", (d) => projection([d.lng, d.lat])![0])
      .attr("cy", (d) => projection([d.lng, d.lat])![1])
      .attr("r", 2)
      .attr("fill", "red")
      .append("title")
      .text((d) => d.name);

    // info box
    const infoBoxContainer = svg
      .append("g")
      .attr("class", "info-box-container")
      .style("visibility", "hidden")
      .on("click", (e) => {
        e.stopPropagation();
      });
    // draw info box
    infoBoxContainer
      .append("rect")
      .attr("width", infoBoxWidth)
      .attr("height", infoBoxHeight)
      .attr("fill", "white")
      .attr("stroke", "lightgray")
      .attr("r", 5);
    // draw clip path
    infoBoxContainer
      .append("clipPath")
      .attr("id", "info-box-clip")
      .append("rect")
      .attr("width", infoBoxWidth - 2) // leave space for scrollbar
      .attr("height", infoBoxHeight);
    // info box itself
    const infoBox = infoBoxContainer
      .append("g")
      .attr("clip-path", "url(#info-box-clip)")
      .append("foreignObject")
      .attr("width", infoBoxWidth - 2)
      .attr("height", infoBoxHeight)
      .append("xhtml:div")
      .style("width", "100%")
      .style("height", "100%")
      .style("overflow-y", "auto")
      .style("padding", "10px")
      .style("box-sizing", "border-box")
      // prevent zooming when scrolling
      .on("wheel", (event) => {
        event.stopPropagation();
      });

    const infoText = infoBox.append("div").style("word-wrap", "break-word");

    svg.call(zoom);

    function reset() {
      infoBoxContainer.style("visibility", "hidden");
      d3.selectAll(".county").transition().style("fill", null);

      svg
        .transition()
        .duration(750)
        .call(zoom.transform as any, d3.zoomIdentity, d3.zoomTransform(svg.node()!).invert([width / 2, height / 2]));
    }

    function clicked(this: any, event: MouseEvent, d: any) {
      const [[x0, y0], [x1, y1]] = path.bounds(d);
      event.stopPropagation();

      d3.selectAll(".county").transition().style("fill", null);
      d3.select(this).transition().style("fill", "#fcd34d");

      // clear prev info
      infoText.html("");

      const shelters = d.properties.shelter.shelters;

      // info box of the county and shelters
      infoText.html(`
        <h3 class='text-3xl mb-3'> ${d.properties.COUNTYNAME} ${d.properties.shelter.citySummary.year}年度 ${
        d.properties.shelter.citySummary.month
      }月 </h3>
        <p class='text-xl'> 本月進所數/隻：${d.properties.shelter.citySummary.acceptMonthly} </p>
        <p class='text-xl'> 本月領養數/隻：${d.properties.shelter.citySummary.adoptMonthly} </p>
        <p class='text-xl mb-5'> 本月死亡數/隻：${
          d.properties.shelter.citySummary.endMonthly + d.properties.shelter.citySummary.deadMonthly
        } </p>
        ${shelters.map(
          (shelter: ShelterCombined["shelters"][number]) => `
          ${
            shelter.url
              ? `<a class='text-2xl text-amber-500' href="${shelter.url}" target="_blank">${shelter.name}</a>`
              : `
            <p class='text-2xl'>${shelter.name}</p>`
          }
          <p class='text-xl'>${shelter.address}</p>
          <p class='text-xl'>${shelter.phone}</p>
          <p class='text-xl'>${shelter.openTime}</p>
          `
        )}
`);

      infoBoxContainer.style("visibility", "visible");

      svg
        .transition()
        .duration(750)
        .call(
          zoom.transform as any,
          d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
          d3.pointer(event, svg.node()!)
        )
        .on("end", positionInfoBox);
    }

    function zoomed(event: d3.D3ZoomEvent<SVGSVGElement, any>) {
      const { transform } = event;
      g.attr("transform", transform.toString());
      g.attr("stroke-width", 1 / transform.k);
    }

    function positionInfoBox() {
      infoBoxContainer.attr("transform", `translate(0,0)`);
    }

    // svg.on("click", reset);
  }, [combinedData, data]);

  return <svg ref={svgRef} className="tw-map"></svg>;
};

export default TaiwanMap;
