import { FormInfoExtended } from "@allTypes";

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
