"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import { stsInfo } from "@assets/data/dashboard/entry/sts";
import CardLoading from "@components/ui/card-loading";
import { Input } from "@components/ui/input";
import SubmitButton from "@components/ui/SubmitButton";
import { updateSts } from "../../../../../lib/entry/sts/updateSts";

const initialState = {
  message: "",
};

const EditUser: React.FC<{ params: { stsId: string } }> = ({ params }) => {
  const [sts, setSts] = useState();

  useEffect(() => {
    fetch(`/api/sts/${params.stsId}`)
      .then((res) => res.json())
      .then((stsInfo) => {
        setSts(stsInfo.sts);
      });
  }, [params.stsId]);

  const [state, formAction] = useFormState(
    updateSts.bind(null, params.stsId),
    initialState
  );
  return sts ? (
    <form
      action={formAction}
      className="bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8"
    >
      <p className="text-lg font-medium">{stsInfo.title}</p>
      <p className="my-3 text-sm">{stsInfo.description}</p>
      {stsInfo.formValues.map((ele) => (
        <div key={ele.name}>
          <p className="mt-4 mb-1 text-sm">{ele.label}</p>
          <Input
            contentEditable={false}
            name={ele.name}
            id={ele.name}
            type="text"
            placeholder={sts[ele.name]}
            maxLength={32}
            className="max-w-[560px] border-gray-300 placeholder:text-gray-600 h-10"
          />
        </div>
      ))}

      <div className="w-full mt-4 flex justify-between">
        <div></div>
        <SubmitButton label={stsInfo.actionLabel} disabled={false} />
      </div>
      <p className="text-sm text-green-600">{state.message}</p>
    </form>
  ) : (
    <CardLoading />
  );
};

export default EditUser;
