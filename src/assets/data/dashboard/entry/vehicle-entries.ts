import { Column, FormInfoExtended } from "@allTypes";
import { routes } from "@assets/data/routes";

export const newVehicleEntryInfo: FormInfoExtended = {
  actionLabel: "Add",
  description: "Enter vehicle entry informations",
  title: "Vehicle entry details",
  formValues: [
    { name: "wasteVolume", label: "Waste volume (tons)", type: "number" },
    { name: "arrivalTime", label: "Arrival Time", type: "datetime-local" },
    { name: "departureTime", label: "Departure Time", type: "datetime-local" },
  ],
};

export const type = "entry";

export const columnData: Column[] = [
  { accessorKey: "vehicleNumber", name: "Vehicle" },
  { accessorKey: "wasteVolume", name: "Waste Volume" },
  { accessorKey: "landfillName", name: "Landfill" },
  { accessorKey: "arrivalTime", name: "Arrival" },
  { accessorKey: "departureTime", name: "Departure" },
];

export const columnDropdownItems = [
  {
    title: "Delete",
    href: `${routes.vehicleEntries}/$id$/delete`,
  },
];

export const pathToCreate = {
  title: "Add entry",
  href: routes.vehicleEntriesNew,
};
