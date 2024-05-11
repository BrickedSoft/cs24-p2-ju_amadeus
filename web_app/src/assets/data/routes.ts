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
  wasteEntries: "waste-entries",
  routeOptimization: "route-optimization",
  fleetOptimization: "fleet-optimization",
  generateBill: "generate-bill",
  new: "new",
  contractor: "contractor",
  workForce: "work-force",
  collectionPlan: "collection-plan"
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
  wasteEntries: "Waste Collection",
  routeOptimization: "Route optimization",
  fleetOptimization: "Fleet optimization",
  generateBill: "Generate Bill",
  contractor: "Contractor",
  workForce: "Work Force",
  collectionPlan: "Collection Plan",

};

/* ---------------------------------- Paths --------------------------------- */

const authPath = `${path.home}${path.auth}`;
const resetPasswordPath = `${authPath}/${path.resetPassword}`;
const changePasswordPath = `${authPath}/${path.changePassword}`;
const dashboardPath = `${path.home}${path.dashboard}`;
const accountPath = `${dashboardPath}/${path.account}`;
const entryPath = `${dashboardPath}/${path.entry}`;

/* ----------------------------------- End ---------------------------------- */

export const routes = {
  home: path.home,
  auth: authPath,
  login: `${authPath}/${path.login}`,
  resetPassword: resetPasswordPath,
  initiateReset: `${resetPasswordPath}/${path.initiate}`,
  confirmReset: `${resetPasswordPath}/${path.confirm}`,
  initiateChange: `${changePasswordPath}/${path.initiate}`,
  confirmChange: `${changePasswordPath}/${path.confirm}`,
  verify: `${resetPasswordPath}/${path.verify}`,
  logout: `${authPath}/${path.logout}`,
  profile: `${path.home}${path.profile}`,
  dashboard: dashboardPath,
  overview: dashboardPath,
  entry: entryPath,
  account: accountPath,
  general: `${accountPath}/${path.general}`,
  passwordLogins: `${accountPath}/${path.passwordLogins}`,
  users: `${entryPath}/${path.users}`,
  usersNew: `${entryPath}/${path.users}/${path.new}`,
  vehicles: `${entryPath}/${path.vehicles}`,
  vehiclesNew: `${entryPath}/${path.vehicles}/${path.new}`,
  sts: `${entryPath}/${path.sts}`,
  stsNew: `${entryPath}/${path.sts}/${path.new}`,
  landfillSites: `${entryPath}/${path.landfillSites}`,
  landfillSitesNew: `${entryPath}/${path.landfillSites}/${path.new}`,
  vehicleEntries: `${entryPath}/${path.vehicleEntries}`,
  wasteEntries: `${entryPath}/${path.wasteEntries}`,
  wasteEntriesNew: `${entryPath}/${path.wasteEntries}/${path.new}`,
  vehicleEntriesNew: `${entryPath}/${path.vehicleEntries}/${path.new}`,
  routeOptimization: `${entryPath}/${path.routeOptimization}`,
  fleetOptimization: `${entryPath}/${path.fleetOptimization}`,
  generateBill: `${entryPath}/${path.generateBill}`,
  contractor: `${entryPath}/${path.contractor}`,
  contractorNew: `${entryPath}/${path.contractor}/${path.new}`,
  workForce: `${entryPath}/${path.workForce}`,
  workForceNew: `${entryPath}/${path.workForce}/${path.new}`,
  collectionPlan: `${entryPath}/${path.collectionPlan}`,
  collectionPlanNew: `${entryPath}/${path.collectionPlan}/${path.new}`,

};

export const links = {
  home: { title: pathTitles.home, href: routes.home },
  auth: { title: pathTitles.auth, href: routes.auth },
  login: { title: pathTitles.login, href: routes.login },
  resetPassword: {
    title: pathTitles.resetPassword,
    href: routes.resetPassword,
  },
  initiate: { title: pathTitles.initiate, href: routes.initiateReset },
  confirm: { title: pathTitles.confirm, href: routes.confirmReset },
  verify: { title: pathTitles.verify, href: routes.verify },
  logout: { title: pathTitles.logout, href: routes.logout },
  initiateChange: {
    title: pathTitles.changePassword,
    href: routes.initiateChange,
  },
  confirmChange: {
    title: pathTitles.changePassword,
    href: routes.confirmChange,
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
  wasteEntries: {
    title: pathTitles.wasteEntries,
    href: routes.wasteEntries,
  },
  wasteEntriesNew: {
    title: pathTitles.wasteEntries,
    href: routes.wasteEntriesNew,
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
  contractor: { title: pathTitles.contractor, href: routes.contractor },
  workForce: { title: pathTitles.workForce, href: routes.workForce },
  workForceNew: { title: pathTitles.workForce, href: routes.workForceNew },
  collectionPlan: {title: pathTitles.collectionPlan, href: routes.collectionPlan}
};
