import { useRef } from "react";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";

import { center } from "@constants/map";

type Props = {
  control: Control<
    {
      [x: string]: any;
    },
    any
  >;
  setValue: UseFormSetValue<{
    [x: string]: any;
  }>;
};

const DraggableMarker: React.FC<Props> = ({ control, setValue }) => {
  const markerRef = useRef(null);

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "340px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Controller
        control={control}
        name="position"
        render={({ field: { value } }) => (
          <Marker
            position={{
              lat: control._formValues.latitude,
              lng: control._formValues.longitude,
            }}
            draggable={true}
            eventHandlers={(() => ({
              dragend() {
                const marker: any = markerRef.current;
                if (marker != null) {
                  setValue("latitude", marker.getLatLng().lng, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setValue("longitude", marker.getLatLng().lat, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                }
              },
            }))()}
            ref={markerRef}
          />
        )}
      />
    </MapContainer>
  );
};

export default DraggableMarker;
