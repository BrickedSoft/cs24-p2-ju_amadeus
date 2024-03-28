import Navbar from './_navbar/Navbar';
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
}
