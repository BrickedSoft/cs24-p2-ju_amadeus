import { NavLink } from "@allTypes";
import { RoleType } from "@lib/constants/userContants";
import { links } from "../routes";

export const navLinks: NavLink[] = [links.overview, links.entry, links.account];

export const sideNavAccount: NavLink[] = [links.general, links.passwordLogins];

export const sideNavEntry = (roleType: RoleType): NavLink[] => {
  if (roleType == RoleType.SYSTEM_ADMIN)
    return [links.users, links.vehicles, links.sts, links.landfillSites];

  if (roleType == RoleType.STS_MANAGER)
    return [
      links.vehicleEntries,
      links.routeOptimization,
      links.fleetOptimization,
    ];

  if (roleType == RoleType.LANDFILL_MANAGER)
    return [links.vehicleEntries, links.generateBill];

  return [links.home];
};
