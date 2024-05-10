import {
  landfillEndpoint,
  stsDataEndpoint,
  vehicleDataEndpoint,
  vehicleRouteEndpoint,
} from '@/assets/data/api/endpoints';
import Optimizing from './_fleet-optimize/Optimizing';
import { LandFill, STS, Vehicle, VehicleRoute } from '@prisma/client';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import Loading from '@/components/Loading';

async function getVehicles(cookieStore: any): Promise<Vehicle[]> {
  let vehicleList = await fetch(vehicleDataEndpoint, {
    cache: 'no-store',
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.vehicles;
  });

  return vehicleList;
}

async function getSTS(cookieStore: any): Promise<STS[]> {
  let STSList = await fetch(stsDataEndpoint, {
    cache: 'no-store',
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.sts;
  });

  return STSList;
}

async function getLandfill(cookieStore: any): Promise<LandFill[]> {
  let LandfillList = await fetch(landfillEndpoint, {
    cache: 'no-store',
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.landfills;
  });

  return LandfillList;
}
async function getVehicleRoutes(cookieStore: any): Promise<VehicleRoute[]> {
  let vehicleRoutes = await fetch(vehicleRouteEndpoint, {
    cache: 'no-store',
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.vehicleRoutes;
  });

  return vehicleRoutes;
}

export default async function RouteOptimization() {
  const cookieStore = cookies();
  const vehicleList = await getVehicles(cookieStore);
  const landfillList = await getLandfill(cookieStore);
  const vehicleRouteList = await getVehicleRoutes(cookieStore);
  const stsList = await getSTS(cookieStore);

  return (
    <div className='container h-full'>
      <Suspense fallback={<Loading />}>
        <Optimizing
          landfillList={landfillList}
          vehicleList={vehicleList}
          routeList={vehicleRouteList}
          stsList={stsList}
        />
      </Suspense>
    </div>
  );
}
