"use client";

import { Dispatch, SetStateAction } from "react";
import {
  CollectionPlan,
  Contractor,
  LandFill,
  STS,
  User,
  Vehicle,
  VehicleEntry,
  Workforce,
  WorkHour,
} from "@prisma/client";

import { Column, CustomVehicleEntry, Link as LinkType, Query } from "@allTypes";
import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { WasteWithDate } from "@/types/wasteEntry";

type Props = {
  data:
    | User[]
    | Vehicle[]
    | STS[]
    | LandFill[]
    | VehicleEntry[]
    | Contractor[]
    | Workforce[]
    | WorkHour[]
    | CollectionPlan[]
    | WasteWithDate[];
  type: string;
  columnData: Column[];
  columnDropdownItems?: LinkType[];
  deleteMethod?: (
    id: string,
    prevState: any,
    formData: FormData
  ) => Promise<never>;
  pathToCreate?: LinkType;
  setEntry?:
    | Dispatch<SetStateAction<CustomVehicleEntry | undefined>>
    | Dispatch<SetStateAction<WasteWithDate | undefined>>;
  query: Query;
  instruction?: string;
};

const Middleware: React.FC<Props> = ({
  data,
  type,
  columnData,
  columnDropdownItems,
  deleteMethod,
  pathToCreate,
  setEntry,
  query,
  instruction,
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
      setEntry={setEntry}
      query={query}
      instruction={instruction}
    />
  );
};

export default Middleware;
