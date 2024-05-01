import { Card } from "@allTypes";

export const cardData: Card[] = [
  {
    title: "Role",
    description: "This is your assigned role by the System Admin",
    instruction: "Your permissions are adjusted based on your role",
    actionLabel: "role",
  },
  {
    title: "Reset token",
    description: "This is your token to recover your account",
    instruction: "Make sure to write down this code",
    actionLabel: "resetToken",
  },
];

export const resetTokenGenerate = {
  title: "Reset token",
  description: "Generate the reset token to recover your account later",
  instruction: "Make sure to write down this code",
  actionLabel: "resetToken",
  button: "Generate",
};

export const emailInfo: Card = {
  title: "Email",
  description:
    "Please enter the email address you want to use to log in with EcoSync.",
  instruction: "We will email you to verify the change.",
  actionLabel: "Save",
};

export const nameInfo: Card = {
  title: "Display name",
  description:
    "Please enter your full name, or a display name you are comfortable with.",
  instruction: "Please use 32 characters at maximum.",
  actionLabel: "Save",
};
