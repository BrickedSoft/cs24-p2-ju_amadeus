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
          <div className="flex flex-col gap-6 border-2 px-12 py-8 rounded-lg">
            <p className="heading-tertiary font-medium">
              Contractor Information
            </p>
            <div className="pl-6 flex flex-col gap-2 text-medium text-gray-600">
              {[
                { title: "Name", value: user.contractor?.name },
                { title: "TIN", value: user.contractor?.tin },
                { title: "Contact", value: user.contractor?.contact },
                { title: "Size", value: user.contractor?.size },
                {
                  title: "Contract Termination Date",
                  value: new Date(
                    user.contractor?.termination as Date
                  ).toLocaleDateString(),
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <div className="h-2 w-2 bg-blue-500 rounded-full" />
                  <p>
                    <span className="font-semibold">{item.title} </span>
                    <span className="text-primary font-medium">
                      {item.value}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default UserInfo;
