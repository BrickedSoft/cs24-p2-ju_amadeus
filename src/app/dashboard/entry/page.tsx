import { redirect, RedirectType } from "next/navigation";

const Entry: React.FC = () => {
  redirect("/dashboard/entry/users", RedirectType.replace);
};

export default Entry;
