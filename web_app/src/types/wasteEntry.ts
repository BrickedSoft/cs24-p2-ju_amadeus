import { Contractor, STS, Vehicle, WasteEntry } from "@prisma/client";

export type CustomWasteEntry = WasteEntry & {
  STS: STS;
  vehicle: Vehicle;
  contractor: Contractor;
};

export type WasteWithDate = {
  wasteVolume: number;
  collectionDate: Date;
  shortage: number;
  totalFine: number;
  pay: number;
  totalBill: number;
};
