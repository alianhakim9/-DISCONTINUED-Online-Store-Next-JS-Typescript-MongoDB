export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-black flex flex-col items-start justify-center p-10">
        <h1 className="text-lime-700 font-bold text-5xl">
          WELCOME TO OLSHOP ADMIN
        </h1>
        <p className="text-slate-200 font-semibold">
          please enter your credentials to access admin dashboard
        </p>
      </div>
      <div className="p-10 flex flex-col items-center justify-center gap-2 w-full">
        {children}
      </div>
    </div>
  );
}
