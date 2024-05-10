"use client";

import { useFormState } from "react-dom";

import { newVehicleInfo } from "@assets/data/dashboard/entry/vehicles";
import { Input } from "@components/ui/input";
import SubmitButton from "@components/ui/SubmitButton";
import { addVehicle } from "@lib/entry/vehicles/addVehicle";

const initialState = {
  message: "",
};

const NewVehicle: React.FC<{}> = ({}) => {
  const [state, formAction] = useFormState(addVehicle, initialState);
  return (
    <form
      action={formAction}
      className="bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8"
    >
      <p className="text-lg font-medium">{newVehicleInfo.title}</p>
      <p className="my-3 text-sm">{newVehicleInfo.description}</p>
      {newVehicleInfo.formValues.map((ele) => (
        <div key={ele.name}>
          <p className="mt-4 mb-1 text-sm">{ele.label}</p>
          <Input
            contentEditable={false}
            name={ele.name}
            id={ele.name}
            type="text"
            required
            maxLength={32}
            className="max-w-[560px] border-gray-300 placeholder:text-gray-600 h-10"
          />
        </div>
      ))}

      <div className="w-full mt-4 flex justify-between">
        <div></div>
        <SubmitButton label={newVehicleInfo.actionLabel} disabled={false} />
      </div>
      <p className="text-sm text-green-600">{state.message}</p>
    </form>
  );
};

export default NewVehicle;
