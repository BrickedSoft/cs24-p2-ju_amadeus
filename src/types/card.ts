export type Card = {
  id: string;
  title: string;
  description: string;
  instruction: string;
  actionLabel: string;
  type: string;
  button?: string;
  errors?: { [key: string]: string };
};
