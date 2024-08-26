"use client";
import Image from "next/image";
import Footer from "./components/Footer";

import { useWalletInfo, useWeb3Modal } from "@web3modal/wagmi/react";
import { LogOut } from "lucide-react";
import { useDisconnect } from "wagmi";
import { useAccount } from "wagmi";
import Truncate from "./utils/truncate";

export default function Home() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { open, close } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { walletInfo } = useWalletInfo();

  return (
    <div className="flex flex-col gap-16 justify-center items-center min-h-screen text-center pt-24 md:pt-0  px-6">
      <div className="flex flex-col gap-8 items-center max-w-2xl">
        <Image
          className="w-56 md:w-80"
          src={"/logo/logo.svg"}
          alt="Zero Logo"
          width={280}
          height={280}
        />
        <p className="px-1.5 mt-2 text-base md:text-lg text-white">
          🚀 ZeroWallet powered by LayerZero: Simplified gas experience ⛽,
          seamless dApp access across all chains 🌐, no bridging needed.
        </p>
      </div>

      <div className=" flex flex-col gap-4 items-center justify-center w-full max-w-sm text-lg">
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

        {!walletInfo && (
          <h2 className="text-accent text-sm">
            Connect your wallet to get started
          </h2>
        )}
      </div>

      <Footer />
    </div>
  );
}
