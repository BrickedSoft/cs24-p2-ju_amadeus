import { stsDataEndpoint } from "@assets/data/api/endpoints";
import {
  buttons,
  description,
  errors,
  fields,
  mapFieldTitle,
  title,
} from "@assets/data/dashboard/entry/sts";
import Create from "../../_components/Create";

const NewSts: React.FC = ({}) => (
  <Create
    endpoint={stsDataEndpoint}
    errors={errors}
    fields={fields}
    title={title.new}
    description={description}
    buttons={buttons}
    mapFieldTitle={mapFieldTitle}
  />
);

export default NewSts;
