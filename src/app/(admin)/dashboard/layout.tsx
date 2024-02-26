import Sidebar from "@/components/admin/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-7">
      <Sidebar />
      <div className="col-span-6 p-10">{children}</div>
    </div>
  );
}
