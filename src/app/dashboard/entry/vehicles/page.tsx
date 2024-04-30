import { Suspense } from "react";
import { Vehicle } from "@prisma/client";
import { cookies } from "next/headers";

import { vehicleDataEndpoint } from "@assets/data/api/endpoints";
import Loading from "@components/Loading";
import { columns } from "./_vehicles/columns";
import { DataTable } from "./_vehicles/data-table";

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
        <DataTable columns={columns} data={data} />
      </Suspense>
    </div>
  );
}
