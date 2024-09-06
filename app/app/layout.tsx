import Sidebar from "../components/Navbar/Sidebar";
import Topbar from "../components/Navbar/Topbar";
import { ZapperProvider } from "../context/ZapperProvider";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ZapperProvider>
      <div className="flex flex-row gap-0 items-start justify-start px-4 py-4 md:py-4 md:px-4 w-full min-h-screen">
        <Sidebar />
        <div className="flex flex-col gap-6 md:gap-8 justify-start items-start w-full h-screen md:h-[97vh] flex-grow md:border md:border-l-0 border-accent md:p-5">
          <Topbar />
          {children}
        </div>
      </div>
    </ZapperProvider>
  );
}
