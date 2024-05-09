import dynamic from "next/dynamic";
import {
  Control,
  FieldErrors,
  UseFormReturn,
  UseFormSetValue,
} from "react-hook-form";

import { fields as lngLatData } from "@/assets/data/map";
import CustomInput from "@/components/CustomInput";
import { Skeleton } from "@/components/ui/skeleton";
import SubmitButton from "@/components/ui/SubmitButton";
import { InputField } from "@allTypes";
import CustomInputRenderer from "@components/CustomInputRenderer";
import { Button } from "@components/ui/button";
import { center } from "@constants/map";

const DraggableMarker = dynamic(
  () => import("@components/map/DraggableMarker"),
  {
    loading: () => <Skeleton className="w-full h-[340px]" />,
    ssr: false,
  }
);

type Props = {
  form: UseFormReturn<
    {
      [x: string]: any;
    },
    any,
    undefined
  >;
  fields: InputField[];
  title: string;
  description: string;
  errors: FieldErrors<{
    [x: string]: any;
  }>;
  buttons: {
    [key: string]: string;
  };
  mapFieldTitle: string;
  control: Control<
    {
      [x: string]: any;
    },
    any
  >;
  setValue: UseFormSetValue<{
    [x: string]: any;
  }>;
  isLoading?: boolean;
};

const Fields: React.FC<Props> = ({
  form,
  fields,
  title,
  description,
  errors,
  buttons,
  mapFieldTitle,
  control,
  setValue,
  isLoading,
}) => {
  return (
    <>
      <p className="heading-tertiary">{title}</p>
      <p className="text-medium">{description}</p>
      <div className="flex flex-col gap-8">
        <CustomInputRenderer
          fields={fields}
          errors={errors}
          form={form}
          width={560 / 4}
        />

        <div className="flex flex-col gap-2 md:gap-3">
          <p className="text-small">{mapFieldTitle}</p>
          <DraggableMarker control={control} setValue={setValue} />
        </div>

        <div className="flex justify-between mb-2">
          {lngLatData.map((ele) => (
            <CustomInput
              key={ele.id}
              errors={errors}
              form={form}
              item={ele}
              direction="horizontal"
              step={0.01}
              width={28}
              decimalPoint={2}
            />
          ))}
        </div>
      </div>

      <div className="w-full mt-8 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          rounded={false}
          className="border-destructive hover:border-transparent hover:bg-destructive/20"
          onClick={() => {
            setValue("latitude", center.lat, {
              shouldDirty: true,
              shouldTouch: true,
            });
            setValue("longitude", center.lng, {
              shouldDirty: true,
              shouldTouch: true,
            });
          }}
          type="reset"
        >
          {buttons.reset}
        </Button>
        <SubmitButton label={buttons.submit} isLoading={isLoading} />
      </div>
    </>
  );
};

export default Fields;
