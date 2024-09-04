"use client";
import { findChainIndexByChainId, gasChainsTokens } from "@/app/utils/tokens";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";

export default function Settings() {
  const [gasChain, setGasChain] = useState<number>(0);

  function saveGasChain() {
    console.log(gasChain);
    if (gasChain !== undefined || gasChain !== null) {
      const data = gasChainsTokens[gasChain];

      localStorage.setItem("gasChain", JSON.stringify(data));
      toast({
        success: true,
        title: "Saved gas chain successfully",
      });
    } else {
      toast({
        success: false,
        title: "Please select a gas chain",
      });
    }
  }

  useEffect(() => {
    const data = localStorage.getItem("gasChain");
    if (data) {
      const _data = JSON.parse(data);
      const arrayID = findChainIndexByChainId(_data.chainId);

      setGasChain(arrayID);
    }
  }, []);
  return (
    <div className="border border-accent w-full h-full text-white p-4">
      <Tabs defaultValue="account" className="w-full h-full bg-transparent">
        <div className="flex flex-col md:flex-row gap-6 w-full h-full">
          <TabsList className="flex flex-row md:flex-col justify-start items-start h-fit w-full md:w-96 rounded-none bg-transparent text-xl border border-accent p-0 text-white">
            <TabsTrigger
              className="py-3 w-full text-lg rounded-none data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:font-bold"
              value="account"
            >
              Wallets
            </TabsTrigger>
            <TabsTrigger
              className="py-3 w-full text-lg rounded-none data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:font-bold"
              value="password"
            >
              Gas
            </TabsTrigger>
          </TabsList>
          <div className=" flex flex-col gap-2 w-full h-fit border border-accent p-4">
            <TabsContent className="mt-0" value="account">
              Make changes to your account here.
            </TabsContent>
            <TabsContent className="mt-0" value="password">
              <h2 className="text-xl font-bold">Set Gas Chain</h2>
              <div className="flex flex-col gap-2 py-8 w-64">
                <Select
                  defaultValue={gasChain.toString()}
                  value={gasChain.toString()}
                  onValueChange={(e) => setGasChain(parseInt(e))}
                >
                  <SelectTrigger className="w-full text-black h-12 focus:outline-none focus:ring-offset-0 focus:ring-0 focus:ring-accent border border-accent">
                    <SelectValue placeholder="Select chain" />
                  </SelectTrigger>
                  <SelectContent>
                    {gasChainsTokens.map((chain, c) => {
                      return (
                        <SelectItem value={c.toString()} key={c}>
                          <div className="flex flex-row justify-start px-0 items-center gap-2">
                            <Image
                              src={chain.icon}
                              alt={chain.name}
                              width="20"
                              height="20"
                            />
                            <h4>{chain.name}</h4>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <div className="flex flex-row justify-end items-center mt-2">
                  <button
                    onClick={() => saveGasChain()}
                    className="bg-black text-white border border-accent hover:bg-white hover:text-black px-4 py-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
