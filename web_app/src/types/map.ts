import GeoJSON from "geojson";

export type Coordinate = { lat: number; lng: number };

export type OpenrouteserviceFeatureCollection = GeoJSON.FeatureCollection & {
  metadata: {
    timestamp: string;
  };
};

export type instruction = {
  instructions: string[];
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

export type Step = {
  distance: number;
  duration: number;
  instruction: string;
  name: string;
  type: number;
};
