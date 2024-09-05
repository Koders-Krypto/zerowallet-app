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
import { CopyIcon, Plus } from "lucide-react";
import { useAccount } from "wagmi";
import Truncate from "@/app/utils/truncate";
import { CopytoClipboard } from "@/app/utils/copyclipboard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Settings() {
  const [gasChain, setGasChain] = useState<number>(0);
  const { address, isConnecting, isDisconnected } = useAccount();

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

  const FaqsData = [
    {
      question: "Is it accessible?",
      answer: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      question: "Is it accessible?",
      answer: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      question: "What is the best way to get started?",
      answer: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      question: "How do I use it?",
      answer:
        "You can use it to create a new account or import an existing one.",
    },
  ];
  return (
    <div className="border border-accent w-full h-full text-white p-4">
      <Tabs defaultValue="account" className="w-full h-full bg-transparent">
        <div className="flex flex-col md:flex-row gap-6 w-full h-full">
          <TabsList className="flex flex-row md:flex-col justify-start items-start h-fit w-full md:w-96 rounded-none bg-transparent text-xl border border-accent p-0 text-white divide-y divide-accent">
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
            <TabsTrigger
              className="py-3 w-full text-lg rounded-none data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:font-bold"
              value="faqs"
            >
              FAQ{"'"}s
            </TabsTrigger>
          </TabsList>
          <div className=" flex flex-col gap-2 w-full h-fit border border-accent">
            <TabsContent className="mt-0" value="account">
              <div className="flex flex-col justify-between items-center gap-0 w-full">
                <div className="flex flex-row justify-between items-center w-full border-b border-accent px-4 py-3">
                  <h2 className="text-xl font-bold">Connected Wallets</h2>
                  <button className="bg-white text-black px-4 text-sm py-2 flex flex-row items-center gap-2">
                    <Plus size={18} /> Add Wallet
                  </button>
                </div>
                <div className="flex flex-col w-full  px-4 py-3">
                  <div className="flex flex-row justify-between items-start">
                    <h3>EOA</h3>
                    <div className="flex flex-row justify-center items-center gap-2">
                      <h4>{Truncate(address, 24, "...")}</h4>
                      <button
                        onClick={() => {
                          CopytoClipboard(address || "");
                          toast({
                            success: true,
                            title: "Copy Address",
                            description:
                              "Adderess copied to clipboard successfully!",
                          });
                        }}
                        className="flex flex-row"
                      >
                        <CopyIcon size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent className="mt-0" value="password">
              <div className="flex flex-col justify-between items-center gap-0 w-full">
                <div className="flex flex-row justify-between items-center w-full border-b border-accent px-4 py-3">
                  <h2 className="text-xl font-bold">Set Gas Chain</h2>
                  <div className="flex flex-row justify-center items-center gap-4">
                    <h3 className="text-sm">Supported Chains</h3>
                    <div className="flex flex-row justify-center items-center">
                      {gasChainsTokens.map((show, s) => {
                        return (
                          <Image
                            className="-ml-2"
                            src={show.icon}
                            width={25}
                            height={25}
                            alt={show.name}
                            key={s}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-2 py-8 w-80 px-4">
                <Select
                  defaultValue={gasChain.toString()}
                  value={gasChain.toString()}
                  onValueChange={(e) => setGasChain(parseInt(e))}
                >
                  <SelectTrigger className="w-full text-black h-full py-2.5 focus:outline-none focus:ring-offset-0 focus:ring-0 focus:ring-accent border border-accent">
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
                <div className="flex flex-row justify-end items-center">
                  <button
                    onClick={() => saveGasChain()}
                    className="bg-black text-white border border-accent hover:bg-white hover:text-black px-4 py-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </TabsContent>
            <TabsContent className="mt-0" value="faqs">
              <div className="flex flex-row justify-between items-center w-full border-b border-accent px-4 py-3">
                <h2 className="text-xl font-bold">
                  Frequently Asked Questions
                </h2>
                <div className="flex flex-row justify-center items-center gap-4"></div>
              </div>
              <div className="px-4 py-0">
                <Accordion className=" divide-y divide-accent" type="multiple">
                  {FaqsData.map((faq, f) => {
                    return (
                      <AccordionItem
                        className="border-b-0 py-1 "
                        value={f.toString()}
                        key={f}
                      >
                        <AccordionTrigger className=" hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
