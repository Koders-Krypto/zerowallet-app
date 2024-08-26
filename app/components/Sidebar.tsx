"use client";
import Image from "next/image";
import Links from "../data/Links.json";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className=" text-white h-full flex flex-col justify-start items-start border border-white">
      <div className="border-b border-white py-6 px-4 w-full flex flex-row justify-center items-center">
        <Image src="/logo/logo.svg" alt="Zero Logo" width={180} height={180} />
      </div>
      <div className="p-4 w-full flex flex-col justify-between items-center text-center h-full">
        <div className="flex flex-col gap-4 items-center justify-start w-full h-full">
          {Links.map((link) => (
            <Link
              href={link.href}
              key={link.name}
              className={`border border-white w-full py-4  text-lg ${
                pathname === link.href
                  ? "bg-white text-black font-bold "
                  : "bg-transparent font-base hover:bg-white hover:text-black"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <button className=" w-full py-4  text-white font-bold text-lg">
          Settings
        </button>
      </div>
    </div>
  );
}
