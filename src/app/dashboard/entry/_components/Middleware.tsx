"use client";

import { LandFill, STS, User, Vehicle, VehicleEntry } from "@prisma/client";

import { Column, Link as LinkType } from "@allTypes";
import { columns } from "./columns";
import { DataTable } from "./DataTable";

type Props = {
  data: User[] | Vehicle[] | STS[] | LandFill[] | VehicleEntry[];
  type: string;
  columnData: Column[];
  columnDropdownItems: LinkType[];
  deleteMethod: (
    id: string,
    prevState: any,
    formData: FormData
  ) => Promise<never>;
  pathToCreate: LinkType;
};

const Middleware: React.FC<Props> = ({
  data,
  type,
  columnData,
  columnDropdownItems,
  deleteMethod,
  pathToCreate,
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
    />
  );
};

export default Middleware;
