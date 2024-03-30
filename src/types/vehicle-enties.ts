import { VehicleEntry } from "@prisma/client";

export interface CustomVehicleEntry extends VehicleEntry {
  stsName: string | undefined;
  landfillName: string | undefined;
  vehicleNumber: string | undefined;
}