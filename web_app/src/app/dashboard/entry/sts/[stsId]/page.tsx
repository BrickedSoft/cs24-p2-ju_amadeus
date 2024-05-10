"use client";

import { useEffect, useState } from "react";

import { updateSts } from "@lib/entry/sts/updateSts";
import {
  buttons,
  description,
  errors,
  fields,
  mapFieldTitle,
  title,
} from "@assets/data/dashboard/entry/sts";
import CardLoading from "@components/ui/card-loading";
import Update from "../../_components/Update";

type Props = {
  params: { stsId: string };
};

const EditSts: React.FC<Props> = ({ params }) => {
  const [sts, setSts] = useState();

  useEffect(() => {
    fetch(`/api/sts/${params.stsId}`)
      .then((res) => res.json())
      .then((stsSiteInfo) => {
        setSts(stsSiteInfo.sts);
      });
  }, [params.stsId]);

  return sts ? (
    <Update
      action={updateSts}
      errors={errors}
      fields={fields}
      title={title.update}
      description={description}
      buttons={buttons}
      mapFieldTitle={mapFieldTitle}
      initialValues={sts}
    />
  ) : (
    <CardLoading />
  );
};

export default EditSts;
