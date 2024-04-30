export type FormValues = {
  name: string;
  label: string;
  type?: string;
};

export type FormInfo = {
  title: string;
  description: string;
};

export type FormInfoExtended = FormInfo & {
  actionLabel: string;
  formValues: FormValues[];
};
