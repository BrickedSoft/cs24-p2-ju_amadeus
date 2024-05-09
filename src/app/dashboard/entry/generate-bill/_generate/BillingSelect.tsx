import { Dispatch, SetStateAction } from "react";

import { CustomVehicleEntry } from "@allTypes";
import { columnData, query, type } from "@assets/data/dashboard/entry/billing";
import Middleware from "../../_components/Middleware";

type props = {
  setVehicleEntry: Dispatch<SetStateAction<CustomVehicleEntry | undefined>>;
  vehicleEntryList: CustomVehicleEntry[];
};
const SelectBilling: React.FC<props> = ({
  setVehicleEntry,
  vehicleEntryList,
}) => {
  return (
    <Middleware
      data={vehicleEntryList}
      type={type}
      columnData={columnData}
      setVehicleEntry={setVehicleEntry}
      query={query}
    />
  );
};

export default SelectBilling;
