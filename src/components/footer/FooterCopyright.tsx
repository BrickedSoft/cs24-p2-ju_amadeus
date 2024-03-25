import Link from "next/link";

import { copyright, copyrightLinks } from "@/assets/data/Footer";

type FooterLinkPropsType = {
  title: string;
  path: string;
};

const FooterLink: React.FC<FooterLinkPropsType> = ({ title, path }) => (
  <Link
    href={path}
    className="text-[13px] font-normal capitalize leading-[25px] text-gray-500 hover:text-dark-black-29 transition-all duration-300"
  >
    {title}
  </Link>
);

const FooterCopyright = () => {
  return (
    <div className="bg-[#F8F8F8] py-5 px-5">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center md:items-start justify-between gap-4 sm:gap-5 md:flex-row">
        <p className="order-last md:order-first text-center text-[13px] font-normal leading-[25px] text-gray-500 sm:text-left">
          {copyright}
        </p>
        <ul className="order-first md:order-last flex w-full md:max-w-[300px] items-center justify-center md:justify-between gap-8 md:gap-4 lg:max-w-[445px]">
          {copyrightLinks.map((item, index) => (
            <FooterLink key={index} {...item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FooterCopyright;
