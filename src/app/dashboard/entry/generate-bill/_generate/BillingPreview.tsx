import { CustomVehicleEntry } from '@/types';
import BillingGenerate from './BillingGenerate';
import { VehicleRoute } from '@prisma/client';
import { Button } from '@/components/ui/button';

const BillingPreview: React.FC<{
  vehicleEntry: CustomVehicleEntry | undefined;
  vehicleRouteList: VehicleRoute[];
}> = ({ vehicleEntry, vehicleRouteList }) => {
  return (
    <div>
      <p className='text-sm font-medium mt-6'>Preview generated bill:</p>
      <div>
        <div className='bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm my-4'>
          {vehicleEntry ? (
            <BillingGenerate
              vehicleEntry={vehicleEntry}
              vehicleRouteList={vehicleRouteList}
            />
          ) : (
            <p className='text-sm font-medium p-4 text-center text-gray-500'>
              No vehicle entry selected.
            </p>
          )}
        </div>
      </div>
      {vehicleEntry && (
        <div className='flex w-full justify-end'>
          <Button
            //TODO: download the bill as pdf
            onClick={() =>{}}
            size={'md'}
            className='rounded-[8px] my-4'>
            Download slip
          </Button>
        </div>
      )}
    </div>
  );
};

export default BillingPreview;
