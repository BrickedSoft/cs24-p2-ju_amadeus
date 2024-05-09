import { LandFill, STS, Vehicle, VehicleEntry } from "@prisma/client";
export type CustomVehicle = Vehicle & {
  STS: STS
}
export type CustomVehicleEntry = VehicleEntry & {
  stsName: string | undefined;
  landfillName: string | undefined;
  vehicleNumber: string | undefined;
  landFill: LandFill;
  vehicle: CustomVehicle;
};

export type TrippingVehicle = { vehicle: Vehicle, tripCount: number, totalCost: number }