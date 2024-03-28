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

export const sideNavValue: NavLink[] = [{
  label: 'General',
  href: `${currentPath}/account`
},
{
  label: 'Password and logins',
  href: `${currentPath}/account/password-logins`
}];
