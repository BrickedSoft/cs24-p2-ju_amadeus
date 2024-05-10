import { FormValues, InputField } from "@allTypes";

export const fields: InputField[] = [
  {
    id: "latitude",
    title: "Latitude",
    placeholder: "Latitude",
    type: "number",
    errors: {
      empty: "This is required",
      wrong: "Pick a valid latitude",
    },
  },
  {
    id: "longitude",
    title: "Longitude",
    placeholder: "Longitude",
    type: "number",
    errors: {
      empty: "This is required",
      wrong: "Pick a valid longitude",
    },
  },
];
