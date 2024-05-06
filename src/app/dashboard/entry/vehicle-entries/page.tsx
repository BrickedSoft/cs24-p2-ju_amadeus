import { VehicleEntry } from "@prisma/client";
import _ from "lodash";
import { cookies } from "next/headers";
import { Suspense } from "react";

import { CustomVehicleEntry } from "@allTypes";
import { api } from "@assets/data/api/endpoints";
import {
  columnData,
  columnDropdownItems,
  type,
} from "@assets/data/dashboard/entry/vehicle-entries";
import Loading from "@components/Loading";
import { dateFormatter } from "@utils/dateFormatter";
import Middleware from "../_components/Middleware";

async function getData(cookieStore: any): Promise<CustomVehicleEntry[]> {
  let vehicleEntryList = await fetch(`${api}/vehicle-entries`, {
    cache: "no-store",
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.vehicleEntries;
  });

  return vehicleEntryList;
}

export default async function VehicleEntries() {
  const cookieStore = cookies();

  const data = await getData(cookieStore);

  const formattedData = _.chain(data)
    .map((item) => ({
      ...item,
      departureTime: dateFormatter(item.departureTime),
      arrivalTime: dateFormatter(item.arrivalTime),
    }))
    .value();

  return (
    <div className="container h-full">
      <Suspense fallback={<Loading />}>
        <Middleware
          data={formattedData as unknown as VehicleEntry[]}
          type={type}
          columnData={columnData}
          columnDropdownItems={columnDropdownItems}
        />
      </Suspense>
    </div>
  );
}
