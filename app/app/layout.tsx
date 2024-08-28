import { Toaster } from "@/components/ui/toaster";
import Sidebar from "../components/Navbar/Sidebar";
import Topbar from "../components/Navbar/Topbar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row gap-4 items-start justify-start px-5 py-4 md:py-4 md:px-4 w-full min-h-screen">
      <Toaster />
      <Sidebar />
      <div className="flex flex-col gap-6 md:gap-8 justify-start items-start w-full h-[97vh] md:border border-accent md:p-4">
        <Topbar />
        {children}
      </div>
    </div>
  );
}
