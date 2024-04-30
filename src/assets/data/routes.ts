export const path = {
  home: "/",
  auth: "auth",
  login: "login",
  resetPassword: "reset-password",
  initiate: "initiate",
  confirm: "confirm",
  verify: "verify",
  logout: "logout",
  changePassword: "change-password",
  profile: "profile",
  dashboard: "dashboard",
  overview: "overview",
  entry: "entry",
  account: "account",
  general: "general",
  passwordLogins: "password-logins",
  users: "users",
  vehicles: "vehicles",
  sts: "sts",
  landfillSites: "landfill-sites",
  vehicleEntries: "vehicle-entries",
  routeOptimization: "route-optimization",
  fleetOptimization: "fleet-optimization",
  generateBill: "generate-bill",
};

export const pathTitles = {
  home: "Home",
  auth: "Auth",
  login: "Login",
  resetPassword: "Reset Password",
  initiate: "Initiate",
  confirm: "Confirm",
  verify: "Verify",
  logout: "Logout",
  changePassword: "Change Password",
  profile: "Profile",
  dashboard: "Dashboard",
  overview: "Overview",
  entry: "Entry",
  account: "Account",
  general: "General",
  passwordLogins: "Password and logins",
  users: "Users",
  vehicles: "Vehicles",
  sts: "STS",
  landfillSites: "Landfill Sites",
  vehicleEntries: "Vehicle Entries",
  routeOptimization: "Route optimization",
  fleetOptimization: "Fleet optimization",
  generateBill: "Generate Bill",
};

/* ---------------------------------- Paths --------------------------------- */

const authPath = `${path.home}${path.auth}`;
const resetPasswordPath = `${authPath}/${path.resetPassword}`;
const dashboardPath = `${path.home}${path.dashboard}`;
const accountPath = `${dashboardPath}/${path.account}`;
const entryPath = `${dashboardPath}/${path.entry}`;

/* ----------------------------------- End ---------------------------------- */

export const routes = {
  home: path.home,
  auth: authPath,
  login: `${authPath}/${path.login}`,
  resetPassword: resetPasswordPath,
  initiate: `${resetPasswordPath}/${path.initiate}`,
  confirm: `${resetPasswordPath}/${path.confirm}`,
  verify: `${resetPasswordPath}/${path.verify}`,
  logout: `${authPath}/${path.logout}`,
  changePassword: `${authPath}/${path.changePassword}`,
  profile: `${path.home}${path.profile}`,
  dashboard: dashboardPath,
  overview: dashboardPath,
  entry: entryPath,
  account: accountPath,
  general: accountPath,
  passwordLogins: `${accountPath}/${path.passwordLogins}`,
  users: `${entryPath}/${path.users}`,
  vehicles: `${entryPath}/${path.vehicles}`,
  sts: `${entryPath}/${path.sts}`,
  landfillSites: `${entryPath}/${path.landfillSites}`,
  vehicleEntries: `${entryPath}/${path.vehicleEntries}`,
  routeOptimization: `${entryPath}/${path.routeOptimization}`,
  fleetOptimization: `${entryPath}/${path.fleetOptimization}`,
  generateBill: `${entryPath}/${path.generateBill}`,
};

export const links = {
  home: { title: pathTitles.home, href: routes.home },
  auth: { title: pathTitles.auth, href: routes.auth },
  login: { title: pathTitles.login, href: routes.login },
  resetPassword: {
    title: pathTitles.resetPassword,
    href: routes.resetPassword,
  },
  initiate: { title: pathTitles.initiate, href: routes.initiate },
  confirm: { title: pathTitles.confirm, href: routes.confirm },
  verify: { title: pathTitles.verify, href: routes.verify },
  logout: { title: pathTitles.logout, href: routes.logout },
  changePassword: {
    title: pathTitles.changePassword,
    href: routes.changePassword,
  },
  profile: { title: pathTitles.profile, href: routes.profile },
  dashboard: { title: pathTitles.dashboard, href: routes.dashboard },
  overview: { title: pathTitles.overview, href: routes.overview },
  entry: { title: pathTitles.entry, href: routes.entry },
  account: { title: pathTitles.account, href: routes.account },
  general: { title: pathTitles.general, href: routes.general },
  passwordLogins: {
    title: pathTitles.passwordLogins,
    href: routes.passwordLogins,
  },
  users: { title: pathTitles.users, href: routes.users },
  vehicles: { title: pathTitles.vehicles, href: routes.vehicles },
  sts: { title: pathTitles.sts, href: routes.sts },
  landfillSites: {
    title: pathTitles.landfillSites,
    href: routes.landfillSites,
  },
  vehicleEntries: {
    title: pathTitles.vehicleEntries,
    href: routes.vehicleEntries,
  },
  routeOptimization: {
    title: pathTitles.routeOptimization,
    href: routes.routeOptimization,
  },
  fleetOptimization: {
    title: pathTitles.fleetOptimization,
    href: routes.fleetOptimization,
  },
  generateBill: {
    title: pathTitles.generateBill,
    href: routes.generateBill,
  },
};
