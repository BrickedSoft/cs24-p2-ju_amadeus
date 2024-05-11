import { Column, InputField, Query } from "@allTypes";
import { routes } from "../../routes";

export const actionLabel = "Create";
export const description = "Fill the fields with the collection plan information";
export const title = "Collection Plan details";

export const collectionPlanInfo: InputField[] = [
 
  { id: "startTime", title: "Start Time", type: "datetime-local" },
  { id: "areaOfCollection", title: "Area of collection" },
  { id: "durationForCollection", title: "Duration for collection", type: 'number' },
  { id: "numberOfLabors", title: "Number of labors", type: "number" },
  { id: "numberOfVans", title: "Number of vans", type: "number" },
  { id: "expectedWasteWeight", title: "Expected waste weight", type: "number" },
];

export const type = "collectionplan";

export const columnData: Column[] = [
  {
    accessorKey: "id",
    name: "Id",
  },
  { accessorKey: "durationForCollection", name: "Duration for collection" },
  { accessorKey: "areaOfCollection", name: "Aread of collection" },
  { accessorKey: "durationForCollection", name: "Duration for collection" },
  { accessorKey: "numberOfLabors", name: "Number of labors" },
  { accessorKey: "numberOfVans", name: "Number of vans" },
  { accessorKey: "expectedWasteWeight", name: "Expected waste weight" },
];

export const pathToCreate = {
  title: "Create Collection Plan",
  href: routes.collectionPlanNew,
};

export const query: Query = {
  title: "Search by id",
  key: "id",
};

export const errors = {
  empty: "This is required",
  wrong: "Invalid value",
  default: "Something went wrong",
};
