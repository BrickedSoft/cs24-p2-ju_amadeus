import { Suspense } from "react";
import { cookies } from "next/headers";

import Loading from "@components/Loading";
import { getLandfill, getSTS } from "@/utils/getData";
import Optimizing from "./_optimize/Optimizing";

export default async function RouteOptimization() {
  const cookieStore = cookies();
  const stsList = await getSTS(cookieStore);
  const landfillList = await getLandfill(cookieStore);

  return (
    <div className="container h-full">
      <Suspense fallback={<Loading />}>
        <Optimizing stsList={stsList} landfillList={landfillList} />
      </Suspense>
    </div>
  );
}
