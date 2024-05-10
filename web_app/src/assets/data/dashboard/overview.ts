import { RoleType } from "@/constants/userContants";

export const roleFromString = (value: string | undefined) => {
  if (!value) return RoleType.UNASSIGNED;
  if (value == RoleType.LANDFILL_MANAGER) return RoleType.LANDFILL_MANAGER;
  if (value == RoleType.STS_MANAGER) return RoleType.STS_MANAGER;
  if (value == RoleType.SYSTEM_ADMIN) return RoleType.SYSTEM_ADMIN;
  if (value == RoleType.CONTRACTOR_MANAGER) return RoleType.CONTRACTOR_MANAGER;
  return RoleType.UNASSIGNED;
};

export const title = "See your assigned STS and Landfill locations on the map";

export const labels = {
  sts: "Assigned STS",
  landfill: "Assigned Landfill",
};
