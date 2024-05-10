import { Column, InputField, Query } from "@allTypes";
import { routes } from "../../routes";

export const actionLabel = "Create";
export const description = "Fill the fields with the contractor's information";
export const title = "Contractor details";

export const contractorInfo: InputField[] = [
  {
    id: "name",
    title: "Name of the company",
  },
  { id: "contractId", title: "Contract ID" },
  { id: "tin", title: "TIN number" },
  { id: "contact", title: "Contact number" },
  { id: "size", title: "Workforce size", type: "number" },
  { id: "salary", title: "Payment per tonnage of waste", type: "number" },
  {
    id: "wasteVolume",
    title: "The required amount of waste per day",
    type: "number",
  },
  { id: "termination", title: "Termination Date", type: "date" },
  { id: "wardNumber", title: "Ward Number" },
];

export const type = "contractor";

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
    href: `${routes.contractor}/$id$/delete`,
  },
];

export const pathToCreate = {
  title: "Create contractor",
  href: routes.contractorNew,
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
