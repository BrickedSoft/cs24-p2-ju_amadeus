import { Column, Query } from "@allTypes";

export const type = "billing";

export const columnData: Column[] = [
  { accessorKey: "vehicleNumber", name: "Vehicle" },
  { accessorKey: "wasteVolume", name: "Waste Volume" },
  { accessorKey: "landfillName", name: "Landfill" },
  { accessorKey: "arrivalTime", name: "Arrival" },
];

export const buttons = {
  close: "Close",
  download: "Download slip",
};

export const query: Query = {
  title: "Search by vehicle number",
  key: "vehicleNumber",
};

export const title = "Preview generated bill";

export const error = {
  noRoute:
    "No route information available to the Landfill from the STS of the selected vehicle.",
  notSelected: "No vehicle entry selected.",
};

export const headings = {
  vehicle: "Vehicle Information",
  routes: "Route Information",
};
