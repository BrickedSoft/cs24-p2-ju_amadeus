"use client";

import { Suspense, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateIcon } from "@radix-ui/react-icons";
import _ from "lodash";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z, ZodRawShape } from "zod";

import CustomInputRenderer from "@components/CustomInputRenderer";
import { Form } from "@components/ui/form";
import { InputField } from "@allTypes";
import { Button } from "@components/ui/button";
import { Skeleton } from "@components/ui/skeleton";
import { center } from "@constants/map";
import ecoSync from "@ecoSync";

const DraggableMarker = dynamic(
  () => import("@components/map/DraggableMarker"),
  {
    loading: () => <Skeleton className="w-full h-[340px]" />,
    ssr: false,
  }
);

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

const NewSts: React.FC<Props> = ({
  endpoint,
  fields,
  title,
  description,
  errors: defaultErrors,
  buttons,
  mapFieldTitle,
}) => {
  const router = useRouter();
  const [position, setPosition] = useState(center);

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
  });
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) =>
    ecoSync
      .post(endpoint, {
        ...data,
        longitude: position.lng,
        latitude: position.lat,
      })
      .then(() => {
        router.back();
      })
      .catch((error) => {
        fields.map((item) =>
          setError(item.id, {
            type: "manual",
            message: item.errors.wrong,
          })
        );
      });

  return (
    <Suspense fallback={<Skeleton className="w-full h-28" />}>
      <Form {...form}>
        <form
          className="flex flex-col gap-3 bg-background p-8 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="heading-tertiary">{title}</p>
          <p className="text-medium">{description}</p>

          <div className="flex flex-col gap-8">
            <CustomInputRenderer
              fields={fields}
              errors={errors}
              form={form}
              width={560 / 4}
            />

            <div className="flex flex-col gap-1">
              <p className="text-small">{mapFieldTitle}</p>
              <DraggableMarker position={position} setPosition={setPosition} />
            </div>
          </div>

          <div className="w-full mt-8 flex justify-between">
            <Button
              variant="outline"
              size="sm"
              rounded={false}
              className="border-destructive hover:border-transparent hover:bg-destructive/20"
              onClick={() => {
                setPosition(center);
              }}
            >
              {buttons.reset}
            </Button>
            <Button type="submit" size="sm" rounded={false}>
              {isSubmitting ? (
                <UpdateIcon className="mx-4 h-4 w-4 animate-spin" />
              ) : (
                buttons.submit
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Suspense>
  );
};

export default NewSts;
