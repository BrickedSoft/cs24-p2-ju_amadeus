import { Column, Query } from "@allTypes";

export const type = "billing";

export const columnData: Column[] = [
  { accessorKey: "collectionDate", name: "Date" },
  { accessorKey: "wasteVolume", name: "Total Waste Volume" },
  { accessorKey: "pay", name: "Basic Pay" },
  { accessorKey: "shortage", name: "Deficit" },
  { accessorKey: "totalFine", name: "Total fine" },
  { accessorKey: "totalBill", name: "Total Bill" },
];

export const buttons = {
  close: "Close",
  download: "Download slip",
};

export const query: Query = {
  title: "Search by Date",
  key: "collectionDate",
};

export const title = "Preview generated bill";

export const error = {
  notSelected: "No vehicle entry selected.",
};

export const headings = {
  contractor: "Contractor Information",
  waste: "Waste Information",
};

export const instruction = "Select a waste entry to generate a bill.";
