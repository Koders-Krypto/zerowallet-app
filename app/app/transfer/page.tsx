"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Fuel, SendHorizonal } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

import { gasChainsTokens, getChainById } from "@/app/utils/tokens";
import useAccountStore from "@/app/store/account/account.store";
import { LoginContext, useAccount, useLoginProvider } from "../../context/LoginProvider";
import { sendTransaction, Transaction } from "@/app/logic/module";
import { getJsonRpcProvider } from "@/app/logic/web3";
import { ZeroAddress, formatEther, parseEther, parseUnits } from "ethers";
import { buildTransferToken, getTokenBalance, getTokenDecimals } from "@/app/logic/utils";
import { Hex } from "viem";
import Truncate from "@/app/utils/truncate";

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

  const [balance, setBalance] = useState<string>("0");
  
  const [tokenValue, setTokenValue] = useState<string>("0");
  const [toAddress, setToAddress] = useState<string>("");


  const { setChainId, chainId } = useAccountStore();
  const { address } = useAccount();
  const { validator } = useLoginProvider();



  async function sendAsset() {

    try {
    const token = getChainById(chainId)?.tokens[selectedTokenID].address;
    let call: Transaction = {to: '' as Hex , value: parseEther("0"),  data: '0x'}
    if(token == ZeroAddress) {
          call = {to: toAddress as Hex, value: parseEther(tokenValue),  data: '0x'}
        } else {
          const provider = await getJsonRpcProvider(chainId.toString())
            const parseAmount = parseUnits(tokenValue.toString(), await  getTokenDecimals(token!, provider))
            call.data = await buildTransferToken(token!, toAddress, parseAmount, provider) as Hex
            call.to = token as Hex
        }
    const result = await sendTransaction(chainId.toString(), [ call ], validator, address)
    
  } catch(e) {
    console.log('error', e)
  }  
  }

  useEffect(() => {
    (async () => {
      if(address) {
      const provider = await getJsonRpcProvider(chainId.toString());
      const token = getChainById(chainId)?.tokens[selectedTokenID].address;
      if (token == ZeroAddress) {
        setBalance(formatEther(await provider.getBalance(address)));
      } else {
        setBalance(await getTokenBalance(token!, address, provider));
      }
    }
    })();
  }, [chainId, selectedTokenID, address]);

  return (
    <div className="w-full h-full text-white border border-accent flex flex-col justify-start md:justify-center items-start md:items-center gap-6 px-4 py-4 md:py-6">
      <div className="bg-transparent border border-accent max-w-lg w-full flex flex-col">
        <div className="flex flex-row justify-between items-center gap-2 py-3.5 border-b border-accent px-4 md:px-6">
          <h2 className="font-bold text-xl truncate">Transfer Tokens</h2>
        </div>
        <div className="flex flex-col gap-4 px-4 md:px-6 pb-6 pt-7 relative">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-end items-center text-sm absolute top-1.5 right-6">
              <div className="flex flex-row justify-center items-center gap-1">
                <div>{ balance} ETH</div>
                <button className="font-bold">Max</button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3">
              <div className="flex flex-row col-span-2 divide-x divide-accent border-r border-accent">
                <Select
                  value={selectedTransferChainID.toString()}
                  onValueChange={(e) => {
                    setChainId(gasChainsTokens[parseInt(e)].chainId)
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
                type="text"
                placeholder="Enter Value"
                value={tokenValue}
                className="w-full h-full pr-2 py-3 bg-transparent text-white border-y-0 border-b md:border-y border-accent border-r md:border-l-0 border-l text-right focus:outline-none col-span-2 md:col-span-1"
                onChange={(e) => { setTokenValue(e.target.value); }}
              />

            </div>
          </div>

          <input
            type="text"
            placeholder="Recipient address (0x0)"
            value={toAddress}
            onChange={(e) => { setToAddress(e.target.value); }}
            className="w-full h-full pl-4 py-3 bg-transparent text-white focus:outline-none border border-accent"
          />
          <div className="border border-accent px-4 py-3 flex flex-col text-sm gap-0 divide-y divide-accent">
            <div className="flex flex-row justify-between items-center pb-2">
              <h4>Network</h4>
              <h5 className="flex flex-row justify-center items-center gap-1.5">
                <Image
                  src={gasChainsTokens[selectedTransferChainID]?.icon}
                  alt={gasChainsTokens[selectedTransferChainID]?.name}
                  width={"20"}
                  height={"20"}
                />
                {gasChainsTokens[selectedTransferChainID]?.name}
              </h5>
            </div>
            <div className="flex flex-row justify-between items-center py-2">
              <h4>Token</h4>
              <h5 className="flex flex-row justify-center items-center gap-1.5">
              <Image
                  src={gasChainsTokens[selectedTransferChainID]?.tokens[selectedTokenID]?.icon}
                  alt={gasChainsTokens[selectedTransferChainID]?.tokens[selectedTokenID]?.name}
                  width={"20"}
                  height={"20"}
                />
              {gasChainsTokens[selectedTransferChainID]?.tokens[selectedTokenID]?.name}</h5>
            </div>
            <div className="flex flex-row justify-between items-center pt-2">
              <h4>Recipient Address</h4>
              <h5>{  Truncate(toAddress, 12, "...") }</h5>
            </div>
          </div>
          <button className="w-full bg-white hover:bg-transparent hover:text-white border border-accent text-black py-3.5 text-lg font-bold flex flex-row justify-center items-center gap-2"
          onClick={async ()=>{
            
            await sendAsset()
          
          }}
          >
            Transfer <SendHorizonal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
