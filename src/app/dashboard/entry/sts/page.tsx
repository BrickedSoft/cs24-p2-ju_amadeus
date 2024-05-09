import { Suspense } from "react";
import { STS } from "@prisma/client";
import { cookies } from "next/headers";

import {
  columnData,
  columnDropdownItems,
  pathToCreate,
  query,
  type,
} from "@/assets/data/dashboard/entry/sts";
import { api } from "@assets/data/api/endpoints";
import Loading from "@components/Loading";
import Middleware from "../_components/Middleware";
import { deleteSts } from "@lib/entry/sts/deleteSts";

async function getData(cookieStore: any): Promise<STS[]> {
  let stsList = await fetch(`${api}/sts`, {
    cache: "no-store",
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.sts;
  });

  return stsList;
}

export default async function STSTable() {
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
          deleteMethod={deleteSts}
          pathToCreate={pathToCreate}
          query={query}
        />
      </Suspense>
    </div>
  );
}
