import GeoJSON from "geojson";

export type Coordinate = { lat: number; lng: number };
export type OpenrouteserviceFeatureCollection = GeoJSON.FeatureCollection & {
  metadata: {
      timestamp: string;
  };
}