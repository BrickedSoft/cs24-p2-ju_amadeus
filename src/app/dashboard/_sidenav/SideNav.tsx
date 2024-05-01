import { NavLink as NavLinkType } from "@allTypes";
import SideNavLinkComp from "./SideNavLinkComp";

const SideNav: React.FC<{ sideNavValue: NavLinkType[] }> = ({
  sideNavValue,
}) => {
  return (
    <div className="w-[280px] flex flex-col gap-2 md:gap-3 py-8 px-2">
      {sideNavValue.map(({ title, href }) => (
        <SideNavLinkComp key={href} href={href} title={title} />
      ))}
    </div>
  );
};

export default SideNav;
