"use client";
import { SignClientContext } from "@/app/context/SignClientProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScanQrCode } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
export default function WalletConnectButton(props: any) {
  const [url, setUrl] = useState<string>("");

  const { setPairing } = useContext(SignClientContext);

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => props.setOpen(true)}
          className="flex flex-row gap-2 items-center justify-start text-sm px-4 bg-black text-white py-2"
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
              onChange={(e) => setUrl(e.target.value)}
              className="bg-transparent w-full px-2 py-2 focus:outline-none text-white"
            />
            <ScanQrCode className="mr-2 text-white" />
          </div>
          <button
            onClick={() => {
              if (url) {
                console.log(url);
                setPairing(url);
                props.setOpen(false);
              }
            }}
            className="bg-white border-accent border py-2 text-lg text-black w-full"
          >
            Connect
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
