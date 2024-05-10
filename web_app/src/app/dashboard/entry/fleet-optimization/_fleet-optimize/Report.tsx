import _ from "lodash";
import { Suspense } from "react";

import { TrippingVehicle } from "@allTypes";
import { columnData, query, type } from "@assets/data/dashboard/entry/fleet";
import Loading from "@components/Loading";
import Middleware from "../../_components/Middleware";

type Props = {
  trippingVehicles: TrippingVehicle[];
};

const Report: React.FC<Props> = ({ trippingVehicles }) => {
  return trippingVehicles?.length ? (
    <div className="bg-background px-6 py-8 rounded-md border-[1.45px] border-gray-300 shadow-sm mt-8 mb-4 relative">
      <p className="font-medium"></p>
      <Suspense fallback={<Loading />}>
        <Middleware
          data={_.map(trippingVehicles, (item) =>
            _.omit({ ...item, ...item.vehicle }, "vehicle")
          )}
          type={type}
          columnData={columnData}
          query={query}
        />
      </Suspense>
    </div>
  ) : null;
};

export default Report;
