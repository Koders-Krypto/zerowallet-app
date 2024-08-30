import Sidebar from "../components/Navbar/Sidebar";
import Topbar from "../components/Navbar/Topbar";
import TxPopup from "../components/TxPopup/TxPopup";
import { SignClientProvider } from "../context/SignClientProvider";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SignClientProvider>
      <div className="flex flex-row gap-0 items-start justify-start px-5 py-4 md:py-4 md:px-4 w-full min-h-screen">
        <TxPopup />
        <Sidebar />
        <div className="flex flex-col gap-6 md:gap-8 justify-start items-start w-full h-[150vh] md:h-[97vh] flex-grow md:border md:border-l-0 border-accent md:p-5">
          <Topbar />
          {children}
        </div>
      </div>
    </SignClientProvider>
  );
}
