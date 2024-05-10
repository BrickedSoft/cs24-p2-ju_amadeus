import { FormValues } from "@allTypes";

export const contractorInfo: FormValues[] = [
  {
    name: "company",
    label: "Name of the company",
  },
  { name: "contractId", label: "Contract ID" },
  { name: "contact", label: "Contact number" },
  { name: "size", label: "Workforce size" },
  { name: "payment", label: "Payment per tonnage of waste" },
  { name: "waste", label: "The required amount of waste per day" },
  { name: "duration", label: "Contract duration" },
  { name: "area", label: "Area of collection" },
];
