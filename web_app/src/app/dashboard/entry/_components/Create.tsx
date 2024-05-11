"use client";

import { Suspense, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import _, { get } from "lodash";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z, ZodRawShape } from "zod";

import { InputField } from "@allTypes";
import { Form } from "@components/ui/form";
import { Skeleton } from "@components/ui/skeleton";
import { center } from "@constants/map";
import ecoSync from "@ecoSync";
import Fields from "./Fields";

type Props = {
  endpoint: string;
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
};

const Create: React.FC<Props> = ({
  endpoint,
  fields,
  title,
  description,
  errors: defaultErrors,
  buttons,
  mapFieldTitle,
}) => {
  const router = useRouter();

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
    defaultValues: {
      latitude: center.lat,
      longitude: center.lng,
    },
  });

  const {
    handleSubmit,
    setError,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    ecoSync
      .post(endpoint, control._formValues)
      .then(() => {
        router.back();
      })
      .catch((error) => {
        fields.map((item) =>
          setError(item.id, {
            type: "manual",
            message: item?.errors?.wrong,
          })
        );
      });
  };

  return (
    <Suspense fallback={<Skeleton className="w-full h-28" />}>
      <Form {...form}>
        <form
          className="flex flex-col gap-3 bg-background p-8 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8"
          onSubmit={handleSubmit(onSubmit)}
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
            isLoading={isSubmitting}
          />
        </form>
      </Form>
    </Suspense>
  );
};

export default Create;
