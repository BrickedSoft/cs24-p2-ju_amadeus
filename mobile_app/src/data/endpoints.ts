export const hostname =__DEV__ ? "http://192.168.137.246:3000" : "https://cs24-p2-ju-amadeus.onrender.com";
export const api = `${hostname}/api`;
export const userDataEndpoint = `${api}/users`;
export const login = "/auth/login";
export const resetPassword = "/auth/reset-password";
export const initiateReset = `${resetPassword}/initiate`;
export const confirmReset = `${resetPassword}/confirm`;
export const changePassword = "/auth/change-password";