"use client";
import BlurIn from "@/components/magicui/blur-in";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleArrowUp } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Swap() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 border border-accent w-full h-full text-center">
      <BlurIn word="Coming Soon" className="text-7xl !font-black text-accent" />
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent className="bg-black text-white dark:bg-white flex flex-col justify-start items-start gap-4 rounded-none sm:rounded-none max-w-lg mx-auto border border-accent">
          <DialogHeader>
            <DialogTitle>Withdraw Funds</DialogTitle>
            <DialogDescription>
              Withdraw your funds from the vault to your wallet on desired
              chain.
            </DialogDescription>
            <div className="flex flex-col gap-0 justify-start items-start pt-4">
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm">From Chain</label>
                  <button
                    disabled
                    className="flex flex-row justify-center items-center gap-2 border border-accent w-full py-3 px-4 disabled:cursor-not-allowed"
                  >
                    <Image
                      src="/chains/ethereum.webp"
                      alt="Ethereum"
                      width={25}
                      height={25}
                    />
                    Ethereum
                  </button>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm">Withdraw Amount</label>
                  <input
                    placeholder="0.01 ETH"
                    className="flex flex-row justify-center items-center gap-2 border border-accent w-full py-3 px-4 bg-transparent text-white focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-row justify-center items-center gap-2 w-full pt-4 pb-2.5">
                <CircleArrowUp size={30} className=" rotate-180" />
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm">To Chain</label>

                  <Select defaultValue="chain">
                    <SelectTrigger className="w-auto border border-accent bg-transparent px-4 py-3 flex flex-row justify-center items-center gap-2 focus:outline-none focus:ring-offset-0 focus:ring-0 h-full">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chain">
                        <div className="flex flex-row justify-center items-center gap-2">
                          <Image
                            src="/chains/ethereum.webp"
                            alt="Ethereum"
                            width={25}
                            height={25}
                          />
                          <span className="text-base">Ethereum</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm">Recieve Amount</label>
                  <input
                    disabled
                    placeholder="0.01 ETH"
                    className="flex flex-row justify-center items-center gap-2 border border-accent w-full py-3 px-4 bg-transparent text-white focus:outline-none disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              <button className="bg-white border border-accent hover:bg-transparent hover:text-white text-black w-full px-6 py-3 text-lg mt-8">
                Withdraw
              </button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
