import { Link } from "@allTypes";
import { RoleType } from "@lib/constants/userContants";
import { links } from "../routes";

export const navLinks: Link[] = [links.overview, links.entry, links.account];

export const sideNavAccount: Link[] = [links.general, links.passwordLogins];

export const sideNavEntry = (roleType: RoleType): Link[] => {
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