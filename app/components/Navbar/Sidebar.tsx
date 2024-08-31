"use client";
import Image from "next/image";
import Links from "../../data/Links.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Icons from "@/app/utils/Icons";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={`text-white h-[97vh] flex-grow hidden md:flex flex-col justify-start items-start border border-accent transition-all duration-300 ease-in-out max-w-60 ${
        !open ? "w-full" : "w-24"
      }`}
    >
      <div className="border-b border-accent w-full bg-gradient flex flex-row justify-center items-center relative">
        <Link className={!open ? "py-4 px-4 pt-5" : "p-4"} href={"/app"}>
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
          className={`absolute h-8 w-8 border border-accent bg-gradient shadow-lg rounded-full flex justify-center items-center -right-4 p-0.5 transition-all duration-300 ease-in-out bottom-1`}
        >
          <Image
            src={!open ? "/icons/minimise.svg" : "/icons/maximise.svg"}
            alt="Wallet Icon"
            width={20}
            height={20}
          />
        </button>
      </div>
      <div className=" w-full flex flex-col justify-between items-center text-center h-full">
        <div className="flex flex-col gap-0 items-center justify-start w-full h-full text-left ">
          {Links.map((link) => (
            <Link
              href={link.href}
              key={link.name}
              className={`border-b border-accent w-full ${
                open ? "p-4" : "py-5 px-6"
              }  transition-all duration-300 ease-in-out ${
                pathname === link.href
                  ? " font-bold bg-white text-black "
                  : "bg-transparent font-base text-accent"
              }`}
            >
              <div
                className={`flex flex-row gap-4 items-center ${
                  !open ? "justify-start  w-fit" : "justify-center  w-auto"
                }`}
              >
                {!open ? (
                  <Icons
                    path={link.href}
                    className={
                      pathname === link.href ? "text-black" : "text-accent"
                    }
                  />
                ) : (
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Icons
                          path={link.href}
                          className={
                            pathname === link.href
                              ? "text-black"
                              : "text-accent"
                          }
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
        <Link
          href={"/app/settings"}
          className={`flex flex-row gap-4 items-center justify-center border-t border-accent w-full ${
            !open ? "py-5 px-6" : "p-4"
          } transition-all duration-300 ease-in-out ${
            pathname === "/app/settings" && "bg-white"
          }`}
        >
          {!open ? (
            <Icons
              path={"/app/settings"}
              className={
                pathname === "/app/settings" ? "text-black" : "text-accent"
              }
            />
          ) : (
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <Icons
                    path={"/app/settings"}
                    className={
                      pathname === "/app/settings"
                        ? "text-black"
                        : "text-accent"
                    }
                  />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {!open && (
            <button
              className={`w-full ${
                pathname === "/app/settings" ? "text-black" : "text-accent"
              } font-bold text-lg text-left`}
            >
              Settings
            </button>
          )}
        </Link>
      </div>
    </div>
  );
}
