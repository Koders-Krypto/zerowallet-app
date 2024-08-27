"use client";
import Image from "next/image";

import { useWalletInfo, useWeb3Modal } from "@web3modal/wagmi/react";
import { LogOut } from "lucide-react";
import { useDisconnect } from "wagmi";
import { useAccount } from "wagmi";
import Truncate from "./utils/truncate";
import Typewriter from "typewriter-effect";

export default function Home() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { open, close } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { walletInfo } = useWalletInfo();

  return (
    <div className="flex flex-col gap-12 md:gap-16 justify-center items-center min-h-[90vh] md:min-h-[95vh] text-center pt-6 md:pt-0 px-6">
      <div className="flex flex-col gap-20 items-center max-w-2xl">
        <Image
          className="w-56 md:w-72"
          src={"/logo/logo.svg"}
          alt="Zero Logo"
          width={280}
          height={280}
        />
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-2xl md:text-4xl font-bold">
            <Typewriter
              options={{
                cursor: "",
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("Welcome to ZeroWallet")
                  .pauseFor(1500)
                  .start();
              }}
            />
          </h1>
          <p className="text-base md:text-lg text-white">
            🚀 ZeroWallet powered by LayerZero: Simplified gas experience ⛽,
            seamless dApp access across all chains 🌐, no bridging needed.
          </p>
        </div>
      </div>

      <div className=" flex flex-col gap-4 items-center justify-center w-full max-w-sm text-lg">
        {!walletInfo && (
          <h2 className="text-accent text-sm">
            Connect your wallet to Get Started
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
                <LogOut onClick={() => disconnect()} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-center justify-center w-full">
              <button
                className="w-full bg-white text-black px-6 py-2.5"
                onClick={() => open()}
              >
                Connect Wallet
              </button>
              <div>(OR)</div>
              <button className="border border-accent px-6 py-2.5 w-full">
                Login with Passkey
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
