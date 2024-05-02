import { FormInfoExtended } from "@allTypes";

export const stsInfo: FormInfoExtended = {
  actionLabel: "Submit",
  description: "Enter STS informations",
  title: "STS details",
  formValues: [
    {
      name: "name",
      label: "Name",
    },
    { name: "wardNumber", label: "Ward Number" },
    { name: "capacity", label: "Capacity" },
    { name: "longitude", label: "Longitude" },
    { name: "latitude", label: "Latitude" },
  ],
};

export const newStsInfo: FormInfoExtended = {
  actionLabel: "Submit",
  description: "Enter STS information",
  title: "STS details",
  formValues: [
    {
      name: "name",
      label: "Name",
    },
    { name: "wardNumber", label: "Ward Number" },
    { name: "capacity", label: "Capacity" },
    { name: "longitude", label: "Longitude" },
    { name: "latitude", label: "Latitude" },
  ],
};

import { InputField } from "@allTypes";

export const title = "Create new STS";
export const description = "Enter STS information";

export const fields: InputField[] = [
  {
    id: "name",
    title: "STS Name",
    placeholder: "Name",
    type: "text",
    errors: {
      empty: "This is required",
      wrong: "Pick a valid name",
    },
  },
  {
    id: "wardNumber",
    title: "Ward Number",
    placeholder: "Enter ward number",
    type: "text",
    errors: {
      empty: "This is required",
      wrong: "Pick a valid ward number",
    },
  },

  {
    id: "capacity",
    title: "Total Capacity",
    placeholder: "capacity of your ward",
    type: "number",
    errors: {
      empty: "This is required",
      wrong: "Type a valid capacity",
    },
  },
];

export const mapFieldTitle = "Pick your STS location";

export const errors = {
  empty: "This is required",
  wrong: "Invalid Email or Password",
  default: "Something went wrong",
};

export const buttons = {
  submit: "Submit",
  reset: "Reset",
};
