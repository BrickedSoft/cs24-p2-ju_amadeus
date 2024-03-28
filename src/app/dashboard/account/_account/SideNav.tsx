import { sideNavValue } from '@/assets/data/dashboard/dashboard';

const SideNav: React.FC = () => {
  return (
    <div className='p-2  w-[240px]'>
      {sideNavValue.map((value) => (
        <button
          key={value}
          className='w-full text-[15px] text-left rounded-[8px] text-gray-500 py-2 px-4   hover:bg-gray-100'>
          {value}
        </button>
      ))}
    </div>
  );
};

export default SideNav;
