import SideNav from './_account/SideNav';

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='bg-background w-full px-12 mt-24 '>
      <div className='flex'>
        <SideNav />
        <div className=' w-full flex flex-col items-center px-4'>
          <div className='w-full max-w-[829px] min-w-[410px]'>{children}</div>
        </div>
      </div>
    </main>
  );
}
