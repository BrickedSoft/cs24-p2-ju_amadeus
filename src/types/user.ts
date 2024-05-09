import { LandFill, STS, User as UserType } from "@prisma/client";

export enum Users {
  systemAdmin = "SystemAdmin",
  stsManager = "STSManager",
}

export type User = UserType & {
  role: string;
  STS?: STS[];
  landfill?: LandFill[];
};
