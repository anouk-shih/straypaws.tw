// interface ObjectProperties {
//   COUNTYID: string;
//   COUNTYCODE: string;
//   COUNTYNAME: string;
//   COUNTYENG: string;
// }

export interface TwTopoJson extends TopoJSON.Topology {
  objects: {
    twTopoJson: {
      type: "GeometryCollection";
      geometries: Array<TopoJSON.Polygon | TopoJSON.MultiPolygon>;
    };
  };
  transform: TopoJSON.Transform;
}
