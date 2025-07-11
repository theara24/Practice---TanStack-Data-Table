'use client';

import { BlogType } from '@/types/blogtType';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<BlogType>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 80,
  },
  {
    accessorKey: 'title',
    header: 'Title',
    size: 200,
  },
  {
    accessorKey: 'body',
    header: 'Description',
    size: 400,
    cell: ({ row }) => {
      const value: string = row.getValue('body');
      const truncatedText =
        value.length > 100 ? value.substring(0, 100) + '...' : value;
      return <div className="text-sm text-gray-700">{truncatedText}</div>;
    },
  },
];
