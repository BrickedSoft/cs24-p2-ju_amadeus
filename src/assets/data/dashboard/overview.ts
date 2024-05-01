import { RoleType } from "@lib/constants/userContants";

export const roleFromString = (value: string | undefined) => {
  if (!value) return RoleType.UNASSIGNED;
  if (value == RoleType.LANDFILL_MANAGER) return RoleType.LANDFILL_MANAGER;
  if (value == RoleType.STS_MANAGER) return RoleType.STS_MANAGER;
  if (value == RoleType.SYSTEM_ADMIN) return RoleType.SYSTEM_ADMIN;
  return RoleType.UNASSIGNED;
};
