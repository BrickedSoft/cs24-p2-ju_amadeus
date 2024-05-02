import GeoJSON from "geojson";

export type Coordinate = { lat: number; lng: number };
export interface OpenrouteserviceFeatureCollection
  extends GeoJSON.FeatureCollection {
  metadata: {
    timestamp: string;
  };
}
