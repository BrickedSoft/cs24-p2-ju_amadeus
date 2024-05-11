import { getWorkForces } from "@/utils/getData";
import { cookies } from "next/headers";

import Create from "./Cerate";

const CreateWorkHour = async () => {
  const cookieStore = cookies();

  const workHour = await getWorkForces(cookieStore);

  return <Create workForceList={workHour} />;
};

export default CreateWorkHour;
