'use client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { CustomVehicleEntry } from '@allTypes';
import { Button } from '@components/ui/button';

const TableHeader: React.FC<{ column: any; name: string }> = ({
  column,
  name,
}) => (
  <Button
    className='text-sm'
    variant='ghost'
    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
    {name}
    <ArrowUpDown className='ml-2 h-4 w-4 text-sm' />
  </Button>
);

export const columns: ColumnDef<CustomVehicleEntry>[] = [
  {
    accessorKey: 'vehicleNumber',
    header: ({ column }) => (
      <TableHeader
        column={column}
        name='Vehicle'
      />
    ),
  },
  {
    accessorKey: 'wasteVolume',
    header: ({ column }) => (
      <TableHeader
        column={column}
        name='Waste Volume'
      />
    ),
  },
  {
    accessorKey: 'landfillName',
    header: ({ column }) => (
      <TableHeader
        column={column}
        name='Landfill'
      />
    ),
  },
  {
    accessorKey: 'arrivalTime',
    header: ({ column }) => (
      <TableHeader
        column={column}
        name='Arrival'
      />
    ),
    cell: (row) => (
      <p>{new Date(row.row.original.arrivalTime).toLocaleString()}</p>
    ),
  },
];
