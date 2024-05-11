"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

import { WasteWithDate } from "@/types/wasteEntry";
import { CustomVehicleEntry, Link as LinkType, Query } from "@allTypes";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { Bulb } from "@icons";

type Props<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pathToCreate?: LinkType;
  setEntry?:
    | Dispatch<SetStateAction<CustomVehicleEntry | undefined>>
    | Dispatch<SetStateAction<WasteWithDate | undefined>>;
  query: Query;
  instruction?: string;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  pathToCreate,
  setEntry,
  query,
  instruction,
}: Props<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        {instruction && (
          <div className="flex items-center gap-1">
            <Bulb className="h-4 w-4 stroke-blue-600" />
            <p className="text-blue-600">{instruction}</p>
          </div>
        )}
        <div className="flex items-center py-4">
          <Input
            placeholder={query.title}
            value={
              (table.getColumn(query.key)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(query.key)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        {pathToCreate && (
          <Link href={pathToCreate.href}>
            <Button rounded={false} size="sm">
              {pathToCreate.title}
            </Button>
          </Link>
        )}
      </div>
      <div className="rounded-md border overflow-scroll h-[500px]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="px-3">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={
                    setEntry ? "hover:bg-primary/20 cursor-pointer" : ""
                  }
                  onClick={() => {
                    // TODO: fix typing here
                    if (setEntry) {
                      //@ts-ignore
                      setEntry(row.original);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-8">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="overflow-hidden text-ellipsis max-w-[20ch] text-nowrap">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TooltipTrigger>
                          <TooltipContent>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-96 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
