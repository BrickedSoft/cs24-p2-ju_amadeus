"use client";

import { Key, useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { LatLngExpression } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import {
  Coordinate,
  OpenrouteserviceFeatureCollection,
  Step as StepType,
} from "@allTypes";
import { springSingleBounce } from "@constants/animation";
import Step from "./Step";
import _ from "lodash";
import { Clock, Distance } from "../Icons";

type Props = {
  start: { name: string | undefined; cord: Coordinate | undefined };
  destination: { name: string | undefined; cord: Coordinate | undefined };
  setGeoJsonObj: any;
  geoJsonObj: OpenrouteserviceFeatureCollection | null;
};

const DirectionMap: React.FC<Props> = ({
  start,
  destination,
  setGeoJsonObj,
  geoJsonObj,
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 0.75", "1 0.75"],
  });
  const [timelineScrollPosition, setTimelineScrollPosition] = useState(0);
  scrollYProgress.on("change", (latest) => {
    setTimelineScrollPosition(latest);
  });

  useEffect(() => {
    if (
      start.cord?.lat &&
      start.cord?.lng &&
      destination.cord?.lat &&
      destination.cord?.lng
    ) {
      (async () => {
        if (start && destination) {
          //TODO: API Key exposed here
          const response = await fetch(
            `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf624859738a47d29f41438c5e81d6af957204&start=${start?.cord?.lng},${start?.cord?.lat}&end=${destination?.cord?.lng},${destination?.cord?.lat}`
          );
          const data = await response.json();

          if (data.features) {
            setGeoJsonObj(data);
            console.log(data);
          } else {
            console.log("Error: Missing route geometry in response");
          }
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination.cord, start.cord]);

  const totalUnits = _.chain(geoJsonObj?.features)
    .map((item) => item?.properties?.segments)
    .flatten()
    .value()[0];

  return (
    start &&
    destination &&
    geoJsonObj && (
      <>
        <div className="mt-4">
          <MapContainer
            center={start.cord}
            zoom={12}
            style={{ height: "450px", width: "100%", zIndex: "0" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={start?.cord as LatLngExpression}>
              <Popup>STS</Popup>
            </Marker>

            <Marker position={destination?.cord as LatLngExpression}>
              <Popup>Landfill</Popup>
            </Marker>

            <GeoJSON key={geoJsonObj.metadata.timestamp} data={geoJsonObj} />
          </MapContainer>
        </div>

        <div className="rounded-md border-[1.45px] border-gray-300 mt-8 overflow-hidden">
          <div className="bg-primary py-8 flex flex-col gap-2 justify-center items-center heading-tertiary !text-white font-semibold">
            <div className="flex gap-2.5 items-center">
              <Distance className="h-7 w-7 fill-white" />
              <div className="flex gap-2">
                <span className="capitalize">Total Distance:</span>
                <span className="font-medium">
                  {totalUnits.distance > 1000
                    ? `${(totalUnits.distance / 1000).toFixed(2)} km`
                    : `${totalUnits.distance} m`}
                </span>
              </div>
            </div>

            <div className="flex gap-2.5 items-center pb-1.5">
              <Clock className="h-7 w-7 fill-white" />
              <div className="flex gap-2">
                <span className="capitalize">Approx. Duration:</span>
                <span className="font-medium">{`${totalUnits.duration / 3600 > 1 ? `${Math.floor(totalUnits.duration / 60)} hr` : ""} ${((totalUnits.duration - Math.floor(totalUnits.duration / 3600)) * 3600) / 60 > 1 ? `${Math.floor((totalUnits.duration - Math.floor(totalUnits.duration / 3600) * 3600) / 60)} min` : ""}`}</span>
              </div>
            </div>
          </div>

          <div className="bg-background px-6 py-4">
            {geoJsonObj?.features.map((feature) => (
              <div key={feature?.properties?.id}>
                {feature?.properties?.segments?.map(
                  (segment: {
                    id: Key | null | undefined;
                    steps: StepType[];
                  }) => (
                    <motion.div
                      key={segment.id}
                      ref={ref}
                      variants={fadeInVariants}
                      className="relative divide-y-[0.25px] divide-primary/20 mt-6"
                    >
                      {segment.steps.map((step, index, steps) => (
                        <Step
                          key={index}
                          step={step}
                          destination={destination?.name as string}
                          last={index === steps.length - 1}
                        />
                      ))}

                      <motion.div
                        className="absolute w-auto top-12 left-[38px] -translate-x-2/4 border-l-2 border-dotted border-l-light-gray-aa z-30"
                        style={{
                          height: `${timelineScrollPosition * 100}%`,
                        }}
                      ></motion.div>
                    </motion.div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    )
  );
};

export default DirectionMap;

const fadeInVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      ...springSingleBounce,
    },
  },
};
