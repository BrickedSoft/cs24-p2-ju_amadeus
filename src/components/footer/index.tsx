import Link from "next/link";

import { address, email, footerLinks, phone } from "@/assets/data/Footer";
import { NavigationItems } from "@allTypes";
import Logo from "@components/Logo";
import FooterCopyright from "./FooterCopyright";
import FooterSocialLinks from "./FooterSocialLinks";

type NavLinkPropsType = {
  title: string;
  path: string;
};

const NavLink: React.FC<NavLinkPropsType> = ({ title, path }) => {
  return (
    <li>
      <Link
        href={path}
        className="text-x64 leading-none text-white hover:text-dark-yellow-3a transition-colors duration-300"
      >
        {title}
      </Link>
    </li>
  );
};

const NavItem: React.FC<NavigationItems> = ({ title, items }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <h6 className="text-x64 font-bold uppercase leading-5 text-white">
        {title}
      </h6>
      <ul className="list-none flex flex-col gap-3">
        {items.map((item, index) => (
          <NavLink key={index} {...item} />
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-red">
      <div className="bg-foreground py-16 px-5 md:py-20">
        <div className="mx-auto w-full max-w-7xl flex flex-col gap-20">
          <div className="grid w-full lg:grid-cols-[minmax(180px,247px),minmax(500px,1fr)] gap-20 lg:gap-24">
            <div className="order-last w-full flex flex-col gap-3 md:gap-5 items-center lg:order-first">
              <Link
                href="/"
                className="inline-block w-full max-w-[245px] lg:max-w-full"
              >
                <Logo className="h-10 md:h-16 w-10 md:w-16" />
              </Link>

              <p className="text-x64 w-full max-w-[280px] text-center leading-7 text-white lg:text-left">
                {address}
              </p>

              <div className="w-full flex flex-col justify-center items-center lg:items-start gap-1">
                <Link
                  href={`tel:${phone}`}
                  className="text-x64 w-full max-w-[280px] text-center leading-7 text-white lg:text-left hover:text-dark-yellow-3a transition-all duration-300"
                >
                  {phone}
                </Link>
                <Link
                  href={`mailto:${email}`}
                  className="text-x64 w-full max-w-[280px] text-center leading-7 text-white lg:text-left hover:text-dark-yellow-3a transition-all duration-300"
                >
                  {email}
                </Link>
              </div>
            </div>

            <div
              className={`group mx-auto w-full grid grid-cols-2 sm:grid-cols-3 gap-16 sm:gap-6 lg:gap-24 justify-center text-center ${
                footerLinks.length % 2 !== 0
                  ? "[&>*:last-child]:col-span-2 sm:[&>*:last-child]:col-span-1"
                  : ""
              }`}
            >
              {footerLinks.map((item, index) => (
                <NavItem key={index} {...item} />
              ))}
            </div>
          </div>
          <FooterSocialLinks />
        </div>
      </div>
      <FooterCopyright />
    </footer>
  );
};

export default Footer;
