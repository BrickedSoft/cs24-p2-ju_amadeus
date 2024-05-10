import { Column, InputField, Query } from "@allTypes";
import { routes } from "../../routes";

export const actionLabel = "Create";
export const description = "Fill the fields with the work force's information";
export const title = "Work Force details";

export const workforceInfo: InputField[] = [
  {
    id: "name",
    title: "Name",
  },
  { id: "nid", title: "NID number" },
  { id: "designation", title: "Job Title" },
  { id: "salary", title: "Payment rate per hour", type: "float" },
  { id: "contact", title: "Mobile number" },
  { id: "dateOfBirth", title: "Date of Birth", type: "date" },
  { id: "joiningDate", title: "Date of hire", type: "date" },
];

export const type = "workforce";

export const columnData: Column[] = [
  {
    accessorKey: "name",
    name: "Name",
  },
  { accessorKey: "nid", name: "NID number" },
  { accessorKey: "designation", name: "Job Title" },
  { accessorKey: "salary", name: "Payment rate per hour" },
  { accessorKey: "contact", name: "Mobile number" },
  { accessorKey: "dateOfBirth", name: "Date of Birth" },
  { accessorKey: "joiningDate", name: "Date of hire" },
];

export const columnDropdownItems = [
  {
    title: "Delete",
    href: `${routes.workForce}/$id$/delete`,
  },
];

export const pathToCreate = {
  title: "Create Workforce",
  href: routes.workForceNew,
};

export const query: Query = {
  title: "Search by name",
  key: "name",
};

export const errors = {
  empty: "This is required",
  wrong: "Invalid value",
  default: "Something went wrong",
};
