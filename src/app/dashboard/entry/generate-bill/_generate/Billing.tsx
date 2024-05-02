'use client';
import { CustomVehicleEntry } from '@allTypes';
import { VehicleRoute } from '@prisma/client';
import { useState } from 'react';
import SelectBilling from './BillingSelect';
import BillingPreview from './BillingPreview';

const Billing: React.FC<{
  vehicleRouteList: VehicleRoute[];
  vehicleEntryList: CustomVehicleEntry[];
}> = ({ vehicleEntryList, vehicleRouteList }) => {
  const [vehicleEntry, setVehicleEntry] = useState<CustomVehicleEntry>();

  return (
    <>
      <SelectBilling
        setVehicleEntry={setVehicleEntry}
        vehicleEntryList={vehicleEntryList}
      />
      <BillingPreview
        vehicleEntry={vehicleEntry}
        vehicleRouteList={vehicleRouteList}
      />
    </>
  );
};
export default Billing;
