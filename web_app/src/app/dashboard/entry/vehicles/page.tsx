import { Suspense } from "react";
import { Vehicle } from "@prisma/client";
import { cookies } from "next/headers";

import { vehicleDataEndpoint } from "@assets/data/api/endpoints";
import {
  columnData,
  columnDropdownItems,
  pathToCreate,
  query,
  type
} from "@assets/data/dashboard/entry/vehicles";
import Loading from "@components/Loading";
import { deleteVehicle } from "@lib/entry/vehicles/deleteVehicle";
import Middleware from "../_components/Middleware";

async function getData(cookieStore: any): Promise<Vehicle[]> {
  let vehicleList = await fetch(`${vehicleDataEndpoint}`, {
    cache: "no-store",
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.vehicles;
  });

  return vehicleList;
}

export default async function Vehicles() {
  const cookieStore = cookies();

  const data = await getData(cookieStore);

  return (
    <div className="container h-full">
      <Suspense fallback={<Loading />}>
        <Middleware
          data={data}
          type={type}
          columnData={columnData}
          columnDropdownItems={columnDropdownItems}
          deleteMethod={deleteVehicle}
          pathToCreate={pathToCreate}
          query={query}
        />
      </Suspense>
    </div>
  );
}
