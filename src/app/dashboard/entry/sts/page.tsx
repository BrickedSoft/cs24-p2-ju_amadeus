import { cookies } from "next/headers";
import { Suspense } from "react";

import { api } from "@/assets/data/api/endpoints";
import Loading from "@/components/Loading";
import { STS } from "@prisma/client";
import { columns } from "./_sts/columns";
import { DataTable } from "./_sts/data-table";

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
        <DataTable columns={columns} data={data} />
      </Suspense>
    </div>
  );
}
