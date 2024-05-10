import { VehicleEntry } from "@prisma/client";
import _ from "lodash";
import { cookies } from "next/headers";
import { Suspense } from "react";

import { getWasteEntries } from "@/utils/getData";
import {
  columnData,
  pathToCreate,
  query,
  type,
} from "@assets/data/dashboard/entry/waste-entries";
import Loading from "@components/Loading";
import { dateFormatter } from "@utils/dateFormatter";
import Middleware from "../_components/Middleware";


export default async function WasteEntries() {
  const cookieStore = cookies();

  const data = await getWasteEntries(cookieStore);

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
          pathToCreate={pathToCreate}
          query={query}
        />
      </Suspense>
    </div>
  );
}
