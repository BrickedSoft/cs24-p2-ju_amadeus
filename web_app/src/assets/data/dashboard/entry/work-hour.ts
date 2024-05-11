import { Column, FormInfoExtended, Query } from "@allTypes";
import { routes } from "@assets/data/routes";

export const newWasteEntryInfo: FormInfoExtended = {
  actionLabel: "Add",
  description: "Enter individual work force information",
  title: "Work force details",
  formValues: [
    {
      name: "startTime",
      label: "Start of work",
      type: "datetime-local",
    },
    {
      name: "endTime",
      label: "End of work",
      type: "datetime-local",
    },
    {
      name: "date",
      label: "Date of work",
      type: "date",
    },
  ],
};

export const type = "waste-entries";

export const columnData: Column[] = [
  { accessorKey: "date", name: "Date of Work" },
  { accessorKey: "overtime", name: "Overtime work" },
];

export const query: Query = {
  title: "Search by date",
  key: "date",
};

export const errors = {
  empty: "This is required",
  wrong: "Invalid Email or Password",
  default: "Something went wrong",
};

export const pathToCreate = {
  title: "Add entry",
  href: routes.workingHourEntriesNew,
};
