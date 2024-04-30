import { cookies } from "next/headers";
import { Suspense } from "react";

import { api } from "@assets/data/api/endpoints";
import Loading from "@components/Loading";
import { LandFill } from "@prisma/client";
import { columns } from "./_landfill/Columns";
import { DataTable } from "./_landfill/DataTable";

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
        <DataTable columns={columns} data={data} />
      </Suspense>
    </div>
  );
}
