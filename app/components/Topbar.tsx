"use client";
import Image from "next/image";
import {
  useWalletInfo,
  useAccount,
  useDisconnect,
} from "../context/LoginProvider";
import Truncate from "../utils/truncate";
import { Power, ScanQrCode, Settings2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import * as React from "react";

import { useMediaQuery } from "usehooks-ts";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Links from "../data/Links.json";
import Link from "next/link";
import Icons from "../utils/Icons";
import { useLoginProvider } from "../context/LoginProvider";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();
  const pathname = usePathname();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { setWalletInfo } = useLoginProvider();
  const { walletInfo } = useWalletInfo();
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
            className="sm:hidden bg-black text-white border-l border-accent"
          >
            <SheetHeader>
              <SheetTitle className="text-white text-left">Menu</SheetTitle>
            </SheetHeader>
            <nav className="grid gap-0 text-sm font-medium mt-4">
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

              <WalletConnectButton open={open} setOpen={setOpen} />
              <WalletButton
                walletInfo={walletInfo}
                address={address}
                disconnect={() => {
                  setWalletInfo(undefined);
                  disconnect();
                }}
                router={router}
              />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:flex flex-row justify-between items-center w-full">
        <h1 className="capitalize text-2xl font-bold hidden md:block ml-2">
          {formatedPathname || "Assets"}
        </h1>
        <div className="flex flex-row justify-end items-center gap-4 w-full">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button
                onClick={() => setOpen(true)}
                className="flex flex-row gap-2 items-center justify-between text-sm px-4 bg-black text-white py-2"
              >
                <Image
                  src={"/walletconnect/icon.svg"}
                  alt="Wallet Icon"
                  width={25}
                  height={25}
                />
                <p className="font-bold">Connect</p>
              </button>
            </DialogTrigger>
            <DialogContent className="bg-black dark:bg-white flex flex-col justify-center items-center gap-6 max-w-md mx-auto border border-accent ">
              <DialogHeader>
                <div className="flex flex-row justify-start items-center gap-3">
                  <Image
                    src={"/walletconnect/icon-blue.svg"}
                    width={"60"}
                    height={"60"}
                    alt="Wallet Connect"
                  />
                  <div className="flex flex-col justify-start items-start text-left">
                    <DialogTitle>
                      <h3 className="text-base text-white">
                        Connect with WalletConnect
                      </h3>
                    </DialogTitle>
                    <DialogDescription className="text-xs text-accent dark:text-accent w-full md:max-w-xs">
                      Connect your wallet to start using ZeroWallet with any
                      dApps.
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="flex flex-col justify-start items-start gap-2 w-full">
                <div className="flex flex-row justify-between items-center border border-accent w-full">
                  <input
                    type="text"
                    placeholder="Scan QR Code or Enter the link"
                    className="bg-transparent w-full px-2 py-2 focus:outline-none text-white"
                  />
                  <ScanQrCode className="mr-2 text-white" />
                </div>
                <button className="bg-white border-accent border py-2 text-lg text-black w-full">
                  Connect
                </button>
              </div>
            </DialogContent>
          </Dialog>

          <WalletButton
            walletInfo={walletInfo}
            address={address}
            disconnect={() => {
              setWalletInfo(undefined);
              disconnect();
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

const WalletConnectButton = (props: any) => {
  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => props.setOpen(true)}
          className="flex flex-row gap-2 items-center mt-4 justify-start text-sm px-0 md:px-4 bg-black text-white py-4 md:py-2"
        >
          <Image
            src={"/walletconnect/icon.svg"}
            alt="Wallet Icon"
            width={25}
            height={25}
          />
          <p className="font-bold">Connect</p>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-black dark:bg-white flex flex-col justify-center items-center gap-6 max-w-md mx-auto border border-accent ">
        <DialogHeader>
          <div className="flex flex-row justify-start items-center gap-3">
            <Image
              src={"/walletconnect/icon-blue.svg"}
              width={"60"}
              height={"60"}
              alt="Wallet Connect"
            />
            <div className="flex flex-col justify-start items-start text-left">
              <DialogTitle>
                <h3 className="text-base text-white">
                  Connect with WalletConnect
                </h3>
              </DialogTitle>
              <DialogDescription className="text-xs text-accent dark:text-accent w-full md:max-w-xs">
                Connect your wallet to start using ZeroWallet with any dApps.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="flex flex-col justify-start items-start gap-2 w-full">
          <div className="flex flex-row justify-between items-center border border-accent w-full">
            <input
              type="text"
              placeholder="Scan QR Code or Enter the link"
              className="bg-transparent w-full px-2 py-2 focus:outline-none text-white"
            />
            <ScanQrCode className="mr-2 text-white" />
          </div>
          <button className="bg-white border-accent border py-2 text-lg text-black w-full">
            Connect
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
