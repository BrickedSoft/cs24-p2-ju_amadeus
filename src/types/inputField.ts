export type InputField = {
  id: string;
  title: string;
  placeholder: string;
  type: string;
  errors: {
    [key: string]: string;
  };
};
