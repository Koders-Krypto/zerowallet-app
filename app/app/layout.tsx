import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start justify-start p-4 w-full min-h-screen">
      <Sidebar />
      <div className="col-span-3 flex flex-col justify-start items-start">
        <Topbar />
        {children}
      </div>
    </div>
  );
}
