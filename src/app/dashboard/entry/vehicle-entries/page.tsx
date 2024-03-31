import { cookies } from "next/headers";
import { Suspense } from "react";

import { api } from "@/assets/data/api/endpoints";
import Loading from "@/components/Loading";
import { CustomVehicleEntry } from "@/types/vehicle-enties";
import { columns } from "./_vehicle-entries/columns";
import { DataTable } from "./_vehicle-entries/data-table";

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

  return (
    <div className="container h-full">
      <Suspense fallback={<Loading />}>
        <DataTable columns={columns} data={data} />
      </Suspense>
    </div>
  );
}
