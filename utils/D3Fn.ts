import * as d3 from "d3";

export function reset(county: typeof d3.create, svg: typeof d3.create, zoom: typeof d3.zoom) {
  county.transition().style("fill", null);
  svg
    .transition()
    .duration(750)
    .call(zoom.transform, d3.zoomIdentity, d3.zoomTransform(svg.node()).invert([width / 2, height / 2]));
}
