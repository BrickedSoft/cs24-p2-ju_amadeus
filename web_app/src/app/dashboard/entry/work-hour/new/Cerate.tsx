"use client";

import { useFormState } from "react-dom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addWorkHour } from "@/lib/entry/work-hour/work-hour";
import { newWasteEntryInfo } from "@assets/data/dashboard/entry/work-hour";
import { Input } from "@components/ui/input";
import SubmitButton from "@components/ui/SubmitButton";
import { Workforce } from "@prisma/client";

const initialState = {
  message: "",
};

type Props = {
  workForceList: Workforce[];
};

const NewVehicleEntry: React.FC<Props> = ({ workForceList }) => {
  const [state, formAction] = useFormState(addWorkHour, initialState);

  return (
    <form
      action={formAction}
      className="bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8"
    >
      <p className="text-lg font-medium">{newWasteEntryInfo.title}</p>
      <p className="mt-2 mb-6 text-sm">{newWasteEntryInfo.description}</p>
      <div className="max-w-[560px] grid grid-cols-[auto_auto] gap-8 justify-between">
        {newWasteEntryInfo.formValues.map((ele) => (
          <div key={ele.name}>
            <p className="mb-2 text-sm">{ele.label}</p>
            <Input
              contentEditable={false}
              name={ele.name}
              id={ele.name}
              type={ele.type}
              required
              maxLength={32}
              className={`max-w-[560px] ${ele.type === "datetime-local" ? "w-[240px]" : ""} border-gray-300 placeholder:text-gray-600 h-10`}
            />
          </div>
        ))}
        <div>
          <p className="mb-2 text-sm">Workforce List</p>
          <Select key="userId" name="userId" required>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select workforce" />
            </SelectTrigger>
            <SelectContent>
              {workForceList.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full mt-4 flex justify-between">
        <div></div>
        <SubmitButton label={newWasteEntryInfo.actionLabel} disabled={false} />
      </div>
      <p className="text-sm text-green-600">{state.message}</p>
    </form>
  );
};

export default NewVehicleEntry;
