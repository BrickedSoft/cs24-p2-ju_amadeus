"use client";

import { Suspense } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z, ZodRawShape } from "zod";

import { InputField } from "@allTypes";
import { Form } from "@components/ui/form";
import { Skeleton } from "@components/ui/skeleton";
import Fields from "./Fields";

const initialState = {
  message: "",
};

type Props = {
  fields: InputField[];
  title: string;
  description: string;
  errors: {
    [key: string]: string;
  };
  buttons: {
    [key: string]: string;
  };
  mapFieldTitle: string;
  action: (id: string, prevState: any, formData: FormData) => Promise<never>;
  initialValues: {
    [key: string]: string;
  };
};

const Update: React.FC<Props> = ({
  fields,
  title,
  description,
  errors: defaultErrors,
  buttons,
  mapFieldTitle,
  action,
  initialValues,
}) => {
  const { pending } = useFormStatus();
  const formSchema = z.object(
    _.reduce(
      fields.map((item) => ({
        [item.id]: z.string().min(1, {
          message: defaultErrors.empty,
        }),
      })),
      _.extend
    ) as ZodRawShape
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });
  const {
    control,
    setValue,
    formState: { errors },
  } = form;

  const [state, formAction] = useFormState(
    action.bind(null, initialValues.id),
    initialState
  );

  return (
    <Suspense fallback={<Skeleton className="w-full h-28" />}>
      <Form {...form}>
        <form
          className="flex flex-col gap-3 bg-background p-8 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8"
          action={formAction}
        >
          <Fields
            form={form}
            fields={fields}
            title={title}
            description={description}
            errors={errors}
            buttons={buttons}
            mapFieldTitle={mapFieldTitle}
            control={control}
            setValue={setValue}
          />
          <p className="text-sm text-green-600">{state?.message}</p>
        </form>
      </Form>
    </Suspense>
  );
};

export default Update;
