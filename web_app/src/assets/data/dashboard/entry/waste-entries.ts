import { Column, FormInfoExtended, Query } from "@allTypes";
import { routes } from "@assets/data/routes";

export const newWasteEntryInfo: FormInfoExtended = {
  actionLabel: "Add",
  description: "Enter waste collection information",
  title: "Waste collection details",
  formValues: [
    { name: "wasteVolume", label: " Amount of Waste (tons)", type: "number" },
    {
      name: "collectionDate",
      label: "Date of collection",
      type: "datetime-local",
    },
  ],
};

export const wasteType = ["Domestic", "Plastic", "Construction waste"];

export const type = "waste-entries";

export const columnData: Column[] = [
  { accessorKey: "wasteVolume", name: "Waste Volume" },
  { accessorKey: "collectionDate", name: "Collection Date" },
  { accessorKey: "vehicleId", name: "Vehicle" },
  { accessorKey: "wasteType", name: "Type of Waste" },
  { accessorKey: "contractorId", name: "Contractor Name" },
  { accessorKey: "stsId", name: "STS Name" },
];

export const query: Query = {
  title: "Search by STS",
  key: "id",
};

export const errors = {
  empty: "This is required",
  wrong: "Invalid Email or Password",
  default: "Something went wrong",
};

export const pathToCreate = {
  title: "Add entry",
  href: routes.wasteEntriesNew,
};
