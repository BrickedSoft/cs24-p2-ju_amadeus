"use client";

import { useState } from "react";
import { LandFill, STS, User, Vehicle, VehicleEntry } from "@prisma/client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { Column, Link as LinkType } from "@allTypes";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import DeleteAlert from "./DeleteAlert";
import TableHeader from "./TableHeader";

type ColumnProps = {
  type: string;
  columnData: Column[];
  columnDropdownItems: LinkType[];
};

export const columns = ({
  type,
  columnData,
  columnDropdownItems,
}: ColumnProps): ColumnDef<
  User | Vehicle | STS | LandFill | VehicleEntry
>[] => {
  //@ts-ignore
  const columns: ColumnDef<User | Vehicle | STS | LandFill | VehicleEntry>[] =
    columnData.map((item) => ({
      accessorKey: item.accessorKey,
      header: ({
        column,
      }: {
        column: User | Vehicle | STS | LandFill | VehicleEntry;
      }) => <TableHeader column={column} name={item.name} />,
    }));

  return [
    ...columns,
    {
      id: "actions",
      cell: ({ row }) =>
        (() => {
          const data = row.original;
          const [open, setOpen] = useState(false);

          return (
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {columnDropdownItems.map((item, index) =>
                  item.title.toLowerCase() === "delete" ? (
                    <DeleteAlert
                      key={index}
                      setOpen={setOpen}
                      type={type}
                      data={data}
                    />
                  ) : (
                    <Link key={index} href={item.href.replace("$id$", data.id)}>
                      <DropdownMenuItem>{item.title}</DropdownMenuItem>
                    </Link>
                  )
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        })(),
    },
  ];
};
