"use client";
import { useWalletInfo } from "@web3modal/wagmi/react";
import Image from "next/image";
import { useAccount, useDisconnect } from "wagmi";
import Truncate from "../utils/truncate";
import { Power, ScanQrCode } from "lucide-react";
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
} from "@/components/ui/dialog";

export default function Topbar() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();
  const pathname = usePathname();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { walletInfo } = useWalletInfo();
  const [formatedPathname, setFormatedPathname] = useState("");

  useEffect(() => {
    const formatPathname = pathname.replace("/app", "").replace("/", "");
    setFormatedPathname(formatPathname);
  }, [pathname]);

  return (
    <div className="flex flex-row justify-between items-center w-full">
      <h1 className="capitalize text-xl font-semibold hidden md:block">
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
          <DialogContent className="bg-white dark:bg-white flex flex-col justify-start items-start gap-6 max-w-md mx-auto">
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
                    <h3 className="text-base">Connect with WalletConnect</h3>
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
                  placeholder="QR Code or link"
                  className="bg-transparent w-full px-2 py-2 focus:outline-none"
                />
                <ScanQrCode className="mr-2" />
              </div>
              <button className="bg-black border-accent border py-2 text-lg text-white w-full">
                Connect
              </button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex flex-row gap-3 items-center justify-between text-sm px-2 md:px-4 bg-black text-white py-2">
          <Image
            src={walletInfo?.icon || "/icons/wallet.svg"}
            alt="Wallet Icon"
            width={25}
            height={25}
          />
          <p className="">{Truncate(address, 12, "...")}</p>

          <button
            onClick={() => {
              disconnect();
              router.push("/");
            }}
            className="flex justify-end items-center"
          >
            <Power color="#F2F2F2" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
