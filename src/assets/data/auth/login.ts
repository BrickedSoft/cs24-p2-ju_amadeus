import { routes } from "../routes";

export const name = "Login";
export const title = "Welcome Back";

export const fields = [
  {
    id: "email",
    title: "Email Address",
    placeholder: "you@mail.com",
    type: "email",
    errors: {
      empty: "This is required",
    },
  },
  {
    id: "password",
    title: "Password",
    placeholder: "Enter your password",
    type: "password",
    errors: {
      empty: "This is required",
    },
  },
];

export const forgot = "Forgot Password?";
export const errors = {
  empty: "This is required",
  default: "Something went wrong",
};
export const button = {
  login: { title: "Login", href: routes.login },
  reset: { title: "Reset", href: routes.initiate },
};
