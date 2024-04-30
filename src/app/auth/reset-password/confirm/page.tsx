"use client";

import { motion } from "framer-motion";
import _ from "lodash";
import { notFound, useRouter } from "next/navigation";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z, ZodRawShape } from "zod";

import ecoSync from "@/api/ecoSync";
import { confirmReset } from "@/assets/data/api/endpoints";
import {
  button,
  errors as defaultErrors,
  description,
  fields,
  title,
} from "@/assets/data/auth/reset-password/confirm";
import { routes } from "@/assets/data/routes";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { AuthContext } from "@context/AuthContext";

type FormInputsType = {
  [key: string]: string;
};

const ResetPasswordInitiate: React.FC = () => {
  const router = useRouter();
  const { auth } = useContext(AuthContext);

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

  const form = useForm();
  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FormInputsType> = (data) => {
    const flagError = () =>
      fields.map((item) =>
        setError(item.id, {
          type: "manual",
        })
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
          router.replace(routes.dashboard);
        })
        .catch(function (error) {
          const errorCode = error.response.status as string;

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
          <p className="text-large text-destructive font-semibold text-center">
            {errors?.default?.message as string}
          </p>
          <motion.div
            className="flex flex-col justify-center gap-4 md:gap-8"
            layout="position"
          >
            {fields.map((item) => (
              <motion.div key={item.id} layout="preserve-aspect">
                <FormField
                  control={form.control}
                  name={item.id}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item.title}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={item.placeholder}
                          type={item.type}
                          {...field}
                        />
                      </FormControl>

                      <FormMessage
                        className={`${errors?.[item.id]?.type === "manual" ? "hidden" : ""}`}
                      />
                    </FormItem>
                  )}
                />
              </motion.div>
            ))}
          </motion.div>
          <div className="flex flex-col justify-center items-center gap-4 md:gap-6">
            <Button type="submit" size={"lg"} className="self-stretch">
              {isSubmitting ? <Spinner /> : button.title}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordInitiate;
