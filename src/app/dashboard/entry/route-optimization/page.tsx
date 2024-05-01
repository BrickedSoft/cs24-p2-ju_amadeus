import { stsDataEndpoint, landfillEndpoint } from '@/assets/data/api/endpoints';
import Optimizing from './_optimize/Optimizing';
import { LandFill, STS } from '@prisma/client';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import Loading from '@/components/Loading';

async function getSTS(cookieStore: any): Promise<STS[]> {
  let STSList = await fetch(stsDataEndpoint, {
    cache: 'no-store',
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.sts;
  });

  return STSList;
}

async function getLandfill(cookieStore: any): Promise<LandFill[]> {
  let LandfillList = await fetch(landfillEndpoint, {
    cache: 'no-store',
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.landfills;
  });

  return LandfillList;
}

export default async function RouteOptimization() {
  const cookieStore = cookies();
  const stsList = await getSTS(cookieStore);
  const landfillList = await getLandfill(cookieStore);

  return (
    <div className='container h-full'>
      <Suspense fallback={<Loading />}>
        <Optimizing stsList={stsList} landfillList={landfillList}/>
      </Suspense>
    </div>
  );
}
