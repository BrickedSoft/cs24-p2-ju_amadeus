import { LandFill, STS, VehicleRoute } from "@prisma/client";
import { cookies } from "next/headers";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import { CustomVehicleEntry } from "@allTypes";
import {
  vehicleEntriesEndpoint,
  vehicleRouteEndpoint,
} from "@assets/data/api/endpoints";
import Billing from "./_generate/Billing";

async function getVehicleRoutes(cookieStore: any): Promise<VehicleRoute[]> {
  let vehicleRoutes = await fetch(vehicleRouteEndpoint, {
    cache: "no-store",
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.vehicleRoutes;
  });

  return vehicleRoutes;
}

async function getVehicleEntries(
  cookieStore: any
): Promise<CustomVehicleEntry[]> {
  let vehicleEntryList = await fetch(vehicleEntriesEndpoint, {
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

export default async function GenerateBill() {
  const cookieStore = cookies();
  const vehicleRouteList = await getVehicleRoutes(cookieStore);
  const vehicleEntryList = await getVehicleEntries(cookieStore);
  return (
    <div className="container h-full">
      <Suspense fallback={<Loading />}>
        <Billing
          vehicleRouteList={vehicleRouteList}
          vehicleEntryList={vehicleEntryList}
        />
      </Suspense>
    </div>
  );
}
