import Link from "next/link";

import { socialLinks } from "@/assets/data/Footer";

const FooterSocialLinks: React.FC = () => {
  return (
    <ul className="mx-auto flex w-full items-center justify-center gap-6 md:gap-[55px]">
      {socialLinks.map(({ Icon, href }, index) =>
        href ? (
          <li key={index} className="group cursor-pointer">
            <Link href={href} target={"_blank"} rel="noopener noreferrer">
              <Icon className="w-auto h-6 md:h-[34px] fill-white group-hover:scale-105 group-hover:fill-dark-yellow-3a transition-all duration-300" />
            </Link>
          </li>
        ) : null,
      )}
    </ul>
  );
};

export default FooterSocialLinks;
