"use client";
import { useWalletInfo } from "@web3modal/wagmi/react";
import Image from "next/image";
import { useAccount, useDisconnect } from "wagmi";
import Truncate from "../utils/truncate";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { walletInfo } = useWalletInfo();
  return (
    <div className="flex flex-row justify-end items-center w-full">
      <div className="flex flex-row gap-4 items-center justify-between px-4 bg-white text-black py-2.5">
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
          <LogOut />
        </button>
      </div>
    </div>
  );
}
