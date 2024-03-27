import { routes } from "../routes";

export const name = "change-password";
export const title = "Change Password";

export const fields = [
  {
    id: "password",
    title: "Password",
    placeholder: "Enter your password",
    type: "password",
    errors: {
      empty: "This is required",
    },
  },
  {
    id: "confirm-password",
    title: "Confirm Password",
    placeholder: "Enter your password",
    type: "password",
    errors: {
      empty: "This is required",
      "no-match": "Passwords do not match",
    },
  },
];

export const errors = {
  empty: "This is required",
  default: "Something went wrong",
};

export const button = { title: "Change Password", href: routes.login };
