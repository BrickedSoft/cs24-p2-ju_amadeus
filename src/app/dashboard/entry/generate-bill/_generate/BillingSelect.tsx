import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CustomVehicleEntry } from '@allTypes';
import { VehicleRoute } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';
import { DataTable } from '../_pick-vehicle-entries/DataTable';
import { columns } from '../_pick-vehicle-entries/Columns';

type props = {
  setVehicleEntry: Dispatch<SetStateAction<CustomVehicleEntry | undefined>>;
  vehicleEntryList: CustomVehicleEntry[];
};
const SelectBilling: React.FC<props> = ({
  setVehicleEntry,
  vehicleEntryList,
}) => {
  return (
    <DataTable
      data={vehicleEntryList}
      columns={columns}
      setVehicleEntry={setVehicleEntry}
    />
  );
};

export default SelectBilling;
