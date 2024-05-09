import process from "process";

export const hostname = process.env.NEXT_PUBLIC_HOSTNAME;
export const api = `${hostname}/api`;
export const userDataEndpoint = `${api}/users`;
export const vehicleDataEndpoint = `${api}/vehicles`;
export const stsDataEndpoint = `${api}/sts`;
export const landfillEndpoint = `${api}/landfill`;
export const vehicleRouteEndpoint = `${api}/vehicle-route`;
export const vehicleEntriesEndpoint = `${api}/vehicle-entries`;
export const login = "/auth/login";
export const resetPassword = "/auth/reset-password";
export const initiateReset = `${resetPassword}/initiate`;
export const confirmReset = `${resetPassword}/confirm`;
export const changePassword = "/auth/change-password";
