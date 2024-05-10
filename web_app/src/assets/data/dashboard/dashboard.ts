import { RoleType } from "@/constants/userContants";

export interface NavLink {
  label: string;
  href: string;
}
const currentPath = "/dashboard";

export const navLinks: NavLink[] = [
  { label: "Overview", href: `${currentPath}` },
  { label: "Entry", href: `${currentPath}/entry` },
  { label: "Account", href: `${currentPath}/account` },
];

export const sideNavAccount: NavLink[] = [
  {
    label: "General",
    href: `${currentPath}/account/general`,
  },
  {
    label: "Password and logins",
    href: `${currentPath}/account/password-logins`,
  },
];

export const sideNavEntry = (roleType: RoleType) => {
  if (roleType == RoleType.SYSTEM_ADMIN)
    return [
      {
        label: "Users",
        href: `${currentPath}/entry/users`,
      },
      {
        label: "Vehicles",
        href: `${currentPath}/entry/vehicles`,
      },
      {
        label: "STS",
        href: `${currentPath}/entry/sts`,
      },
      {
        label: "Landfill Sites",
        href: `${currentPath}/entry/landfill-sites`,
      },
    ];

  if (roleType == RoleType.STS_MANAGER)
    return [
      {
        label: "Vehicle Entries",
        href: `${currentPath}/entry/vehicle-entries`,
      },
      {
        label: "Route optimization",
        href: `${currentPath}/entry/route-optimization`,
      },
      {
        label: "Saved routes",
        href: `${currentPath}/entry/saved-routes`,
      },
      {
        label: "Fleet optimization",
        href: `${currentPath}/entry/fleet-optimization`,
      },
    ];

  if (roleType == RoleType.LANDFILL_MANAGER)
    return [
      {
        label: "Vehicle Entries",
        href: `${currentPath}/entry/vehicle-entries`,
      },
      {
        label: "Generate Bill",
        href: `${currentPath}/entry/generate-bill`,
      },
    ];

  return [{ href: `/`, label: "none" }];
};

export const roleFromString = (value: string | undefined) => {
  if (!value) return RoleType.UNASSIGNED;
  if (value == RoleType.LANDFILL_MANAGER) return RoleType.LANDFILL_MANAGER;
  if (value == RoleType.STS_MANAGER) return RoleType.STS_MANAGER;
  if (value == RoleType.SYSTEM_ADMIN) return RoleType.SYSTEM_ADMIN;
  return RoleType.UNASSIGNED;
};
