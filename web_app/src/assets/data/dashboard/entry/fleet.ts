import { Column, Query } from "@allTypes";
import { routes } from "@assets/data/routes";

export const title = "Fleet Information";

export const type = "fleet";

export const columnData: Column[] = [
  { accessorKey: "number", name: "Number" },
  { accessorKey: "type", name: "Type" },
  { accessorKey: "capacity", name: "Capacity" },
  { accessorKey: "fuelCostLoaded", name: "Fuel Loaded" },
  { accessorKey: "fuelCostUnloaded", name: "Fuel Unloaded" },
  { accessorKey: "tripCount", name: "Trip Count" },
  { accessorKey: "totalCost", name: "Total Cost" },
];

export const query: Query = {
  title: "Search by number",
  key: "number",
};
