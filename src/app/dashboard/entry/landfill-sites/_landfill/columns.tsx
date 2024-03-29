'use client';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { LandFill } from '@prisma/client';
import { ArrowUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

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

export const columns: ColumnDef<LandFill>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <TableHeader
        column={column}
        name='Name'
      />
    ),
  },
  {
    accessorKey: 'longitude',
    header: ({ column }) => (
      <TableHeader
        column={column}
        name='Longitude'
      />
    ),
  },
  {
    accessorKey: 'latitude',
    header: ({ column }) => (
      <TableHeader
        column={column}
        name='Latitude'
      />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const landfill = row.original;

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
            <DropdownMenuSeparator />
            <Link href={`/dashboard/entry/landfill-sites/${landfill.id}`}>
              <DropdownMenuItem>Update</DropdownMenuItem>
            </Link>
            <Link href={`/dashboard/entry/landfill-sites/${landfill.id}/delete`}>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
