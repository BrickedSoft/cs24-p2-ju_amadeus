'use client';
import { Button } from '@/components/ui/button';
import { CustomVehicleEntry } from '@/types';
import { VehicleRoute } from '@prisma/client';
import { useEffect, useState } from 'react';

const BillingGenerate: React.FC<{
  vehicleEntry: CustomVehicleEntry | undefined;
  vehicleRouteList: VehicleRoute[];
}> = ({ vehicleEntry, vehicleRouteList }) => {
  const [vehicleRoute, setVehicleRoute] = useState<VehicleRoute>();
  const [cost, setCost] = useState<number>();

  useEffect(() => {
    if (vehicleEntry) {
      const routeList = vehicleRouteList
        .filter(
          (item) =>
            item.stsId == vehicleEntry.vehicle.stsId &&
            item.landFillId == vehicleEntry.landFillId
        )
        .sort((a, b) => {
          if (a.timestamp && b.timestamp)
            return b.timestamp.getTime() - a.timestamp.getTime();
          return 0;
        });
      if (routeList.length) {
        setVehicleRoute(routeList[0]);
        console.log(routeList[0]);
      } else setVehicleRoute(undefined);
    }
  }, [vehicleRouteList, vehicleEntry]);

  // Calculate cost
  useEffect(() => {
    if (vehicleEntry && vehicleRoute && vehicleEntry.vehicle.capacity) {
      const vehicle = vehicleEntry.vehicle;
      // per kilometer fuel cost for this particular trip
      const c_journey_per_km =
        vehicle.fuelCostUnloaded +
        (vehicleEntry.wasteVolume / vehicle.capacity) *
          (vehicle.fuelCostLoaded - vehicle.fuelCostUnloaded);

      const c_journey = c_journey_per_km * (vehicleRoute.distance / 1000.0);
      setCost(c_journey);
    }
  }, [vehicleEntry, vehicleRoute]);

  return vehicleRoute ? (
    <div>
      <p className='text-sm  text-center text-gray-500 mt-2'>
        DateTime:
        {vehicleEntry && new Date(vehicleEntry.arrivalTime).toLocaleString()}
      </p>
      <p className='text-sm text-center text-gray-500 mt-2'>
        cost: {cost?.toFixed(2)} currency units
      </p>
      <p className='text-sm  text-center text-gray-500 mt-2'>
        vehicle: {vehicleEntry?.vehicleNumber}
      </p>
      <p className='text-sm  text-center text-gray-500 mt-2'>
        distance: {vehicleRoute.distance} meters
      </p>
      <p className='text-sm  text-center text-gray-500 mt-2'>
        duration: {vehicleRoute.duration} minutes
      </p>
      <p className='text-sm  text-center text-gray-500 mt-2'>
        STS: {vehicleEntry?.stsName}
      </p>
      <p className='text-sm  text-center text-gray-500 mt-2'>
        Landfill: {vehicleEntry?.landFill.name}
      </p>
      <p className='text-sm  text-center text-gray-500 mt-2'>
        transported waste volume: {vehicleEntry?.wasteVolume} tons
      </p>
    </div>
  ) : (
    <p className='text-sm font-medium p-4 text-center text-gray-500'>
      No route information available to the Landfill from the STS of the
      selected vehicle.
    </p>
  );
};

export default BillingGenerate;
