"use client";

import { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z, ZodRawShape } from "zod";

import { initiateReset } from "@assets/data/api/endpoints";
import {
  button,
  errors as defaultErrors,
  description,
  fields,
  title,
} from "@assets/data/auth/reset-password/initiate";
import { routes } from "@assets/data/routes";
import CustomInput from "@/components/CustomInputRenderer";
import { Button } from "@components/ui/button";
import { Form } from "@components/ui/form";
import Spinner from "@components/ui/spinner";
import { AuthContext } from "@context/AuthContext";
import ecoSync from "@ecoSync";

type FormInputsType = {
  [key: string]: string;
};

const ResetPasswordInitiate: React.FC = () => {
  const router = useRouter();
  const { setAuth } = useContext(AuthContext);

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
    ecoSync
      .post(initiateReset, { ...data })
      .then(function () {
        setAuth({
          email: data.email,
          resetToken: data.resetToken,
          password: undefined,
        });
        router.replace(routes.confirmReset);
      })
      .catch(function (error) {
        const errorCode = error.response.status as string;
        fields.map((item) =>
          setError(item.id, {
            type: "manual",
          }),
        );
        setError("default", {
          type: "manual",
          message:
            defaultErrors?.[errorCode as keyof typeof defaultErrors] ||
            defaultErrors.default,
        });
      });
  };

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

          <Button type="submit" size={"lg"} className="self-stretch">
            {isSubmitting ? <Spinner /> : button.title}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordInitiate;
