"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

import { CustomVehicleEntry } from "@allTypes";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

const TableHeader: React.FC<{ column: any; name: string }> = ({
  column,
  name,
}) => (
  <Button
    className="text-sm"
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {name}
    <ArrowUpDown className="ml-2 h-4 w-4 text-sm" />
  </Button>
);

export const columns: ColumnDef<CustomVehicleEntry>[] = [
  {
    accessorKey: "vehicleNumber",
    header: ({ column }) => <TableHeader column={column} name="Vehicle" />,
  },
  {
    accessorKey: "wasteVolume",
    header: ({ column }) => <TableHeader column={column} name="Waste Volume" />,
  },
  {
    accessorKey: "landfillName",
    header: ({ column }) => <TableHeader column={column} name="Landfill" />,
  },
  {
    accessorKey: "arrivalTime",
    header: ({ column }) => <TableHeader column={column} name="Arrival" />,
    cell: (row) => (
      <p>{new Date(row.row.original.arrivalTime).toLocaleString()}</p>
    ),
  },
  {
    accessorKey: "departureTime",
    header: ({ column }) => <TableHeader column={column} name="Departure" />,
    cell: (row) => (
      <p>{new Date(row.row.original.departureTime).toLocaleString()}</p>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const vehicleEntry = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link
              href={`/dashboard/entry/vehicle-entries/${vehicleEntry.id}/delete`}
            >
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
