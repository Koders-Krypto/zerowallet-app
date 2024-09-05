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
import { ethers } from "ethers"; // Add this import
import { parseUnits } from "ethers"; // Update this import

import { gasChainsTokens, getChainById } from "@/app/utils/tokens";
import { writeContract, waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/app/wallet-connect/config/index";
import { Address, erc20Abi } from "viem";
import { switchChain, getChainId } from "@wagmi/core";

interface GasChainType {
  name: string;
  address: string;
  chainId: number;
  icon: string;
}

// ERC-20 contract ABI for transfer function
const ERC20_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: "to",
        type: "address",
      },
      {
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    type: "function",
  },
];

export default function Bridge() {
  const [selectedGasChain, setSelectedGasChain] = useState<GasChainType>(
    gasChainsTokens[0]
  );
  const [selectedTransferChainID, setSelectedTransferChainID] =
    useState<number>(0);
  const [selectedTokenID, setSelectedTokenID] = useState<number>(0);
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [disableTransfer, setDisableTransfer] = useState<boolean>(true);
  const [transferText, setTransferText] = useState<string>("Transfer");
  //   const [transferStatus, setTransferStatus] = useState<"IDLE" | "PENDING" | "SUCCESS" | "FAILED">("IDLE");

  const waitForTransaction = async (hash: Address) => {
    try {
      const transactionReceipt = await waitForTransactionReceipt(config, {
        confirmations: 2,
        hash,
      });
      if (transactionReceipt.status === "success") {
        return {
          success: true,
          data: transactionReceipt,
        };
      }
      throw transactionReceipt.status;
    } catch (e: any) {
      throw e;
    }
  };

  const validateInput = () => {
    if (!recipientAddress) {
      setDisableTransfer(true);
      setTransferText("Please enter a recipient address");
    }
    if (!amount) {
      setDisableTransfer(true);
      setTransferText("Please enter an amount");
    }
  };

  const transferTokens = async () => {
    const chainId = getChainId(config);
    if (chainId !== selectedGasChain.chainId) {
      await switchChain(config, { chainId: selectedGasChain.chainId });
    }

    // Convert the amount to Ether
    const amountInEther = parseUnits(amount, "ether");

    const result = await writeContract(config, {
      abi: ERC20_ABI,
      address: gasChainsTokens[selectedTransferChainID].tokens[selectedTokenID]
        .address as `0x${string}`,
      functionName: "transfer",
      args: [recipientAddress, amountInEther],
      chainId: selectedGasChain.chainId,
    });

    await waitForTransaction(result);
  };

  return (
    <div className="w-full h-full text-white border border-accent flex flex-col justify-start md:justify-center items-start md:items-center gap-6 px-4 py-4 md:py-6">
      <div className="bg-transparent border border-accent max-w-lg w-full flex flex-col">
        <div className="flex flex-row justify-between items-center gap-2 py-3.5 border-b border-accent px-4 md:px-6">
          <h2 className="font-bold text-xl truncate">Transfer Tokens</h2>
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
              <SelectTrigger className=" w-32 bg-black px-4 py-2 text-white flex flex-row gap-2 items-center justify-center text-sm focus:outline-none focus:ring-offset-0 focus:ring-0 focus:ring-accent border border-accent">
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
                        className="bg-white rounded-full"
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
        <div className="flex flex-col gap-4 px-4 md:px-6 pb-6 pt-7 relative">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-end items-center text-sm absolute top-1.5 right-6">
              <div className="flex flex-row justify-center items-center gap-1">
                <div>0.001 ETH</div>
                <button className="font-bold">Max</button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3">
              <div className="flex flex-row col-span-2 divide-x divide-accent border-r border-accent">
                <Select
                  value={selectedTransferChainID.toString()}
                  onValueChange={(e) => {
                    setSelectedTokenID(0);
                    setSelectedTransferChainID(parseInt(e));
                  }}
                >
                  <SelectTrigger className="bg-black text-white px-4 w-full py-3 h-full border-r-0 border-accent focus:outline-none focus:ring-offset-0 focus:ring-0">
                    <SelectValue placeholder="Chain" />
                  </SelectTrigger>
                  <SelectContent>
                    {gasChainsTokens.map((chain, c) => (
                      <SelectItem key={chain.chainId} value={c.toString()}>
                        <div className="flex flex-row justify-center items-center gap-2 w-auto">
                          <Image
                            className="bg-white rounded-full"
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
                  <SelectTrigger className="bg-black text-white px-4 w-full py-3 h-full border-l-0 border-accent focus:outline-none focus:ring-offset-0 focus:ring-0">
                    <SelectValue placeholder="Token" />
                  </SelectTrigger>
                  <SelectContent>
                    {gasChainsTokens[selectedTransferChainID].tokens.map(
                      (stoken, t) => (
                        <SelectItem key={t} value={t.toString()}>
                          <div className="flex flex-row justify-center items-center gap-2 w-auto">
                            <Image
                              className="bg-white rounded-full"
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
              </div>
              <input
                type="number"
                placeholder={"0.01 ETH"}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-full pr-2 py-3 bg-black text-white border-y-0 border-b md:border-y border-accent border-r md:border-l-0 border-l text-right focus:outline-none col-span-2 md:col-span-1"
              />
            </div>
          </div>

          <input
            type="string"
            placeholder="Recipient address (0x0)"
            className="w-full h-full pl-4 py-3 bg-transparent text-white focus:outline-none border border-accent"
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
          <div className="border border-accent px-4 py-3 flex flex-col text-sm gap-0 divide-y divide-accent">
            <div className="flex flex-row justify-between items-center pb-2">
              <h4>Gas Chain</h4>
              <h5 className="flex flex-row justify-center items-center gap-1.5">
                <Image
                  src={selectedGasChain.icon}
                  alt={selectedGasChain.name}
                  width={"20"}
                  height={"20"}
                />
                {selectedGasChain?.name}
              </h5>
            </div>
            <div className="flex flex-row justify-between items-center py-2">
              <h4>Token</h4>
              <h5>ETH</h5>
            </div>
            <div className="flex flex-row justify-between items-center pt-2">
              <h4>Recipient Address</h4>
              <h5>0x0</h5>
            </div>
          </div>
          <button
            className="w-full bg-white hover:bg-transparent hover:text-white border border-accent text-black py-3.5 text-lg font-bold flex flex-row justify-center items-center gap-2"
            onClick={transferTokens}
          >
            Transfer <SendHorizonal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
