"use client";

import { VehicleRoute } from "@prisma/client";

import { CustomVehicleEntry } from "@allTypes";
import { error, headings } from "@/assets/data/dashboard/entry/billing";

const BillingGenerate: React.FC<{
  vehicleEntry: CustomVehicleEntry;
  vehicleRoute: VehicleRoute | undefined;
  cost: number;
}> = ({ vehicleEntry, vehicleRoute, cost }) => {
  const ItemRenderer: React.FC<{
    item: { title: string; value: string | undefined };
  }> = ({ item }) => (
    <li>
      <span className="font-semibold text-gray-500">{item.title}: </span>
      <span className="text-primary font-medium">{item.value}</span>
    </li>
  );

  return vehicleRoute ? (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2.5">
        <p className="text-large font-semibold underline underline-offset-4">{headings.vehicle}</p>
        <ul className="flex flex-col gap-2 text-small list-none">
          {[
            {
              title: "Date",
              value:
                vehicleEntry &&
                new Date(vehicleEntry.arrivalTime).toLocaleString(),
            },
            {
              title: "Vehicle",
              value: vehicleEntry?.vehicleNumber,
            },
            {
              title: "STS",
              value: vehicleEntry?.stsName,
            },
            {
              title: "Landfill",
              value: vehicleEntry?.landFill.name,
            },
          ].map((item, index) => (
            <ItemRenderer key={index} item={item} />
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2.5">
        <p className="text-large font-semibold underline underline-offset-4">{headings.routes}</p>
        <ul className="flex flex-col gap-2 text-small list-none">
          {[
            {
              title: "Distance",
              value:
                vehicleRoute?.distance > 1000
                  ? `${(vehicleRoute?.distance / 1000).toFixed(2)} km`
                  : `${vehicleRoute?.distance} m`,
            },
            {
              title: "Duration",
              value: `${vehicleRoute?.duration / 3600 > 1 ? `${Math.floor(vehicleRoute?.duration / 60)} hr` : ""} ${((vehicleRoute?.duration - Math.floor(vehicleRoute?.duration / 3600)) * 3600) / 60 > 1 ? `${Math.floor((vehicleRoute?.duration - Math.floor(vehicleRoute?.duration / 3600) * 3600) / 60)} min` : ""}`,
            },
            {
              title: "Waste Volume",
              value: `${vehicleEntry?.wasteVolume} tons`,
            },
            {
              title: "Cost",
              value: `${cost?.toFixed(2)} currency units`,
            },
          ].map((item, index) => (
            <ItemRenderer key={index} item={item} />
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <p className="font-medium">{error.noRoute}</p>
  );
};

export default BillingGenerate;
