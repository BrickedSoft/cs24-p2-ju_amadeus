import { FormInfoExtended } from "@allTypes";

export const landfillSiteInfo: FormInfoExtended = {
  actionLabel: "Submit",
  description: "Enter landfil site informations",
  title: "Landfill site details",
  formValues: [
    {
      name: "name",
      label: "Name",
    },
    { name: "longitude", label: "Longitude" },
    { name: "latitude", label: "Latitude" },
  ],
};

export const newLandfillSiteInfo: FormInfoExtended = {
  actionLabel: "Submit",
  description: "Enter landfill site informations",
  title: "Landfill site details",
  formValues: [
    {
      name: "name",
      label: "Name",
    },

    { name: "longitude", label: "Longitude" },
    { name: "latitude", label: "Latitude" },
  ],
};

import { InputField } from "@allTypes";

export const title = "Create new Landfill Site";
export const description = "Enter landfill site's information";

export const fields: InputField[] = [
  {
    id: "name",
    title: "Landfill Site Name",
    placeholder: "Name",
    type: "text",
    errors: {
      empty: "This is required",
      wrong: "Pick a valid name",
    },
  },
];

export const mapFieldTitle='Pick your Landfill Site location'

export const errors = {
  empty: "This is required",
  wrong: "Invalid Email or Password",
  default: "Something went wrong",
};

export const buttons = {
  submit: "Submit",
  reset: "Reset",
};
