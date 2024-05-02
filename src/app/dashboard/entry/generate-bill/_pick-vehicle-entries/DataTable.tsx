'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Input } from '@components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { CustomVehicleEntry } from '@allTypes';
import { ScrollArea } from '@/components/ui/scroll-area';

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setVehicleEntry: Dispatch<SetStateAction<CustomVehicleEntry | undefined>>;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  setVehicleEntry,
}: DataTableProps<TData, TValue>) {
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
      <div className='flex justify-between items-center'>
        <div className='flex justify-between py-4 w-full items-center'>
          <p className='text-sm font-medium'>Select a vehicle entry to generate bill:</p>
          <Input
            placeholder='Search by vehicle number'
            value={
              (table.getColumn('vehicleNumber')?.getFilterValue() as string) ??
              ''
            }
            onChange={(event) =>
              table
                .getColumn('vehicleNumber')
                ?.setFilterValue(event.target.value)
            }
            className='max-w-sm'
          />
        </div>
      </div>
      <ScrollArea className='h-[360px] rounded-md border'>
        <Table>
          {/* TODO: sticky not sticking */}
          <TableHeader className='sticky top-0 bg-secondary'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  onClick={() => {
                    // TODO: fix typing here
                    //@ts-ignore
                    setVehicleEntry(row.original);
                  }}
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
