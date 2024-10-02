"use client";
import Image from "next/image";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { LogOut, Wallet } from "lucide-react";
import Truncate from "./utils/truncate";
import { connectPassKey } from "./logic/passkey";
import { WebAuthnMode } from "@zerodev/passkey-validator";
import { storePasskey } from "./utils/storage";
import { useState } from "react";
import {
  useLoginProvider,
  useWalletInfo,
  useAccount,
  useDisconnect,
} from "./context/LoginProvider";
import TypingAnimation from "@/components/magicui/typing-animation";


export default function Home() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { setWalletInfo } = useLoginProvider();
  const { walletInfo } = useWalletInfo();

  const { disconnect } = useDisconnect();


  console.log();

  return (
    <div className="flex flex-col gap-12 md:gap-16 justify-center items-center min-h-[90vh] md:min-h-[95vh] text-center pt-12 md:pt-0 px-6">
      <div className="flex flex-col gap-20 items-center max-w-2xl">
        <Image
          // className="w-72 md:w-100"
          src={"/logo/logo.svg"}
          alt="Zero Logo"
          width={400}
          height={400}
        />

        <div className="flex flex-col items-center justify-center gap-3">
          <TypingAnimation
            duration={100}
            className="text-xl md:text-3xl"
            text="Personal Barista for Your Crypto Journey"
          />
          {/* <p className="text-base md:text-lg text-white">
            🚀 ZeroWallet powered by LayerZero: Simplified gas experience ⛽,
            seamless dApp access across all chains 🌐, no bridging needed.
          </p> */}
        </div>
      </div>

      <div className=" flex flex-col gap-4 items-center justify-center w-full max-w-sm text-lg">
        {!walletInfo && (
          <h2 className="text-accent text-sm">
            Login or Signup with your passkey
          </h2>
        )}
        <div className="flex flex-col gap-2 items-center justify-center w-full border border-accent p-4">
          {walletInfo ? (
            <div className="grid grid-cols-5 gap-2 items-center justify-between px-6 bg-white text-black w-full py-2.5">
              <div></div>
              <div className="flex flex-row gap-2 items-center justify-center col-span-3 w-full">
                <Image
                  src={walletInfo.icon || "/icons/wallet.svg"}
                  alt="Wallet Icon"
                  width={25}
                  height={25}
                />
                <p className="">{Truncate(address, 12, "...")}</p>
              </div>
              <div className="flex justify-end items-center">
                <LogOut
                  onClick={() => {
                    disconnect();
                    setWalletInfo(undefined);
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-center justify-center w-full">
          <button
            className="flex flex-row gap-2 items-center justify-center border border-accent px-6 py-2.5 w-full bg-white "
            onClick={async () => {
              // Handle the passkey auth here
              try {
                const passkey = await connectPassKey(
                  "BrewitWallet",
                  WebAuthnMode.Login
                );
                storePasskey(passkey);
                setWalletInfo({ name: "passkey", icon: "/icons/safe.svg" });
              } catch (e) {
                console.log(e);
              }
            }}
          >
            <Image
              src={"/icons/passkey.svg"}
              alt="Wallet Icon"
              width={30}
              height={30}
            />
            <p className="font-bold text-black">Login Now </p>
          </button>
              <div>(OR)</div>
              <button
            className="py-2.5 text-lg text-white w-full border border-accent"
            onClick={async () => {
              try {
                const passkey = await connectPassKey(
                  `Brew Wallet ${new Date().toLocaleDateString("en-GB")}`,
                  WebAuthnMode.Register
                );
                storePasskey(passkey);
                setWalletInfo({ name: "passkey", icon: "/icons/safe.svg" });
              } catch (e) {
                console.log(e);
              }
            }}
          >
            Create New
          </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
