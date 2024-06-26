import { colors } from "@/assets/data/colors";
import Loading from "@/components/Loading";
import { getLandfill, getSTS, getUser } from "@/utils/getData";
import { tintGenerator } from "@/utils/tintGenerator";
import { IDCard, Mail, User } from "@icons";
import { cookies } from "next/headers";
import React, { Suspense } from "react";
import Markers from "../components/Markers";

const UserInfo = async () => {
  const cookieStore = cookies();
  const user = await getUser(cookieStore);
  const sts = await getSTS(cookieStore);
  const landfill = await getLandfill(cookieStore);

  const GroupItem: React.FC<{
    Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
    value: string | number;
    color: string;
  }> = ({ Icon, value, color }) => (
    <div className="flex items-center gap-3">
      <div
        className="p-2 rounded-full"
        style={{
          backgroundColor: `#${tintGenerator(color, 20)}`,
        }}
      >
        <Icon
          className="h-4 w-4"
          style={{
            color: color,
            fill: color,
          }}
        />
      </div>
      <p
        style={{
          color: color,
        }}
      >
        {value}
      </p>
    </div>
  );

  return (
    <div className="py-8">
      {user ? (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6 border-2 px-12 py-8 rounded-lg">
            <p className="heading-tertiary text-primary font-primary">
              {user.name}
            </p>
            <div className="flex items-center gap-12 text-medium text-gray-600">
              {[
                {
                  Icon: IDCard,
                  value: cookieStore.get("userId")?.value as string,
                  color: colors.green[800],
                },
                {
                  Icon: Mail,
                  value: user.email,
                  color: colors.red[800],
                },
                {
                  Icon: User,
                  value: user.role,
                  color: colors.blue[800],
                },
              ].map((item, index) => (
                <GroupItem
                  key={index}
                  Icon={item.Icon}
                  value={item.value}
                  color={item.color}
                />
              ))}
            </div>
          </div>

          <Suspense fallback={<Loading />}>
            <Markers landfillList={landfill} stsList={sts} />
          </Suspense>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default UserInfo;
