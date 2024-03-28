import { DataTable } from '../_data-table/data-table';
import { columns } from './columns';
import { User } from '@prisma/client';
import { cookies } from 'next/headers';
import { userDataEndpoint } from '@/assets/data/api/endpoints';
import { Button } from '@/components/ui/button';
import Link from 'next/link';



async function getData(cookieStore: any): Promise<User[]> {
  let userList = await fetch(`${userDataEndpoint}`, {
    cache: 'no-store',
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.users;
  });

  return userList;
}

export default async function Users() {
  const cookieStore = cookies();

  const data = await getData(cookieStore);

  return (
    <div className='container mx-auto py-10'>
      <Link href={'/dashboard/entry/users/new'}>
        <Button className='mb-4'>Add new user</Button>
      </Link>
      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
}
