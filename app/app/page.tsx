"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccount } from "wagmi";
import Truncate from "../utils/truncate";
import { Copy, QrCode } from "lucide-react";
import { CopytoClipboard } from "../utils/copyclipboard";
import WalletConnectButton from "../components/WalletConnect/WalletConnect";
import { useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ShowQR from "../components/QR/ShowQR";
import { SignClientContext } from "../context/SignClientProvider";
import Image from "next/image";

export default function App() {
  const { toast } = useToast();
  const [openWalletConnect, setOpenWalletConnect] = useState(false);
  const [openShowQR, setOpenShowQR] = useState(false);
  const { address, isConnecting, isDisconnected } = useAccount();
  const { connectedDapp } = useContext(SignClientContext);
  return (
    <div className=" flex flex-col items-start justify-center gap-8 w-full h-full">
      <div className="w-full border border-accent flex flex-col gap-6 px-4 py-4 md:py-6">
        <div className="w-full flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex flex-row justify-start items-center w-full">
            <div className="flex flex-col justify-start items-start ml-0 gap-1">
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
        {connectedDapp && (
          <div className="grid grid-cols-5 w-full text-white text-sm">
            <div className="flex flex-row justify-start items-center gap-4 border border-accent px-4 py-3">
              <img
                src={connectedDapp?.icons[0]}
                alt="icon"
                width={30}
                height={30}
              />
              <div className="flex flex-col">
                <h3 className="font-bold line-clamp-1">
                  {connectedDapp?.name}
                </h3>
                <h4 className="text-xs line-clamp-1">
                  {connectedDapp?.description}
                </h4>
                <h5 className="text-xs truncate w-36">{connectedDapp?.url}</h5>
              </div>
            </div>
          </div>
        )}
      </div>
      <Tabs defaultValue="Tokens" className="w-full flex flex-col gap-4 h-full">
        <TabsList className="rounded-none h-fit grid grid-cols-3 md:max-w-md w-full gap-0 bg-white text-black data-[state=active]:bg-black data-[state=active]:text-white">
          <TabsTrigger className="py-2 text-sm" value="Tokens">
            Tokens
          </TabsTrigger>
          <TabsTrigger className="py-2 text-sm" value="NFTs">
            NFTs
          </TabsTrigger>
          <TabsTrigger className="py-2 text-sm" value="Transactions">
            Transactions
          </TabsTrigger>
        </TabsList>
        <div className="border border-accent flex flex-col gap-4 w-full h-full p-4">
          <TabsContent value="Tokens" className="p-0">
            Tokens
          </TabsContent>
          <TabsContent value="NFTs">NFTs</TabsContent>
          <TabsContent value="Transactions">Transactions</TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
