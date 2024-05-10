"use client";

import { Dispatch, SetStateAction } from "react";
import { LandFill, STS, User, Vehicle, VehicleEntry } from "@prisma/client";

import { Column, CustomVehicleEntry, Link as LinkType, Query } from "@allTypes";
import { columns } from "./columns";
import { DataTable } from "./DataTable";

type Props = {
  data: User[] | Vehicle[] | STS[] | LandFill[] | VehicleEntry[];
  type: string;
  columnData: Column[];
  columnDropdownItems?: LinkType[];
  deleteMethod?: (
    id: string,
    prevState: any,
    formData: FormData
  ) => Promise<never>;
  pathToCreate?: LinkType;
  setVehicleEntry?: Dispatch<SetStateAction<CustomVehicleEntry | undefined>>;
  query: Query;
};

const Middleware: React.FC<Props> = ({
  data,
  type,
  columnData,
  columnDropdownItems,
  deleteMethod,
  pathToCreate,
  setVehicleEntry,
  query,
}) => {
  return (
    <DataTable
      data={data}
      pathToCreate={pathToCreate}
      columns={columns({
        type,
        columnData,
        columnDropdownItems,
        deleteMethod,
      })}
      setVehicleEntry={setVehicleEntry}
      query={query}
    />
  );
};

export default Middleware;
