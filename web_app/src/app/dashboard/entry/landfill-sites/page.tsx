import { Suspense } from "react";
import { cookies } from "next/headers";

import { api } from "@assets/data/api/endpoints";
import {
  columnData,
  columnDropdownItems,
  pathToCreate,
  query,
  type,
} from "@assets/data/dashboard/entry/landfill-sites";
import Loading from "@components/Loading";
import { LandFill } from "@prisma/client";
import Middleware from "../_components/Middleware";
import { deleteLandfill } from "@lib/entry/landfill-sites/deleteLandfill";

async function getData(cookieStore: any): Promise<LandFill[]> {
  let landfillList = await fetch(`${api}/landfill`, {
    cache: "no-store",
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.landfills;
  });

  return landfillList;
}

export default async function LandfillTable() {
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
          deleteMethod={deleteLandfill}
          pathToCreate={pathToCreate}
          query={query}
        />
      </Suspense>
    </div>
  );
}
