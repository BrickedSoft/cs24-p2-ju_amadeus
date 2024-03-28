'use client';
import { NavLink } from '@/assets/data/dashboard/dashboard';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLinkComp: React.FC<NavLink> = ({ label, href }) => {
  const active = usePathname() == href ? 'text-gray-900' : '';

  return (
    <Link
      href={href}
      key={href}
      className={
        'text-md backdrop-blur  cursor-pointer text-gray-600 ' + active
      }>
      <p>{label}</p>
      {active && <hr className='border-green-400 border-[1.45px]' />}
    </Link>
  );
};

export default NavLinkComp;
