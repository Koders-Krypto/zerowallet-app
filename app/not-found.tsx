import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center w-full max-w-md gap-8">
        <div className="flex flex-col items-center justify-center gap-1">
          <h1 className="text-9xl font-black">404</h1>
          <h2 className="text-3xl font-bold">Page Not Found</h2>
        </div>
        <Link
          href={"/"}
          className=" bg-white text-black text-lg px-6 py-2.5 flex flex-row justify-center items-center gap-2"
        >
          <Home />
          <span>Home</span>
        </Link>
      </div>
    </div>
  );
}
