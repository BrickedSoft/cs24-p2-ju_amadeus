import { routes } from "../../routes";

export const name = "Reset Password";
export const title = "Forgot Password?";
export const description =
  "Enter the email address you used to create account and we’ll send you instructions to reset your password.";

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
];

export const errors = {
  empty: "This is required",
  default: "Something went wrong",
};
export const button = { title: "Next", href: routes.verify };
