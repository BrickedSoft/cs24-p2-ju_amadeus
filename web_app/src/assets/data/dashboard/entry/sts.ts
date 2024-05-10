import { Column, FormInfoExtended, InputField, Query } from "@allTypes";
import { routes } from "@assets/data/routes";

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

export const title = {
  new: "Create new STS",
  update: "Update STS information",
};
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

export const type = "STS";

export const columnData: Column[] = [
  { accessorKey: "name", name: "Name" },
  { accessorKey: "wardNumber", name: "Ward Number" },
  { accessorKey: "capacity", name: "Capacity" },
  { accessorKey: "longitude", name: "Longitude" },
  { accessorKey: "latitude", name: "Latitude" },
];

export const columnDropdownItems = [
  {
    title: "Update",
    href: `${routes.sts}/$id$`,
  },
  {
    title: "Delete",
    href: `${routes.sts}/$id$/delete`,
  },
];

export const pathToCreate = {
  title: "Add STS",
  href: routes.stsNew,
};

export const query: Query = {
  title: "Search by name",
  key: "name",
};
