import { Dispatch, SetStateAction } from "react";

import { CustomVehicleEntry } from "@allTypes";
import {
  columnData,
  instruction,
  query,
  type,
} from "@/assets/data/dashboard/entry/billingVehicle";
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
      setEntry={setVehicleEntry}
      query={query}
      instruction={instruction}
    />
  );
};

export default SelectBilling;
