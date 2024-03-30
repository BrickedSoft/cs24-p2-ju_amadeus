export interface CardType {
  title: string;
  description: string;
  instruction: string;
  actionLabel: string;
}

export const roleCardData: CardType = {
  title: "Role",
  description: "This is your assigned role by the System Admin",
  instruction: "Your permissions are adjusted based on your role",
  actionLabel: "role",
};

export const resetTokenCardData: CardType = {
  title: "Reset token",
  description: "This is your token to recover your account",
  instruction: "Make sure to write down this code",
  actionLabel: "resetToken",
};

export const cardData: CardType[] = [roleCardData, resetTokenCardData];
