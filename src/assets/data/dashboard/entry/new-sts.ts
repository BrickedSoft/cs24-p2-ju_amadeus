import { routes } from "../../routes";

export const title = "Create new STS";
export const description = "Enter STS informations";

export const fields = [
  {
    id: "name",
    title: "STS name",
    placeholder: "Name",
    type: "text",
    errors: {
      empty: "This is required",
      wrong: "Pick a valid name",
    },
  },
  {
    id: "wardNumber",
    title: "Ward number",
    placeholder: "Enter ward number",
    type: "text",
    errors: {
      empty: "This is required",
      wrong: "Pick a valid ward number",
    },
  },

  {
    id: "capacity",
    title: "Total capacity",
    placeholder: "capacity of your ward",
    type: "text",
    errors: {
      empty: "This is required",
      wrong: "Type a valid capacity",
    },
  },
];

export const errors = {
  empty: "This is required",
  wrong: "Invalid Email or Password",
  default: "Something went wrong",
};
export const submitButton = "Submit"
