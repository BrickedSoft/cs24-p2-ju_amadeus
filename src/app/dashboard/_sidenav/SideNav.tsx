import { NavLink as NavLinkType } from "@allTypes";
import SideNavLinkComp from "./SideNavLinkComp";

const SideNav: React.FC<{ sideNavValue: NavLinkType[] }> = ({
  sideNavValue,
}) => {
  return (
    <div className="p-2  w-[280px]">
      {sideNavValue.map(({ title, href }) => (
        <SideNavLinkComp key={href} href={href} title={title} />
      ))}
    </div>
  );
};

export default SideNav;
