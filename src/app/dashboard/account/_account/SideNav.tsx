import { sideNavValue } from '@/assets/data/dashboard/dashboard';
import SideNavLinkComp from './SideNavLinkComp';

const SideNav: React.FC = () => {
  return (
    <div className='p-2  w-[280px]'>
      {sideNavValue.map(({ label, href }) => (
        <SideNavLinkComp
          key={href}
          href={href}
          label={label}
        />
      ))}
    </div>
  );
};

export default SideNav;
