import { Contractor, STS, User, WasteEntry, Workforce } from "@prisma/client";

export type CustomContractor = Contractor & {
  STS: STS;
  manager: User;
  workforces: Workforce[];
  WasteEntry: WasteEntry[];
};
