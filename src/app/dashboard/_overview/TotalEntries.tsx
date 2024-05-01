import { cookies } from "next/headers";

import {
  api,
  userDataEndpoint,
  vehicleDataEndpoint,
} from "@assets/data/api/endpoints";
import { LandSite, People, Storage, Truck } from "@icons";

const TotalEntries = async () => {
  const cookieStore = cookies();
  const userList = await fetch(`${userDataEndpoint}`, {
    cache: "no-store",
    // @ts-ignore
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data;
  });

  const stsList = await fetch(`${api}/sts`, {
    cache: "no-store",
    // @ts-ignore
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.sts;
  });

  const landfillList = await fetch(`${api}/landfill`, {
    cache: "no-store",
    // @ts-ignore
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.landfills;
  });

  const vehicleList = await fetch(`${vehicleDataEndpoint}`, {
    cache: "no-store",
    // @ts-ignore
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.vehicles;
  });

  return (
    <div className="flex gap-4 justify-between items-center px-12 py-8 border border-gray-300 rounded-lg">
      <div className="flex flex-col gap-4">
        <h2 className="heading-tertiary text-primary">Users</h2>
        <div className="flex gap-4 items-center">
          <People className="fill-primary w-8 h-8" />
          <p className="text-3xl text-primary font-semibold">
            {userList.users.length}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="heading-tertiary text-[#339AF0]">Total STS</h2>
        <div className="flex gap-4 items-center">
          <Storage className="fill-[#339AF0] w-8 h-8" />
          <p className="text-3xl text-[#339AF0] font-semibold">
            {stsList.length}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="heading-tertiary text-[#ae3ec9]">
          Total Landfill Sites
        </h2>
        <div className="flex gap-4 items-center">
          <LandSite className="fill-[#ae3ec9] w-8 h-8" />
          <p className="text-3xl text-[#ae3ec9] font-semibold">
            {landfillList.length}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="heading-tertiary text-[#FF922B]">Total Vehicle</h2>
        <div className="flex gap-4 items-center">
          <Truck className="fill-[#FF922B] w-8 h-8" />
          <p className="text-3xl text-[#FF922B] font-semibold">
            {vehicleList.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalEntries;
