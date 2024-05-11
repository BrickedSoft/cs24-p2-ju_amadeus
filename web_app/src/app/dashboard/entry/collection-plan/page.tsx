import { cookies } from 'next/headers';
import { Suspense } from 'react';

import { getCollectionPlans } from '@/utils/getData';
import {
  columnData,
  pathToCreate,
  query,
  type,
} from '@assets/data/dashboard/entry/collection-plan';
import Loading from '@components/Loading';
import Middleware from '../_components/Middleware';

export default async function CollectionPlan() {
  const cookieStore = cookies();

  const data = await getCollectionPlans(cookieStore);

  return (
    <div className='container h-full'>
      <Suspense fallback={<Loading />}>
        <Middleware
          data={data}
          type={type}
          columnData={columnData}
          pathToCreate={pathToCreate}
          query={query}
        />
      </Suspense>
    </div>
  );
}
