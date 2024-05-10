import { getSTS } from "@/utils/getData";
import { cookies } from "next/headers";
import Create from "./_components/Create";

const NewContractor = async () => {
  const cookieStore = cookies();

  const stsList = await getSTS(cookieStore);

  return <Create stsList={stsList} />;
};

export default NewContractor;
