import { cookies } from "next/headers";
import { Suspense } from "react";

import { colors } from "@/assets/data/colors";
import { tintGenerator } from "@/utils/tintGenerator";
import Loading from "@components/Loading";
import { IDCard, LandSite, Mail, Storage, User } from "@icons";
import { getUser } from "@utils/getUser";
import Markers from "../components/Markers";

const LandfillOverview: React.FC = async () => {
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
            <div className="flex flex-col gap-4">
              <GroupItem
                Icon={IDCard}
                value={cookieStore.get("userId")?.value as string}
                color={colors.green[800]}
              />
              <div className="flex items-center gap-12 text-medium text-gray-600">
                {[
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
                  {
                    Icon: Storage,
                    value: `${user?.STS?.length} STS`,
                    color: colors.yellow[800],
                  },
                  {
                    Icon: LandSite,
                    value: `${user?.landfill?.length} Landfill sites`,
                    color: colors.green[800],
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
          </div>

          <Suspense fallback={<Loading />}>
            <Markers landfillList={user.landfill} stsList={user.STS} />
          </Suspense>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default LandfillOverview;
