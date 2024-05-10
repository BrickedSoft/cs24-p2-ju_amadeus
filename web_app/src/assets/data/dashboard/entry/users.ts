import {
  Column,
  FormInfo,
  FormInfoExtended,
  InputField,
  Query,
} from "@allTypes";
import { routes } from "@assets/data/routes";

export const assignLandfillInfo: FormInfo = {
  description:
    "manage the Landfill sites management access for the current user.",
  title: "Landfill manager",
};

export const assignStsInfo: FormInfo = {
  description: "manage the STS management access for the current user.",
  title: "STS manager",
};

export const newUserInfo: FormInfoExtended = {
  actionLabel: "Submit",
  description: "Enter user informations",
  title: "User details",
  formValues: [
    {
      name: "name",
      label: "Name",
    },
    { name: "email", label: "Email" },
    { name: "password", label: "Password" },
  ],
};

export const updateUserInfo: FormInfoExtended = {
  actionLabel: "Update",
  description: "Update user informations",
  title: "User details",
  formValues: [
    {
      name: "name",
      label: "Name",
    },
    { name: "email", label: "Email" },
  ],
};

export const type = "user";

export const columnData: Column[] = [
  { accessorKey: "name", name: "Name" },
  { accessorKey: "email", name: "Email" },
  { accessorKey: "role", name: "Role" },
];

export const columnDropdownItems = [
  {
    title: "Update",
    href: `${routes.users}/$id$`,
  },
  {
    title: "Delete",
    href: `${routes.users}/$id$/delete`,
  },
  {
    title: "Management",
    href: `${routes.users}/$id$/assign`,
  },
];

export const pathToCreate = {
  title: "Create user",
  href: routes.usersNew,
};

export const query: Query = {
  title: "Search by email",
  key: "email",
};
