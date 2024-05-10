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
  { id: "dateOfBirth", title: "Date of Birth", type: "date" },
  { id: "nid", title: "NID number" },
  { id: "designation", title: "Job Title" },
  { id: "joiningDate", title: "Date of hire", type: "date" },
  { id: "salary", title: "Payment rate per hour", type: "float" },
  { id: "contact", title: "Mobile number" },
];

export const type = "workforce";

export const columnData: Column[] = [
  { accessorKey: "name", name: "Company Name" },
  { accessorKey: "tin", name: "TIN number" },
  { accessorKey: "size", name: "Workforce size" },
  { accessorKey: "salary", name: "Payment per tonnage of waste" },
  { accessorKey: "wasteVolume", name: "Required amount of waste per day" },
  { accessorKey: "termination", name: "Termination Date" },
  { accessorKey: "wardNumber", name: "Ward Number" },
];

export const columnDropdownItems = [
  {
    title: "Delete",
    href: `${routes.workForce}/$id$/delete`,
  },
];

export const pathToCreate = {
  title: "Create Workforce",
  href: routes.workForce,
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
