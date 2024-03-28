'use client';
import { NavLink } from '@/assets/data/dashboard/dashboard';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SideNavLinkComp: React.FC<NavLink> = ({ label, href }) => {
  const active = usePathname() == href ? 'text-gray-900' : '';

  return (
    <Link href={href}>
      <button
        className={
          'w-full text-[15px] text-left rounded-[8px] text-gray-500 py-2 px-4  hover:bg-gray-200 ' +
          active
        }>
        {label}
      </button>
    </Link>
  );
};

export default SideNavLinkComp;
