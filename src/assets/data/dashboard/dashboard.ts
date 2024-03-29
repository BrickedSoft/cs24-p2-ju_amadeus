import { RoleType } from "@/lib/constants/userContants";

export interface NavLink {
  label: string;
  href: string;
}
const currentPath = '/dashboard';

export const navLinks: NavLink[] = [
  { label: 'Overview', href: `${currentPath}` },
  { label: 'Entry', href: `${currentPath}/entry` },
  { label: 'Account', href: `${currentPath}/account` },
];

export const sideNavAccount: NavLink[] = [{
  label: 'General',
  href: `${currentPath}/account/general`
},
{
  label: 'Password and logins',
  href: `${currentPath}/account/password-logins`
}];

export const sideNavEntry = (roleType: RoleType) => {
  let sideNavValues: NavLink[] = []
  if (roleType == RoleType.SYSTEM_ADMIN)
    sideNavValues = [
      {
        label: 'Users',
        href: `${currentPath}/entry/users`,
      },
      {

        label: 'Vehicles',
        href: `${currentPath}/entry/vehicles`,
      },
      {
        label: 'STS',
        href: `${currentPath}/entry/sts`,
      },
      {
        label: 'Landfill Sites',
        href: `${currentPath}/entry/landfill-sites`,
      },
    ];


  return sideNavValues
}