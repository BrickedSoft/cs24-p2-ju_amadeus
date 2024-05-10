import { Link } from "@allTypes";
import { RoleType } from "@/constants/userContants";
import { links } from "../routes";

export const navLinks: Link[] = [links.overview, links.entry, links.account];

export const sideNavAccount: Link[] = [links.general, links.passwordLogins];

export const sideNavEntry = (roleType: RoleType): Link[] => {
  if (roleType == RoleType.SYSTEM_ADMIN)
    return [
      links.users,
      links.vehicles,
      links.sts,
      links.landfillSites,
      links.contractor,
    ];

  if (roleType == RoleType.STS_MANAGER)
    return [
      links.vehicleEntries,
      links.wasteEntries,
      links.routeOptimization,
      links.fleetOptimization,
    ];

  if (roleType == RoleType.LANDFILL_MANAGER)
    return [links.vehicleEntries, links.generateBill];

  if (roleType == RoleType.CONTRACTOR_MANAGER) return [links.workForce];

  return [links.home];
};
