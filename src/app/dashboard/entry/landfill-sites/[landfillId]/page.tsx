"use client";

import { useEffect, useState } from "react";

import {
  buttons,
  description,
  errors,
  fields,
  mapFieldTitle,
  title,
} from "@assets/data/dashboard/entry/landfill-sites";
import CardLoading from "@components/ui/card-loading";
import { updateLandfill } from "@lib/entry/landfill-sites/updateLandfill";
import Update from "../../_components/Update";

type Props = {
  params: { landfillId: string };
};

const EditLandfill: React.FC<Props> = ({ params }) => {
  const [landfill, setLandfill] = useState();

  useEffect(() => {
    fetch(`/api/landfill/${params.landfillId}`)
      .then((res) => res.json())
      .then((landfillSiteInfo) => {
        setLandfill(landfillSiteInfo.landfill);
      });
  }, [params.landfillId]);

  return landfill ? (
    <Update
      action={updateLandfill}
      errors={errors}
      fields={fields}
      title={title.update}
      description={description}
      buttons={buttons}
      mapFieldTitle={mapFieldTitle}
      initialValues={landfill}
    />
  ) : (
    <CardLoading />
  );
};

export default EditLandfill;
