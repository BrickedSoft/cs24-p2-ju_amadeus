import { Dispatch, SetStateAction, useMemo, useRef } from "react";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import { Coordinate } from "@allTypes";
import { Input } from "@components/ui/input";
import { center } from "@constants/map";

interface FormValues {
  name: string;
  label: string;
}

const lnglatData: FormValues[] = [
  { name: "lat", label: "Latitude" },
  { name: "lng", label: "Longitude" },
];

const DraggableMarker = ({
  position,
  setPosition,
}: {
  position: Coordinate;
  setPosition: Dispatch<SetStateAction<Coordinate>>;
}) => {
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker: any = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    [setPosition]
  );

  return (
    <div className="mt-4">
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "340px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={position}
          draggable={true}
          eventHandlers={eventHandlers}
          ref={markerRef}
        />
      </MapContainer>

      <div className="flex justify-between my-2">
        {lnglatData.map((ele) => (
          <div
            key={ele.name}
            className="flex items-center gap-2 md:gap-3 mt-4 mb-1"
          >
            <p className="text-sm">{`${ele.label}:`}</p>
            <Input
              type="number"
              step={0.01}
              value={position[ele.name as keyof Coordinate].toFixed(2)}
              className="w-28"
              onChange={(e) => {
                setPosition((prev) => ({
                  ...prev,
                  [ele.name]: parseFloat(e.target.value),
                }));
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DraggableMarker;
