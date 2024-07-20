export type GeoData = {
  features: {
    type: string;
    properties: {
      name: string;
      name_traditional_chinese: string;
      cartodb_id: number;
      created_at: string;
      updated_at: string;
      name_taiwanese: string;
    };
    geometry: {
      type: string;
      coordinates: [number, number][][] | [number, number][][][];
    };
  }[];
};
