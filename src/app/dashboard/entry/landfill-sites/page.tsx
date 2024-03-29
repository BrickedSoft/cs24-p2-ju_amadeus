import { DataTable } from './_landfill/data-table';
import { columns } from './_landfill/columns';
import { cookies } from 'next/headers';
import { api } from '@/assets/data/api/endpoints';
import { LandFill } from '@prisma/client';

async function getData(cookieStore: any): Promise<LandFill[]> {
  let landfillList = await fetch(`${api}/landfill`, {
    cache: 'no-store',
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.landfills;
  });

  return landfillList;
}

export default async function LandfillTable() {
  const cookieStore = cookies();

  const data = await getData(cookieStore);

  return (
    <div className='container h-full'>
      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
}
