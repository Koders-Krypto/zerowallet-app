"use client";
import Image from "next/image";
import {
  useWalletInfo,
  useAccount,
  useLoginProvider,
  useDisconnect,
} from "../../context/LoginProvider";
import Truncate from "../../utils/truncate";
import { Power, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Links from "../../data/Links.json";
import Icons from "@/app/utils/Icons";
import { FadeText } from "@/components/magicui/fade-text";

export default function Topbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { walletInfo } = useWalletInfo();
  const { setWalletInfo } = useLoginProvider();
  const [formatedPathname, setFormatedPathname] = useState("");

  useEffect(() => {
    const formatPathname = pathname.replace("/app", "").replace("/", "");
    setFormatedPathname(formatPathname);
  }, [pathname]);

  return (
    <div className="flex flex-row justify-between items-center w-full">
      <div className="flex w-full md:hidden">
        <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
          <SheetTrigger asChild>
            <div className="flex flex-row justify-between items-center w-full p-0">
              <Image
                src={"/logo/logo-without-tagline.svg"}
                alt="ZeroWallet Logo"
                width={120}
                height={110}
              />
              <button className="flex items-center justify-center rounded-md bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                <span className="sr-only">Open main menu</span>
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="sm:hidden bg-black text-white border-l border-accent p-0"
          >
            <SheetHeader className="px-6 py-4 border-b border-accent">
              <SheetTitle className="text-white text-left">Menu</SheetTitle>
            </SheetHeader>
            <nav className="grid gap-0 text-sm font-medium px-6 py-3">
              {Links.map((link) => (
                <div
                  key={link.name}
                  className={`flex flex-row gap-4 items-center justify-start pr-4 py-4 bg-black text-white ${
                    pathname === link.href ? "font-bold" : "font-light"
                  }`}
                  onClick={() => {
                    setDrawerOpen(false);
                    router.push(link.href);
                  }}
                >
                  <Icons path={link.href} className="text-white" />
                  <p>{link.name}</p>
                </div>
              ))}
              <div
                className={`flex flex-row gap-4 items-center justify-start pr-4 py-4 bg-black text-white ${
                  pathname === "/app/settings" ? "font-bold" : "font-light"
                }`}
                onClick={() => {
                  setDrawerOpen(false);
                  router.push("/app/settings");
                }}
              >
                <Settings />
                <p>Settings</p>
              </div>
              <WalletButton
                walletInfo={walletInfo}
                address={address}
                disconnect={() => {
                  disconnect();
                  setWalletInfo(undefined);
                }}
                router={router}
              />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:flex flex-row justify-between items-center w-full">
        <FadeText
          key={formatedPathname}
          className="capitalize text-2xl font-bold hidden md:block"
          direction="left"
          framerProps={{
            show: { transition: { delay: 0.8 } },
          }}
          text={formatedPathname || "Assets"}
        />

        <div className="flex flex-row justify-end items-center gap-4 w-full">
          <WalletButton
            walletInfo={walletInfo}
            address={address}
            disconnect={() => {
              disconnect();
              setWalletInfo(undefined);
            }}
            router={router}
          />
        </div>
      </div>
    </div>
  );
}

const WalletButton = (props: any) => {
  return (
    <div className="flex flex-row gap-3 items-center justify-start md:justify-between text-sm px-0 md:px-4 bg-black text-white py-2">
      <Image
        src={props.walletInfo?.icon || "/icons/wallet.svg"}
        alt="Wallet Icon"
        width={25}
        height={25}
      />
      <p>{Truncate(props.address, 12, "...")}</p>

      <button
        onClick={() => {
          props.disconnect();
          props.router.push("/");
        }}
        className="flex justify-end items-center"
      >
        <Power color="#F2F2F2" size={18} />
      </button>
    </div>
  );
};
