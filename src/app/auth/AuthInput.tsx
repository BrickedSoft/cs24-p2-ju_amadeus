'use client'

import { motion } from "framer-motion";
import { FieldErrors, UseFormReturn } from "react-hook-form";

import { InputField } from "@allTypes";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";

type Props = {
  errors: FieldErrors<{
    [x: string]: any;
  }>;
  form: UseFormReturn<
    {
      [x: string]: any;
    },
    any,
    undefined
  >;
  fields: InputField[];
};

const AuthInput: React.FC<Props> = ({ errors, form, fields }) => {
  return (
    <>
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
                      variant="lg"
                      className="bg-white"
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
    </>
  );
};

export default AuthInput;
