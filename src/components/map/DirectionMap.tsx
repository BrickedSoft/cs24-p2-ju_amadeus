'use client';
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import {useEffect } from 'react';

type Coordinate = { lat: number; lng: number };

const DirectionMap: React.FC<{
  start: Coordinate | undefined;
  destination: Coordinate | undefined;
  setGeoJsonObj: any;
  geoJsonObj: GeoJSON.FeatureCollection | null;
}> = ({ start, destination, setGeoJsonObj, geoJsonObj }) => {
  useEffect(() => {
    const fetchDirection = async () => {
      if (start && destination) {
        const response = await fetch(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62481abc2ac3be5b4b23a4de857c38183326&start=${start.lng},${start.lat}&end=${destination.lng},${destination.lat}`
        );
        const data = await response.json();

        if (data.features) {
          setGeoJsonObj(data);
          console.log(data);
        } else {
          console.log('Error: Missing route geometry in response');
        }
      }
    };
    fetchDirection();
  }, [destination, start]);

  return (
    start &&
    destination &&
    geoJsonObj && (
      <>
        <div className='mt-4'>
          <MapContainer
            center={start}
            zoom={12}
            style={{ height: '450px', width: '100%', zIndex: '0' }}>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

            <Marker position={start}>
              <Popup>STS</Popup>
            </Marker>

            <Marker position={destination}>
              <Popup>Landfill</Popup>
            </Marker>

            <GeoJSON
              key={geoJsonObj.metadata.timestamp}
              data={geoJsonObj}
            />
          </MapContainer>
        </div>
        <div className='bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 mt-8'>
          {geoJsonObj?.features.map((feature) => (
            <div key={feature.properties.id}>
              {feature.properties.segments.map((segment) => (
                <div key={segment.id}>
                  {segment.steps.map((step) => (
                    <div
                      key={step.id}
                      className='bg-green m-4'>
                      <p>{step.instruction}</p>
                      <div>
                        <p>distance: {step.distance}</p>
                        <p>duration: {step.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </>
    )
  );
};

export default DirectionMap;
