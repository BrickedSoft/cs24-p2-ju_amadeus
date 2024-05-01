import { FormInfoExtended } from "@allTypes";

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
