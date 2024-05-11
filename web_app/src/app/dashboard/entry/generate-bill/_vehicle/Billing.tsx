"use client";

import { useState } from "react";
import { VehicleRoute } from "@prisma/client";

import { CustomVehicleEntry } from "@allTypes";
import BillingPreview from "./BillingPreview";
import SelectBilling from "./BillingSelect";

const Billing: React.FC<{
  vehicleRouteList: VehicleRoute[];
  vehicleEntryList: CustomVehicleEntry[];
}> = ({ vehicleEntryList, vehicleRouteList }) => {
  const [vehicleEntry, setVehicleEntry] = useState<CustomVehicleEntry>();

  return (
    <div className="h-full flex flex-col gap-8">
      <SelectBilling
        setVehicleEntry={setVehicleEntry}
        vehicleEntryList={vehicleEntryList}
      />
      <BillingPreview
        vehicleEntry={vehicleEntry}
        setVehicleEntry={setVehicleEntry}
        vehicleRouteList={vehicleRouteList}
      />
    </div>
  );
};
export default Billing;
