import { routes } from "../../routes";

export const name = "Verify";
export const title = "Verify, It’s you!";
export const description =
  "If this email address exist, instructions to reset your password will be sent to you. Please check your email.";

export const fields = [
  {
    id: "text",
    title: "Enter Code",
    placeholder: "",
    type: "text",
    errors: {
      empty: "This is required",
    },
  },
];

export const errors = {
  empty: "This is required",
  default: "Something went wrong",
};
export const button = { title: "Next", href: routes.confirm };
