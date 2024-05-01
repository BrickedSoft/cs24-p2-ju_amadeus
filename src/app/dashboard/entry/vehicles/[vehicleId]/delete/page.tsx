"use client";

import { useFormState } from "react-dom";

import { Input } from "@components/ui/input";
import { deleteVehicle } from "@lib/entry/vehicles/deleteVehicle";
import SubmitButton from "@components/ui/SubmitButton";

const initialState = {
  message: "",
};

const DeleteVehicle: React.FC<{ params: { vehicleId: string } }> = ({
  params,
}) => {
  const [state, formAction] = useFormState(
    deleteVehicle.bind(null, params.vehicleId || ""),
    initialState,
  );

  return (
    <div>
      <form
        action={formAction}
        className="bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8"
      >
        <p className="text-lg font-medium">Delete Vehicle</p>
        <p className="mt-4 mb-1 text-sm">Delete vehicle with id:</p>
        <Input
          contentEditable={false}
          name="id"
          id="id"
          value={params.vehicleId}
          type="text"
          disabled
          maxLength={32}
          className="max-w-[560px] border-gray-300 placeholder:text-gray-600 h-10"
        />

        <div className="w-full mt-4 flex justify-between">
          <div></div>
          <SubmitButton label="Delete" disabled={false} />
        </div>
        <p className="text-sm text-green-600">{state.message}</p>
      </form>
    </div>
  );
};

export default DeleteVehicle;
