import { cookies } from "next/headers";
import { Suspense } from "react";

import { deleteContractor } from "@/lib/entry/contractor/deleteContractor";
import { getContractors } from "@/utils/getData";
import {
  columnData,
  columnDropdownItems,
  pathToCreate,
  query,
  type,
} from "@assets/data/dashboard/entry/contractor";
import Loading from "@components/Loading";
import Middleware from "../_components/Middleware";

const Contractors = async () => {
  const cookieStore = cookies();

  const data = await getContractors(cookieStore);

  return (
    <div className="container h-full">
      <Suspense fallback={<Loading />}>
        <Middleware
          data={data}
          type={type}
          columnData={columnData}
          columnDropdownItems={columnDropdownItems}
          deleteMethod={deleteContractor}
          pathToCreate={pathToCreate}
          query={query}
        />
      </Suspense>
    </div>
  );
};

export default Contractors;
