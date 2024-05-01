import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { Dispatch, SetStateAction, useMemo, useRef } from 'react';

const center = {
  lat: 23.8,
  lng: 90.41,
};
interface FormValues {
  name: string;
  label: string;
}
const lnglatData: FormValues[] = [
  { name: 'lat', label: 'Latitude' },
  { name: 'lng', label: 'Longitude' },
];

const DraggableMarker = ({
  position,
  setPosition,
}: {
  position: { lat: number; lng: number };
  setPosition: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
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
    <div className='mt-4'>
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: '340px', width: '100%' }}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <Marker
          position={position}
          draggable={true}
          eventHandlers={eventHandlers}
          ref={markerRef}
        />
      </MapContainer>

      <div className='flex justify-between mb-2'>
        {lnglatData.map((ele) => (
          <div key={ele.name}>
            <p className='mt-4 mb-1 text-sm'>{`${ele.label}: ${position[
              ele.name as keyof {
                lat: number;
                lng: number;
              }
            ].toFixed(2)}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DraggableMarker;
