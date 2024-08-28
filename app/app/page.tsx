/* eslint-disable @next/next/no-img-element */
"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccount } from "wagmi";
import Truncate from "../utils/truncate";
import { Copy, QrCode, Trash } from "lucide-react";
import { CopytoClipboard } from "../utils/copyclipboard";
import WalletConnectButton from "../components/WalletConnect/WalletConnect";
import { useContext, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ShowQR from "../components/QR/ShowQR";
import { SignClientContext } from "../context/SignClientProvider";
import Image from "next/image";
import useDappStore from "../store/walletConnect";
import Link from "next/link";
import { WalletWorth } from "../utils/url";
import axios from "axios";

export default function App() {
  const { toast } = useToast();
  const [openWalletConnect, setOpenWalletConnect] = useState(false);
  const [openShowQR, setOpenShowQR] = useState(false);
  const { address, isConnecting, isDisconnected } = useAccount();
  const { connectedDapps } = useDappStore();
  const { disconnect } = useContext(SignClientContext);
  const [worth, setWorth] = useState<any>({});

  const fetchWorth = async (address: string) => {
    try {
      const res = await fetch(
        `${WalletWorth}${address}/net-worth?exclude_spam=true&exclude_unverified_contracts=true`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY || "",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setWorth(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchWorth(address || "");
  }, [address]);

  return (
    <div className=" flex flex-col items-start justify-center gap-6 w-full h-full">
      <div className="w-full border border-accent flex flex-col gap-6 px-4 py-4 md:py-6">
        <div className="w-full flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex flex-row justify-start items-center w-full">
            <div className="flex flex-col justify-start items-start ml-0 gap-1">
              <h1 className="text-2xl font-black">
                ${worth?.total_networth_usd}
              </h1>
              <div className="text-xl font-bold">rohanreddy.eth</div>
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
        <TabsList className="rounded-none h-fit p-px divide-x divide-black grid grid-cols-3 md:max-w-sm w-full gap-0 bg-white  text-black data-[state=active]:bg-black data-[state=active]:text-white">
          <TabsTrigger className="py-2 text-sm rounded-none" value="Tokens">
            Tokens
          </TabsTrigger>
          <TabsTrigger className="py-2 text-sm rounded-none" value="NFTs">
            NFTs
          </TabsTrigger>
          <TabsTrigger
            className="py-2 text-sm rounded-none"
            value="Transactions"
          >
            Transactions
          </TabsTrigger>
        </TabsList>
        <div className="border border-accent flex flex-col gap-4 w-full h-full p-4">
          <TabsContent value="Tokens" className="p-0 mt-0">
            Tokens
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
