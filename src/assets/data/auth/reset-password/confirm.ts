import { routes } from "../../routes";

export const name = "reset-password";
export const title = "Reset Password";
export const description = "Enter your old and new password. The new password cannot be the same as the old password.";

export const fields = [
  {
    id: "password",
    title: "Password",
    placeholder: "Enter your old password",
    type: "password",
    errors: {
      empty: "This is required",
      "no-match": "",
      wrong: "Wrong old password",
    },
  },
  {
    id: "confirm-password",
    title: "Confirm Password",
    placeholder: "Enter your new password",
    type: "password",
    errors: {
      empty: "This is required",
      "no-match": "Passwords do not match",
      wrong: "New password cannot be same as old password",
    },
  },
];

export const errors = {
  empty: "This is required",
  default: "Something went wrong",
};

export const button = { title: "Reset Password", href: routes.login };
