import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

import { sideNavEntry } from "@assets/data/dashboard/nav";
import { roleFromString } from "@assets/data/dashboard/overview";

const Entry: React.FC = () => {
  redirect(
    sideNavEntry(roleFromString(cookies().get("role")?.value))[0].href,
    RedirectType.replace,
  );
};

export default Entry;
