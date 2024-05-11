import { cookies } from "next/headers";
import { Suspense } from "react";

import { getWorkHours } from "@/utils/getData";
import {
  columnData,
  pathToCreate,
  query,
  type,
} from "@assets/data/dashboard/entry/work-hour";
import Loading from "@components/Loading";
import _ from "lodash";
import Middleware from "../_components/Middleware";

export default async function WasteForces() {
  const cookieStore = cookies();

  const data = await getWorkHours(cookieStore);
  const groupedData = _.keyBy(data, "workforceId");

  const ids = Object.keys(groupedData);
  const values = Object.values(groupedData);

  return (
    <div className="container h-full flex flex-col gap-10">
      <Suspense fallback={<Loading />}>
        {ids.map((id, index) => {
          // @ts-ignore
          const rows = data.filter((row) => row.workforceId === id);

          return (
            <div key={id} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p>
                  <span className="font-semibold">ID: </span>
                  <span className="text-primary font-medium">{id}</span>
                </p>
                <p>
                  <span className="font-semibold">Name: </span>
                  <span className="text-primary font-medium">
                    {/* @ts-ignore */}
                    {values[index].workforce.name}
                  </span>
                </p>
              </div>
              <Middleware
                // @ts-ignore
                data={rows.map((row) => ({
                  // @ts-ignore
                  overtime: row.overtime,
                  // @ts-ignore
                  date: new Date(row.date).toLocaleDateString(),
                }))}
                type={type}
                columnData={columnData}
                pathToCreate={pathToCreate}
                query={query}
              />
            </div>
          );
        })}
      </Suspense>
    </div>
  );
}
