import { landfillEndpoint } from "@assets/data/api/endpoints";
import {
  buttons,
  description,
  errors,
  fields,
  mapFieldTitle,
  title,
} from "@assets/data/dashboard/entry/landfill-sites";
import Create from "../../_components/Create";

const NewSts: React.FC = () => (
  <Create
    endpoint={landfillEndpoint}
    errors={errors}
    fields={fields}
    title={title}
    description={description}
    buttons={buttons}
    mapFieldTitle={mapFieldTitle}
  />
);

export default NewSts;
