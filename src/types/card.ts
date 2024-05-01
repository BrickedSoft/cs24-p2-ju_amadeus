export type Card = {
  title: string;
  description: string;
  instruction: string;
  actionLabel: string;
  button?: string;
  errors?: { [key: string]: string };
};
