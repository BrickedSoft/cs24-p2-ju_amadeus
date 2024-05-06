"use client";

import { LandFill, STS, User, Vehicle } from "@prisma/client";

import { Column, Link as LinkType } from "@allTypes";
import { columns } from "./columns";
import { DataTable } from "./DataTable";

type Props = {
  data: User[] | Vehicle[] | STS[] | LandFill[];
  type: string;
  columnData: Column[];
  columnDropdownItems: LinkType[];
};

const Middleware: React.FC<Props> = ({
  data,
  type,
  columnData,
  columnDropdownItems,
}) => {
  return (
    <DataTable
      data={data}
      columns={columns({
        type,
        columnData,
        columnDropdownItems,
      })}
    />
  );
};

export default Middleware;
