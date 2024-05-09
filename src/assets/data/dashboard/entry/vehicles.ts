import { Column, FormInfoExtended, InputField, Query } from "@allTypes";
import { routes } from "@assets/data/routes";

export const newVehicleInfo: FormInfoExtended = {
  actionLabel: "Add",
  description: "Enter vehicle informations",
  title: "Vehicle details",
  formValues: [
    {
      name: "number",
      label: "Number",
    },
    { name: "type", label: "Type" },
    { name: "capacity", label: "Capacity" },
    { name: "fuelCostUnloaded", label: "Fuel cost per kilometer - Unloaded" },
    { name: "fuelCostLoaded", label: "Fuel cost per kilometer - Fully loaded" },
  ],
};

export const vehicleInfo: FormInfoExtended = {
  actionLabel: "Update",
  description: "Update vehicle informations",
  title: "Vehicle details",
  formValues: [
    {
      name: "number",
      label: "Number",
    },
    { name: "type", label: "Type" },
    { name: "capacity", label: "Capacity" },
    { name: "fuelCostUnloaded", label: "Fuel cost per kilometer - Unloaded" },
    { name: "fuelCostLoaded", label: "Fuel cost per kilometer - Fully loaded" },
  ],
};

export const type = "vehicle";

export const columnData: Column[] = [
  { accessorKey: "number", name: "Number" },
  { accessorKey: "type", name: "Type" },
  { accessorKey: "capacity", name: "Capacity" },
];

export const columnDropdownItems = [
  {
    title: "Update",
    href: `${routes.vehicles}/$id$`,
  },
  {
    title: "Delete",
    href: `${routes.vehicles}/$id$/delete`,
  },
];

export const pathToCreate = {
  title: "Add vehicle",
  href: routes.vehiclesNew,
};

export const query: Query = {
  title: "Search by vehicle number",
  key: "number",
};
