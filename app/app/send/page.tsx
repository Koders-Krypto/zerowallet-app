"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Fuel, SendHorizonal } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

import { gasChainsTokens, getChainById } from "@/app/utils/tokens";

interface GasChainType {
  name: string;
  address: string;
  chainId: number;
  icon: string;
}

export default function Bridge() {
  const [selectedGasChain, setSelectedGasChain] = useState<GasChainType>(
    gasChainsTokens[0]
  );
  const [selectedTransferChainID, setSelectedTransferChainID] =
    useState<number>(0);
  const [selectedTokenID, setSelectedTokenID] = useState<number>(0);

  return (
    <div className="w-full h-full text-black border border-accent flex flex-col justify-center items-center gap-6 px-4 py-4 md:py-6">
      <div className="bg-white max-w-md w-full flex flex-col">
        <div className="flex flex-row justify-between items-center gap-4 py-4 border-b border-accent px-6">
          <h2 className="font-bold text-xl">Transfer Tokens</h2>
          <div className="flex flex-row gap-2 items-center justify-center text-sm">
            <Fuel size={20} />
            <Select
              value={selectedGasChain?.chainId.toString()}
              onValueChange={(e) => {
                const _data = getChainById(parseInt(e));
                if (_data) {
                  setSelectedGasChain(_data);
                }
              }}
            >
              <SelectTrigger className="w-34 bg-black px-4 py-2 text-white flex flex-row gap-2 items-center justify-center text-sm focus:outline-none focus:ring-offset-0 focus:ring-0 focus:ring-accent">
                <SelectValue placeholder="Gas Chain" />
              </SelectTrigger>
              <SelectContent>
                {gasChainsTokens.map((chain) => (
                  <SelectItem
                    key={chain.chainId}
                    value={chain.chainId.toString()}
                  >
                    <div className="flex flex-row justify-center items-center gap-2">
                      <Image
                        className="bg-white rounded-full p-1"
                        src={chain.icon}
                        alt={chain.name}
                        width={20}
                        height={20}
                      />
                      <h3>{chain.name}</h3>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-4 px-6 pb-4 pt-2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-end items-center text-sm">
              <div className="flex flex-row justify-center items-center gap-1">
                <div>0.001 ETH</div>
                <button className="font-bold">Max</button>
              </div>
            </div>
            <div className="grid grid-cols-3">
              <Select
                value={selectedTransferChainID.toString()}
                onValueChange={(e) => {
                  setSelectedTokenID(0);
                  setSelectedTransferChainID(parseInt(e));
                }}
              >
                <SelectTrigger className="bg-black text-white px-4 w-full py-3 h-full border-r border-accent focus:outline-none focus:ring-offset-0 focus:ring-0">
                  <SelectValue placeholder="Chain" />
                </SelectTrigger>
                <SelectContent>
                  {gasChainsTokens.map((chain, c) => (
                    <SelectItem key={chain.chainId} value={c.toString()}>
                      <div className="flex flex-row justify-center items-center gap-2 w-auto">
                        <Image
                          className="bg-white rounded-full p-1"
                          src={chain.icon}
                          alt={chain.name}
                          width={20}
                          height={20}
                        />
                        <h3>{chain.name}</h3>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                key={selectedTransferChainID}
                value={selectedTokenID.toString()}
                onValueChange={(e) => setSelectedTokenID(parseInt(e))}
              >
                <SelectTrigger className="bg-black text-white px-4 w-full py-3 h-full border-r border-accent focus:outline-none focus:ring-offset-0 focus:ring-0">
                  <SelectValue placeholder="Token" />
                </SelectTrigger>
                <SelectContent>
                  {gasChainsTokens[selectedTransferChainID].tokens.map(
                    (stoken, t) => (
                      <SelectItem key={t} value={t.toString()}>
                        <div className="flex flex-row justify-center items-center gap-2 w-auto">
                          <Image
                            className="bg-white rounded-full p-1"
                            src={stoken.icon}
                            alt={stoken.name}
                            width={20}
                            height={20}
                          />
                          <h3>{stoken.name}</h3>
                        </div>
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>

              <input
                type="number"
                placeholder={"0.01 ETH"}
                className="w-full h-full pr-2 py-3 bg-transparent text-black border-y border-accent border-r text-right focus:outline-none"
              />
            </div>
          </div>

          <input
            type="number"
            placeholder="Recipient address (0x0)"
            className="w-full h-full pl-4 py-3 bg-transparent text-black focus:outline-none border border-accent"
          />
          <div className="border border-accent p-2 flex flex-col text-sm gap-1">
            <div className="flex flex-row justify-between items-center">
              <h4>Gas Chain</h4>
              <h5 className="flex flex-row justify-center items-center gap-1">
                <Image
                  src={selectedGasChain.icon}
                  alt={selectedGasChain.name}
                  width={"20"}
                  height={"20"}
                />
                {selectedGasChain?.name}
              </h5>
            </div>
            <div className="flex flex-row justify-between items-center">
              <h4>Token</h4>
              <h5>ETH</h5>
            </div>
            <div className="flex flex-row justify-between items-center">
              <h4>Recipient Address</h4>
              <h5>0x0</h5>
            </div>
          </div>
          <button className="w-full bg-black text-white py-4 text-lg font-bold flex flex-row justify-center items-center gap-2">
            Transfer <SendHorizonal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
