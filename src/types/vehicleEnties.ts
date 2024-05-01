import { VehicleEntry } from "@prisma/client";

export type CustomVehicleEntry = VehicleEntry & {
  stsName: string | undefined;
  landfillName: string | undefined;
  vehicleNumber: string | undefined;
};
