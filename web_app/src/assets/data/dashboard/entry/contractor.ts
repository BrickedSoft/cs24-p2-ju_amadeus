import { FormValues, InputField } from "@allTypes";

// actionLabel: "Update",
//   description: "Update user informations",
//   title: "Update user details",

export const contractorInfo: InputField[] = [
  {
    id: "name",
    title: "Name of the company",
  },
  { id: "contractId", title: "Contract ID" },
  { id: "tin", title: "TIN number" },
  { id: "contact", title: "Contact number" },
  { id: "size", title: "Workforce size" },
  { id: "salary", title: "Payment per tonnage of waste" },
  { id: "wasteVolume", title: "The required amount of waste per day" },
  { id: "termination", title: "Termination Date" },
  { id: "wardNumber", title: "Ward Number" },
];

export const errors = {
  empty: "This is required",
  wrong: "Invalid value",
  default: "Something went wrong",
};
