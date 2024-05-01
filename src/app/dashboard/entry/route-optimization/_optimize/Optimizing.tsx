'use client';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LandFill, STS } from '@prisma/client';
import { UpdateIcon } from '@radix-ui/react-icons';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const DirectionMap = dynamic(() => import('@/components/map/DirectionMap'), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

const Optimizing: React.FC<{ stsList: STS[]; landfillList: LandFill[] }> = ({
  stsList,
  landfillList,
}) => {
  const [start, setStart] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [destination, setDestination] = useState();
  return (
    <>
      <div className='bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mb-4'>
        <div className='flex justify-between'>
          <p className='text-lg font-medium'>Optimize route</p>
          <Button
            type='submit'
            className='text-sm font-medium  text-gray-500 text-left rounded-[8px] p-2 px-3 bg-gray-200 hover:text-white hover:bg-black'>
            {isSubmitting ? (
              <UpdateIcon className='mx-4 h-4 w-4 animate-spin' />
            ) : (
              'Save route'
            )}
          </Button>
        </div>

        <div className='flex mt-4 justify-between z-50'>
          <div className='flex gap-2 items-center'>
            <p className='text-sm'>From: </p>
            <Select
              onValueChange={(value) => {
                const sts = stsList.findLast((item) => item.id == value);
                if (sts?.latitude && sts?.longitude)
                  setStart({
                    lat: sts.latitude,
                    lng: sts.longitude,
                  });
              }}
              key='sts'
              name='STS'>
              <SelectTrigger className='w-[240px]'>
                <SelectValue placeholder='Select STS' />
              </SelectTrigger>
              <SelectContent>
                {stsList.map((sts) => (
                  <SelectItem
                    key={sts.id}
                    value={sts.id}>
                    {sts.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='flex gap-2 items-center'>
            <p className='text-sm'>To: </p>
            <Select
              onValueChange={(value) => {
                const landfill = landfillList.findLast(
                  (item) => item.id == value
                );
                if (landfill?.latitude && landfill?.longitude)
                  setDestination({
                    lat: landfill.latitude,
                    lng: landfill.longitude,
                  });
              }}
              key='landfill'
              name='Landfill'>
              <SelectTrigger className='w-[240px]'>
                <SelectValue placeholder='Select Landfill' />
              </SelectTrigger>
              <SelectContent>
                {landfillList.map((landfill) => (
                  <SelectItem
                    key={landfill.id}
                    value={landfill.id}>
                    {landfill.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DirectionMap
          start={start}
          destination={destination}
        />
      </div>
    </>
  );
};

export default Optimizing;
