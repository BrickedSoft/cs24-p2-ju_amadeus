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
  entry: "entry",
  sts: "sts"
};

export const routes = {
  home: path.home,
  login: `/${path.auth}/${path.login}`,
  initiate: `/${path.auth}/${path.resetPassword}/${path.initiate}`,
  confirm: `/${path.auth}/${path.resetPassword}/${path.confirm}`,
  verify: `/${path.auth}/${path.resetPassword}/${path.verify}`,
  logout: `/${path.auth}/${path.logout}`,
  changePassword: `/${path.auth}/${path.changePassword}`,
  profile: `/${path.profile}`,
  dashboard: `/${path.dashboard}`,
  sts: `/${path.dashboard}/${path.entry}/${path.sts}`,
};
