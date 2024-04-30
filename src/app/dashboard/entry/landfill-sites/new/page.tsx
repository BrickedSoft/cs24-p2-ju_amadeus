"use client";

import { useFormState } from "react-dom";

import { newLandfillSiteInfo } from "@assets/data/dashboard/entry/landfill-sites";
import { Input } from "@components/ui/input";
import SubmitButton from "@components/ui/SubmitButton";
import { createLandfill } from "@/lib/entry/landfill-sites/createLandfill";

const initialState = {
  message: "",
};

type FormValues = {
  name: string;
  label: string;
};

type FormInfo = {
  actionLabel: string;
  title: string;
  description: string;
  formValues: FormValues[];
};


const NewLandfill: React.FC<{}> = ({}) => {
  const [state, formAction] = useFormState(createLandfill, initialState);
  return (
    <form
      action={formAction}
      className="bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8"
    >
      <p className="text-lg font-medium">{newLandfillSiteInfo.title}</p>
      <p className="my-3 text-sm">{newLandfillSiteInfo.description}</p>
      {newLandfillSiteInfo.formValues.map((ele) => (
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
        <SubmitButton label={newLandfillSiteInfo.actionLabel} disabled={false} />
      </div>
      <p className="text-sm text-green-600">{state.message}</p>
    </form>
  );
};

export default NewLandfill;
