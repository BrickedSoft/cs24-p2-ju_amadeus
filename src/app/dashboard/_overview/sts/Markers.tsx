"use client";

import { LandFill, STS } from "@prisma/client";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { center } from "@/constants/map";

type Props = {
  stsList: STS[];
  landfillList: LandFill[];
};

const Markers: React.FC<Props> = ({ stsList, landfillList }) => {
  return (
    <MapContainer
      center={{
        lat: stsList[0].latitude ?? center.lat,
        lng: stsList[0].longitude ?? center.lng,
      }}
      zoom={10}
      style={{ height: "100%", width: "100%", zIndex: "0" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {stsList.map((sts) => (
        <Marker
          //   icon={L.divIcon({
          //     className:
          //       "leaflet-marker-icon leaflet-zoom-animated leaflet-interactive",
          //     html: ReactDOMServer.renderToString(
          //       <MarkerIcon className="h-9 w-9 fill-blue-700" />
          //     ),
          //   })}
          key={sts.id}
          position={[sts.latitude as number, sts.longitude as number]}
        >
          <Popup>{sts.name}</Popup>
        </Marker>
      ))}

      {landfillList.map((landfill) => (
        <Marker
          key={landfill.id}
          position={[landfill.latitude as number, landfill.longitude as number]}
        >
          <Popup>{landfill.name}</Popup>
        </Marker>
      ))}

      {/* <GeoJSON key={geoJsonObj.metadata.timestamp} data={geoJsonObj} /> */}
    </MapContainer>
  );
};

export default Markers;
