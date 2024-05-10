import { Card } from "@allTypes";
import { routes } from "../../routes";

export const regenerateTokenInfo: Card = {
  actionLabel: "Regenerate",
  title: "Reset token",
  description: "This is your token to recover your account",
  instruction: "Make sure to write down this code",
  errors: {
    400: "Failed to generate the token",
    500: "Server error",
  },
};

export const changePassword = {
  title: "Change Password",
  description: "You need to verify first to change the password.",
  instruction: "Click the button to begin",
  actionLabel: "Initiate",
  href: routes.initiateChange,
};
