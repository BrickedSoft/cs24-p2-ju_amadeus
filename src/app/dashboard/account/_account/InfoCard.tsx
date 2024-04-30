"use client";

import { CardType } from "@assets/data/dashboard/account/general";

const InfoCard: React.FC<{
  info: CardType;
}> = ({ info }) => {
  return (
    <div className="bg-background px-6 py-4 rounded-md  border-[1.45px] border-gray-300 shadow-sm mt-8">
      <p className="text-lg font-medium">{info.title}</p>
      <p className="my-3 text-sm">{info.description}</p>
      <p className="my-3 text-sm font-semibold text-green-700">
        {info.actionLabel}
      </p>
      <div className="w-full flex justify-between mt-4">
        <p className=" text-sm text-gray-600">{info.instruction}</p>
      </div>
    </div>
  );
};

export default InfoCard;
