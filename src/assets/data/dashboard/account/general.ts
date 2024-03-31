export interface CardType {
  title: string;
  description: string;
  instruction: string;
  actionLabel: string;
  button?: string;
}

export const cardData: CardType[] = [
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
