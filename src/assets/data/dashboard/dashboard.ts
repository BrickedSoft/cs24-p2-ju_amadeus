export interface NavLink {
  label: string;
  href: string;
}
const currentPath = '/dashboard';

export const navLinks: NavLink[] = [
  { label: 'Overview', href: `${currentPath}/overview` },
  { label: 'Entry', href: `${currentPath}/entry` },
  { label: 'Account', href: `${currentPath}/account` },
];

export const sideNavValue = ['General', 'Password and logins'];
