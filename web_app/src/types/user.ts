import { LandFill, STS, User as UserType } from "@prisma/client";

export enum Users {
  admin = "SystemAdmin",
  sts = "STSManager",
  landfill = "LandfillManager",
}

export type User = UserType & {
  role: string;
  STS: STS[];
  landfill: LandFill[];
};
