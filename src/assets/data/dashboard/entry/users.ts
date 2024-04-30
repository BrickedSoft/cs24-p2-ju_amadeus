import { FormInfo, FormInfoExtended } from "@allTypes";

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
