"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FieldErrors, UseFormReturn } from "react-hook-form";

import { Card, InputField } from "@allTypes";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Visibility, VisibilityOff } from "@icons";

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
  item: InputField;
  variant?: "md" | "lg";
  [key: string]: any;
};

const CustomInput: React.FC<Props> = ({
  errors,
  form,
  item,
  variant = "md",
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div layout="preserve-aspect">
      <FormField
        control={form.control}
        name={item.id}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{item.title}</FormLabel>
            <FormControl>
              <div className="relative w-auto">
                <Input
                  placeholder={
                    "placeholder" in item ? item.placeholder : undefined
                  }
                  type={!isOpen ? item.type : "text"}
                  {...field}
                  variant={variant}
                  {...rest}
                  className={`${variant === "md" ? "max-w-[360px]" : "max-w-full"} pr-12 md:pr-16`}
                />
                {item.type === "password" && (
                  <div
                    className="absolute top-2/4 right-4 -translate-y-2/4 translate-x-2/4 cursor-pointer flex justify-center items-center mx-2 md:mx-4"
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                  >
                    {isOpen ? (
                      <Visibility
                        className={`${variant === "lg" ? "w-4 md:w-6 h-4 md:h-6" : "w-4 md:w-5 h-4 md:h-5"} fill-gray-600`}
                      />
                    ) : (
                      <VisibilityOff
                        className={`${variant === "lg" ? "w-4 md:w-6 h-4 md:h-6" : "w-4 md:w-5 h-4 md:h-5"} fill-gray-600`}
                      />
                    )}
                  </div>
                )}
              </div>
            </FormControl>

            <FormMessage
              className={`${errors?.[item.id]?.type === "manual" ? "hidden" : ""}`}
            />
          </FormItem>
        )}
      />
    </motion.div>
  );
};

export default CustomInput;
