"use client";

import { LandFill, STS } from "@prisma/client";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { center } from "@constants/map";
import { labels, title } from "@assets/data/dashboard/overview";

type Props = {
  stsList: STS[];
  landfillList: LandFill[];
};

const Markers: React.FC<Props> = ({ stsList, landfillList }) => {
  console.log(stsList, landfillList);

  return (
    <div className="flex flex-col gap-6 border-2 rounded-lg overflow-hidden">
      <div className="px-12 pt-8 text-gray-500 flex flex-col gap-6">
        <p className="text-large font-medium">{title}</p>
        <div className="flex gap-6 justify-between">
          {stsList.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="text-medium font-medium">{labels.sts}</p>
              <div className="flex flex-col gap-1.5 pl-4">
                {stsList.map((sts) => (
                  <div key={sts.id} className="flex gap-2 items-center">
                    <div className="h-2 w-2 bg-blue-500 rounded-full" />
                    <p>{sts.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {landfillList.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="text-medium font-medium">{labels.sts}</p>
              <div className="flex flex-col gap-1.5 pl-4">
                {landfillList.map((landfill) => (
                  <div key={landfill.id} className="flex gap-2 items-center">
                    <div className="h-2 w-2 bg-blue-500 rounded-full" />
                    <p>{landfill.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <MapContainer
        center={{
          lat: stsList[0]?.latitude ?? landfillList[0]?.latitude ?? center.lat,
          lng:
            stsList[0]?.longitude ?? landfillList[0]?.longitude ?? center.lng,
        }}
        zoom={10}
        style={{ height: "450px", width: "100%", zIndex: "0" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {stsList?.map((sts) => (
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

        {landfillList?.map((landfill) => (
          <Marker
            key={landfill.id}
            position={[
              landfill.latitude as number,
              landfill.longitude as number,
            ]}
          >
            <Popup>{landfill.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Markers;
