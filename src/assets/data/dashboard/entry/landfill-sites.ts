import { Column, FormInfoExtended, Query } from "@allTypes";
import { routes } from "@assets/data/routes";

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

export const title = {
  new: "Create new Landfill Site",
  update: "Update Landfill Site information",
};

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

export const mapFieldTitle = "Pick your Landfill Site location";

export const errors = {
  empty: "This is required",
  wrong: "Invalid Email or Password",
  default: "Something went wrong",
};

export const buttons = {
  submit: "Submit",
  reset: "Reset",
};

export const type = "landfill site";

export const columnData: Column[] = [
  { accessorKey: "name", name: "Name" },
  { accessorKey: "longitude", name: "Longitude" },
  { accessorKey: "latitude", name: "Latitude" },
];

export const columnDropdownItems = [
  {
    title: "Update",
    href: `${routes.landfillSites}/$id$`,
  },
  {
    title: "Delete",
    href: `${routes.landfillSites}/$id$/delete`,
  },
];

export const pathToCreate = {
  title: "Add landfill",
  href: routes.landfillSitesNew,
};

export const query: Query = {
  title: "Search by name",
  key: "name",
};
