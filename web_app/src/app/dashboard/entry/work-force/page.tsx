import { cookies } from "next/headers";
import { Suspense } from "react";

import { getWorkForces } from "@/utils/getData";
import {
  columnData,
  columnDropdownItems,
  pathToCreate,
  query,
  type,
} from "@assets/data/dashboard/entry/work-force";
import Loading from "@components/Loading";
import Middleware from "../_components/Middleware";

export default async function WasteForces() {
  const cookieStore = cookies();

  const data = await getWorkForces(cookieStore);

  return (
    <div className="container h-full">
      <Suspense fallback={<Loading />}>
        <Middleware
          data={data}
          type={type}
          columnData={columnData}
          pathToCreate={pathToCreate}
          query={query}
        />
      </Suspense>
    </div>
  );
}
