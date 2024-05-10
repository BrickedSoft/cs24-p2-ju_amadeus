import Link from "next/link";

import { Button } from "@components/ui/button";
import { changePassword as data } from "@assets/data/dashboard/account/password-logins";

const PasswordChange: React.FC = () => {
  return (
    <div className="bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8">
      <p className="text-large font-medium">{data.title}</p>
      <p className="my-3 text-small">{data.description}</p>

      <div className="mt-2 flex justify-between items-center">
        <p className="my-3 text-small">{data.instruction}</p>
        <Link href={data.href}>
          <Button size={"md"} className="rounded-[8px]">{data.actionLabel}</Button>
        </Link>
      </div>
    </div>
  );
};

export default PasswordChange;
