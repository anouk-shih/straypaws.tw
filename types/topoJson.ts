// interface ObjectProperties {
//   COUNTYID: string;
//   COUNTYCODE: string;
//   COUNTYNAME: string;
//   COUNTYENG: string;
// }

interface Geometry {
  COUNTYID: string;
  COUNTYCODE: string;
  COUNTYNAME: string;
  COUNTYENG: string;
}

export interface GeometryNShelter extends Geometry {
  shelter?: ShelterCombined;
}

export interface PureTwTopoJson extends TopoJSON.Topology {
  objects: {
    twTopoJson: {
      type: "GeometryCollection";
      geometries: Array<TopoJSON.Polygon<Geometry> | TopoJSON.MultiPolygon<Geometry>>;
    };
  };
  transform: TopoJSON.Transform;
}

export interface TwTopoJson extends TopoJSON.Topology {
  objects: {
    twTopoJson: {
      type: "GeometryCollection";
      geometries: Array<TopoJSON.Polygon<GeometryNShelter> | TopoJSON.MultiPolygon<GeometryNShelter>>;
    };
  };
  transform: TopoJSON.Transform;
}
