import { routes } from "../../routes";

export const name = "Reset Password";
export const title = "Forgot Password?";
export const description =
  "Enter the email address along with the backup code to reset your password.";

export const fields = [
  {
    id: "email",
    title: "Email Address",
    placeholder: "you@mail.com",
    type: "email",
    errors: {
      wrong: "Invalid Email",
      empty: "This is required",
    },
  },
  {
    id: "resetToken",
    title: "Enter Code",
    placeholder: "Enter code",
    type: "text",
    errors: {
      wrong: "Invalid Token",
      empty: "This is required",
    },
  },
];

export const errors = {
  empty: "This is required",
  wrong: "Invalid Email or Token",
  default: "Something went wrong",
};
export const button = { title: "Next", href: routes.confirm };
