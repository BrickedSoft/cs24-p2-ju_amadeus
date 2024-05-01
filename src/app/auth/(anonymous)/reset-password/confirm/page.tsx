"use client";

import { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import { notFound, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z, ZodRawShape } from "zod";

import AuthButton from "@/app/auth/AuthButton";
import CustomInput from "@/components/CustomInputRenderer";
import { confirmReset } from "@assets/data/api/endpoints";
import {
  button,
  errors as defaultErrors,
  description,
  fields,
  title,
} from "@assets/data/auth/reset-password/confirm";
import { routes } from "@assets/data/routes";
import { Form } from "@components/ui/form";
import { AuthContext } from "@context/AuthContext";
import ecoSync from "@ecoSync";

type FormInputsType = {
  [key: string]: string;
};

const ResetPasswordInitiate: React.FC = () => {
  const router = useRouter();
  const { auth } = useContext(AuthContext);
  const [success, setSuccess] = useState<boolean | undefined>(false);

  const formSchema = z.object(
    _.reduce(
      fields.map((item) => ({
        [item.id]: z.string().min(1, {
          message: defaultErrors.empty,
        }),
      })),
      _.extend,
    ) as ZodRawShape,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FormInputsType> = (data) => {
    setSuccess(undefined);
    const flagError = () =>
      fields.map((item) =>
        setError(item.id, {
          type: "manual",
        }),
      );
    const values = Object.values(data);
    if (!_.every(values, (item) => _.isEqual(item, values[0]))) {
      setError("default", {
        type: "manual",
        message: defaultErrors["no-match"],
      });
      flagError();
    } else
      ecoSync
        .post(confirmReset, { ...data, ...auth })
        .then(function () {
          setSuccess(true);
          setTimeout(() => {
            router.replace(routes.dashboard);
          }, 1000);
        })
        .catch(function (error) {
          const errorCode = error.response.status as string;
          setSuccess(false);
          flagError();
          setError("default", {
            type: "manual",
            message:
              defaultErrors?.[errorCode as keyof typeof defaultErrors] ||
              defaultErrors.default,
          });
        });
  };

  if (_.isEmpty(auth)) return notFound();

  return (
    <div className="flex flex-col gap-6 md:gap-12">
      <h1 className="heading-secondary text-center">{title}</h1>
      <p className="max-w-[410px] text-small text-center">{description}</p>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="min-w-[280px] md:min-w-[300px] lg:min-w-[420px] flex flex-col justify-center gap-4 md:gap-8"
        >
          <CustomInput
            form={form}
            errors={errors}
            fields={fields}
            variant="lg"
          />

          <AuthButton
            isSubmitting={isSubmitting}
            success={success}
            title={button.title}
          />
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordInitiate;
