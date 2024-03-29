'use client';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Vehicle } from '@prisma/client';
import { ArrowUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

export const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: 'number',
    header: ({ column }) => (
      <TableHeader
        column={column}
        name='Number'
      />
    ),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <TableHeader
        column={column}
        name='Type'
      />
    ),
  },
  {
    accessorKey: 'capacity',
    header: ({ column }) => (
      <TableHeader
        column={column}
        name='Capacity'
      />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const vehicle = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <DotsHorizontalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
