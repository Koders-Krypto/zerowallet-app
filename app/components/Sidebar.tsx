"use client";
import Image from "next/image";
import Links from "../data/Links.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={`text-white h-[97vh] hidden md:flex flex-col justify-start items-start border border-accent transition-all duration-300 ease-in-out max-w-64 ${
        !open ? "w-full" : "w-28"
      }`}
    >
      <div className="border-b border-accent py-4 px-4 w-full flex flex-row justify-center items-center relative">
        <Link href={"/app"}>
          <Image
            src={open ? "/logo/icon.svg" : "/logo/logo.svg"}
            alt="Zero Logo"
            width={open ? 50 : 150}
            height={180}
            className="transition-all duration-300 ease-in-out"
          />
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className={`absolute h-7 w-7 border border-accent bg-gradient flex justify-center items-center ${
            open ? "top-6" : "top-8"
          } right-[-0.8rem] transition-all duration-300 ease-in-out`}
        >
          <Image
            src={!open ? "/icons/minimise.svg" : "/icons/maximise.svg"}
            alt="Wallet Icon"
            width={20}
            height={20}
          />
        </button>
      </div>
      <div className="p-4 w-full flex flex-col justify-between items-center text-center h-full">
        <div className="flex flex-col gap-4 items-center justify-start w-full h-full text-left">
          {Links.map((link) => (
            <Link
              href={link.href}
              key={link.name}
              className={`border border-accent w-full ${
                open ? "p-4" : "py-4 px-6"
              } bg-white text-black transition-all duration-300 ease-in-out ${
                pathname === link.href
                  ? " font-bold "
                  : "bg-transparent font-base "
              }`}
            >
              <div
                className={`flex flex-row gap-4 items-center ${
                  !open ? "justify-start  w-fit" : "justify-center  w-auto"
                }`}
              >
                {!open ? (
                  <Image
                    className="text-white"
                    src={link.icon}
                    alt="Wallet Icon"
                    width={24}
                    height={24}
                  />
                ) : (
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Image
                          className="text-white"
                          src={link.icon}
                          alt="Wallet Icon"
                          width={24}
                          height={24}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{link.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}

                {!open && <p className="text-base">{link.name}</p>}
              </div>
            </Link>
          ))}
        </div>
        <div
          className={`flex flex-row gap-4 items-center justify-center w-full ${
            open ? "p-4" : "py-4 px-6"
          } transition-all duration-300 ease-in-out`}
        >
          {!open ? (
            <Image
              src="/icons/settings.svg"
              alt="Wallet Icon"
              width={24}
              height={24}
            />
          ) : (
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <Image
                    src="/icons/settings.svg"
                    alt="Wallet Icon"
                    width={24}
                    height={24}
                  />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {!open && (
            <button className=" w-full text-white font-bold text-lg text-left">
              Settings
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
