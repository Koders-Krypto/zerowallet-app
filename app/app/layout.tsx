import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row gap-4 items-start justify-start p-4 w-full min-h-screen">
      <Sidebar />

      <div className="flex flex-col justify-start items-start w-full">
        <Topbar />
        {children}
      </div>
    </div>
  );
}
