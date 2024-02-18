import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-7">
      <aside className="self-start sticky top-0 col-span-1 bg-black h-[100vh]">
        <Sidebar />
      </aside>
      <main className="col-span-6 p-10">{children}</main>
    </div>
  );
}
