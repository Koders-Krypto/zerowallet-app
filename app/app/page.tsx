/* eslint-disable @next/next/no-img-element */
"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccount, useEnsName } from "wagmi";
import Truncate from "../utils/truncate";
import {
  Copy,
  PiggyBank,
  RefreshCcw,
  Send,
  SendHorizonal,
  Trash,
} from "lucide-react";
import { CopytoClipboard } from "../utils/copyclipboard";
import WalletConnectButton from "../components/WalletConnect/WalletConnect";
import { useContext, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ShowQR from "../components/QR/ShowQR";
import { SignClientContext } from "../context/SignClientProvider";
import useDappStore from "../store/walletConnect";
import Link from "next/link";
import { Chains, Tokens } from "../data/TempData";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function App() {
  const { toast } = useToast();
  const [openWalletConnect, setOpenWalletConnect] = useState(false);
  const [openShowQR, setOpenShowQR] = useState(false);
  const { address, isConnecting, isDisconnected } = useAccount();
  const { connectedDapps } = useDappStore();
  const { disconnect } = useContext(SignClientContext);

  const { data: ensname } = useEnsName({ address });

  return (
    <div className=" flex flex-col items-start justify-center gap-6 w-full h-full">
      <div className="w-full border border-accent flex flex-col gap-6 px-4 py-4 md:py-6">
        <div className="w-full flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex flex-row justify-start items-center w-full">
            <div className="flex flex-col justify-start items-start ml-0 gap-1">
              <h1 className="text-4xl font-black">$10,000</h1>
              <div className="text-xl font-bold">
                {ensname || "No ENS Name"}
              </div>
              <div className="flex flex-row justify-center items-center gap-2 text-sm">
                <div>{Truncate(address, 20, "...")}</div>
                <div
                  onClick={() => {
                    CopytoClipboard(address || "");
                    toast({
                      title: "Copy Address",
                      description: "Adderess copied to clipboard successfully!",
                    });
                  }}
                >
                  <Copy size={18} />
                </div>

                <div>
                  <ShowQR
                    open={openShowQR}
                    setOpen={setOpenShowQR}
                    address={address}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-row justify-start md:justify-end">
            <WalletConnectButton
              open={openWalletConnect}
              setOpen={setOpenWalletConnect}
            />
          </div>
        </div>
        {connectedDapps.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full text-white text-sm">
            <div
              className={`flex flex-col gap-4 w-full overflow-y-auto ${
                connectedDapps.length > 4 ? "max-h-96" : ""
              }`}
            >
              {connectedDapps.map((dapp: any) => (
                <div
                  className="flex flex-row justify-start items-center gap-4 border border-accent px-4 py-3 relative w-full"
                  key={dapp?.topic}
                >
                  <img
                    src={dapp?.icons[0]}
                    width={30}
                    height={30}
                    alt={dapp?.name}
                  />
                  <div className="flex flex-col w-full">
                    <h3 className="font-bold line-clamp-1">{dapp?.name}</h3>
                    <h4 className="text-xs line-clamp-1">
                      {dapp?.description}
                    </h4>
                    <Link
                      href={dapp?.url}
                      target="_blank"
                      className="text-xs truncate w-36 underline"
                    >
                      {dapp?.url}
                    </Link>
                  </div>
                  <button
                    className="absolute right-2 top-2 text-red-600"
                    onClick={() => disconnect(dapp?.topic)}
                  >
                    <Trash size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Tabs defaultValue="Tokens" className="w-full flex flex-col gap-4 h-full">
        <div className="flex flex-row justify-between items-center gap-2">
          <TabsList className="rounded-none h-fit p-0 divide-x divide-accent border border-accent grid grid-cols-3 md:max-w-sm w-full gap-0 bg-black  text-white data-[state=active]:bg-white data-[state=active]:text-black">
            <TabsTrigger
              className="py-2.5 text-sm rounded-none data-[state=active]:bg-white data-[state=active]:text-black"
              value="Tokens"
            >
              Tokens
            </TabsTrigger>
            <TabsTrigger
              className="py-2.5 text-sm rounded-none data-[state=active]:bg-white data-[state=active]:text-black"
              value="NFTs"
            >
              NFTs
            </TabsTrigger>
            <TabsTrigger
              className="py-2.5 text-sm rounded-none data-[state=active]:bg-white data-[state=active]:text-black"
              value="Transactions"
            >
              Transactions
            </TabsTrigger>
          </TabsList>
          <Select defaultValue="1">
            <SelectTrigger className="max-w-32 h-fit text-black py-2 rounded-none border-0 border-accent focus:outline-none focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Select Chain" className="text-black" />
            </SelectTrigger>
            <SelectContent>
              {Chains.map((chain, c) => {
                return (
                  <SelectItem
                    className="pb-4"
                    key={c}
                    value={chain.chainId.toString()}
                  >
                    <div className="flex flex-row justify-start items-center gap-2">
                      <div className="rounded-full flex justify-center items-center">
                        <img
                          src={chain.icon}
                          width={25}
                          height={20}
                          alt={chain.name}
                        />
                      </div>
                      <div className="truncate">{chain.name}</div>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="border border-accent flex flex-col gap-4 w-full h-full px-4 py-0">
          <TabsContent value="Tokens" className="p-0 mt-0 flex flex-col gap-4">
            <div className="flex flex-col overflow-y-scroll h-[38vh] md:h-[62vh]">
              {Tokens.map((token, t) => {
                return (
                  <div
                    key={t}
                    className="grid grid-cols-9 gap-4 py-3.5 items-center border-b border-accent"
                  >
                    <div className="flex flex-row justify-start items-center gap-2 col-span-5">
                      <div className="bg-black rounded-full p-1">
                        <img
                          className="rounded-full"
                          src={token.logoURI}
                          width={30}
                          height={30}
                          alt={token.name}
                        />
                      </div>
                      <div>{token.name}</div>
                    </div>
                    <div className="col-span-2 text-center">
                      {(Math.random() * 10).toFixed(2)} {token.symbol}
                    </div>
                    <div className="col-span-2 grid grid-cols-3 place-items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            {" "}
                            <SendHorizonal size={25} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Send</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            {" "}
                            <RefreshCcw size={25} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Swap</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            {" "}
                            <PiggyBank size={25} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Savings</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value="NFTs" className="p-0 mt-0">
            NFTs
          </TabsContent>
          <TabsContent value="Transactions" className="p-0 mt-0">
            Transactions
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
