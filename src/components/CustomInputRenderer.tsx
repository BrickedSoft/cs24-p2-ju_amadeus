"use client";

import { motion } from "framer-motion";
import { FieldErrors, UseFormReturn } from "react-hook-form";

import { InputField } from "@allTypes";
import CustomInput from "./CustomInput";

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
  variant?: "md" | "lg";
};

const CustomInputRenderer: React.FC<Props> = ({
  errors,
  form,
  fields,
  variant = "md",
}) => (
  <>
    <p className="text-large text-destructive font-semibold text-center">
      {errors?.default?.message as string}
    </p>
    <motion.div
      className="flex flex-col justify-center gap-4 md:gap-8"
      layout="position"
    >
      {fields.map((item) => (
        <CustomInput
          key={item.id}
          errors={errors}
          form={form}
          item={item}
          variant={variant}
        />
      ))}
    </motion.div>
  </>
);

export default CustomInputRenderer;
