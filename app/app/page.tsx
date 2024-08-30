/* eslint-disable @next/next/no-img-element */
"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginContext } from "../context/LoginProvider";
import Truncate from "../utils/truncate";
import {
  Copy,
  Fuel,
  PiggyBank,
  RefreshCcw,
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
import { getChain, Tokens, Transactions } from "../data/TempData";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useAccount } from "wagmi";
import Image from "next/image";
import moment from "moment";
import {
  getIconbySymbol,
  getNetworkLogobyName,
  getTokensByNetwork,
  getTotalBalanceDefi,
  getTotalBalanceToken,
  Networks,
  NetworkType,
  ZapperDEFIDataTypes,
  ZapperNFTDataTypes,
  ZapperTokenDataTypes,
} from "../data/Zapper";
import { Checkbox } from "@/components/ui/checkbox";
import { get } from "http";
import { GET_DEFI_DATA, GET_NFT_DATA, GET_TOKEN_DATA } from "../utils/urls";

export default function App() {
  const { toast } = useToast();
  const [openWalletConnect, setOpenWalletConnect] = useState(false);
  const [openShowQR, setOpenShowQR] = useState(false);
  const { address } = useAccount();
  const { connectedDapps } = useDappStore();
  const { disconnect } = useContext(SignClientContext);
  const [selectedNetworks, setSelectedNetworks] = useState<NetworkType[]>([]);
  const [tokensByNetwork, setTokensByNetwork] = useState<
    ZapperTokenDataTypes[]
  >([]);
  const { ensname, ensavatar } = useContext(LoginContext);
  const [totalBalance, setTotalBalance] = useState<number>(0);

  //Zapper Data
  const [tokenData, setTokenData] = useState<ZapperTokenDataTypes[]>([]);
  const [NFTData, setNFTData] = useState<ZapperNFTDataTypes[]>([]);
  const [DefiData, setDefiData] = useState<ZapperDEFIDataTypes[]>([]);

  const Auth = `Basic ${Buffer.from(
    `${process.env.NEXT_PUBLIC_ZAPPER_API_KEY}:`,
    "binary"
  ).toString("base64")}`;

  useEffect(() => {
    if (address) {
      fetchTokenData(address?.toString());
      fetchNFTData(address?.toString());
      fetchDefiData(address?.toString());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const fetchTokenData = async (address: string) => {
    const response = await fetch(`${GET_TOKEN_DATA}${address}`, {
      headers: {
        accept: "*/*",
        Authorization: Auth,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setTokenData(data[address.toString().toLowerCase()]);
    } else {
      console.log("error");
      setTotalBalance(0);
    }
  };
  const fetchDefiData = async (address: string) => {
    const response = await fetch(`${GET_DEFI_DATA}${address}`, {
      headers: {
        accept: "*/*",
        Authorization: Auth,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setDefiData(data);
      console.log(data, "Zapper Defi Data");
    } else {
      console.log("error");
      setDefiData([]);
    }
  };

  useEffect(() => {
    if (DefiData.length > 0 && tokenData.length > 0) {
      const _defiData = getTotalBalanceDefi(DefiData);
      const _tokenData = getTotalBalanceToken(tokenData);
      setTotalBalance(_defiData + _tokenData);
    }
  }, [DefiData, tokenData]);

  const fetchNFTData = async (address: string) => {
    const response = await fetch(`${GET_NFT_DATA}${address}&limit=25`, {
      headers: {
        accept: "*/*",
        Authorization: Auth,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setNFTData(data.items);
      console.log(data, "Zapper NFT Data");
    } else {
      console.log("error");
      setNFTData([]);
    }
  };

  useEffect(() => {
    console.log(tokenData, "Token Data");
    if (tokenData.length > 0) {
      const tokensByNetwork = getTokensByNetwork(
        tokenData,
        selectedNetworks.map((network) => network.name)
      );
      // save it in state and use
      setTokensByNetwork(tokensByNetwork);
    }
  }, [tokenData, selectedNetworks]);

  useEffect(() => {
    addAllNetworks();
  }, []);

  function addAllNetworks() {
    setSelectedNetworks((prevSelectedNetworks) => {
      const newSelectedNetworks = [...prevSelectedNetworks];

      Networks.forEach((network) => {
        if (!newSelectedNetworks.some((item) => item.name === network.name)) {
          newSelectedNetworks.push(network);
        }
      });

      return newSelectedNetworks;
    });
  }
  return (
    <div className=" flex flex-col items-start justify-center gap-6 w-full h-full">
      <div className="w-full border border-accent flex flex-col gap-6 px-4 py-4 md:py-6">
        <div className="w-full flex flex-col md:flex-row gap-4 justify-between items-center relative">
          <div className="flex flex-col md:flex-row gap-4 justify-start items-start md:items-center w-full">
            {ensavatar && (
              <img src={ensavatar} width={120} height={120} alt={ensname} />
            )}

            <div className="flex flex-col justify-start items-start ml-0 gap-1">
              <div className="flex flex-col-reverse justify-start items-start gap-1">
                <h1 className="text-4xl font-black">
                  ${totalBalance.toFixed(0)}
                </h1>
                <span className="text-accent text-sm">Networth</span>
              </div>
              {ensname && <div className="text-xl font-bold">{ensname}</div>}
              <div className="flex flex-row justify-center items-center gap-2 text-sm">
                <div>{Truncate(address, 20, "...")}</div>
                <div
                  onClick={() => {
                    CopytoClipboard(address || "");
                    toast({
                      success: true,
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
                    ensname={ensname}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-row justify-end absolute right-0 top-0">
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
        <div className="flex flex-col-reverse md:flex-row md:justify-between items-end md:items-center gap-2">
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
          <div className="flex flex-row justify-start items-center gap-3">
            <div className="flex flex-row justify-start items-center">
              {selectedNetworks.slice(0, 5).map((snetwork, s) => {
                return (
                  <div
                    className=" w-7 h-7 bg-white rounded-full -ml-2.5"
                    key={s}
                  >
                    <Image
                      className=" rounded-full p-px"
                      src={snetwork.logo}
                      width={30}
                      height={30}
                      alt={snetwork.name}
                    />
                  </div>
                );
              })}
              {selectedNetworks.length > 5 && (
                <span className="w-7 h-7 cursor-default -ml-2.5 p-px flex justify-center items-center text-sm bg-black rounded-full text-white text-center">
                  {selectedNetworks.length - 5}
                </span>
              )}
            </div>
            <Popover>
              <PopoverTrigger className="px-4 py-2.5 border border-accent bg-white text-black text-sm font-bold">
                Networks
              </PopoverTrigger>
              <PopoverContent className="flex flex-col justify-start gap-0 w-60 p-0 rounded-none max-w-lg mr-8">
                <div className="flex flex-row justify-between items-center py-2 px-4 border-b border-accent">
                  <h3 className="font-bold">All Networks</h3>
                  <div className="text-sm">
                    {selectedNetworks.length === 0 ? (
                      <button onClick={() => addAllNetworks()}>
                        Select all
                      </button>
                    ) : (
                      <button onClick={() => setSelectedNetworks([])}>
                        Clear all
                      </button>
                    )}
                  </div>
                </div>
                <div className="overflow-y-scroll px-4 py-0 h-60">
                  {Networks.map((network, c) => {
                    return (
                      <div
                        key={c}
                        className="flex flex-row justify-between items-center gap-2 py-2"
                      >
                        <div className="flex flex-row justify-start items-center gap-2">
                          <Image
                            className="rounded-full bg-white p-px"
                            src={network.logo}
                            width={25}
                            height={25}
                            alt={network.name}
                          />
                          <div className="grid gap-1.5">
                            <label
                              htmlFor={network.name}
                              className="text-sm truncate capitalize font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {network.name.replaceAll("-", " ")}
                            </label>
                          </div>
                        </div>
                        <Checkbox
                          className="rounded-full h-5 w-5"
                          onCheckedChange={() =>
                            setSelectedNetworks((prevSelectedNetworks) =>
                              prevSelectedNetworks.some(
                                (item) => item.name === network.name
                              )
                                ? prevSelectedNetworks.filter(
                                    (item) => item.name !== network.name
                                  )
                                : [...prevSelectedNetworks, network]
                            )
                          }
                          checked={selectedNetworks.some(
                            (item) => item.name === network.name
                          )}
                          id={network.name.toString()}
                        />
                      </div>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="border border-accent flex flex-col gap-4 w-full max-h-full h-24 px-4 pb-4 overflow-y-scroll flex-grow">
          <TabsContent value="Tokens" className="p-0 mt-0 flex flex-col gap-4">
            <div className="flex flex-col">
              {tokensByNetwork?.map((token, t) => {
                return (
                  <div
                    key={t}
                    className="grid grid-cols-2 md:grid-cols-9 gap-y-4 md:gap-8 py-3.5 items-center border-b border-accent"
                  >
                    <div className="flex flex-row justify-start items-center gap-2 md:col-span-5">
                      <div className="bg-black rounded-full p-1 relative">
                        <img
                          className="rounded-full bg-white"
                          src={
                            getIconbySymbol(token.token.symbol) ||
                            "/tokens/default.png"
                          }
                          width={30}
                          height={30}
                          alt={token.token.name}
                        />
                        <div className="absolute right-0 top-0 text-white text-sm">
                          <Image
                            className="rounded-full bg-white p-px shadow-md"
                            src={getNetworkLogobyName(token.token.network)}
                            width={15}
                            height={15}
                            alt={token.token.name}
                          />
                        </div>
                      </div>
                      <div>{token.token.name}</div>
                    </div>
                    <div className="md:col-span-2 text-right">
                      {token.token.balance.toFixed(4)} {token.token.symbol}
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-4">
              {NFTData.map((nft, n) => {
                return (
                  <div
                    className="flex flex-col justify-between items-center gap-2"
                    key={n}
                  >
                    <Image
                      className="w-full h-full"
                      src={
                        nft.token.medias[0]?.originalUrl ||
                        "/nfts/NFT-Default.png"
                      }
                      width={30}
                      height={30}
                      alt={nft.token.name}
                    />

                    <div className="flex flex-row flex-wrap justify-between items-center w-full text-base md:text-lg">
                      <div className="flex flex-row gap-2 justify-start items-center">
                        <div className=" line-clamp- w-24 truncate">
                          #{nft.token.tokenId}
                        </div>
                      </div>
                      <div className="text-base md:text-lg font-bold">
                        {nft.token.collection.floorPriceEth || 0} ETH
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value="Transactions" className="p-0 mt-0">
            <div className="flex flex-col gap-4 text-sm">
              {Transactions.map((transaction, t) => {
                return (
                  <div
                    className="flex flex-col gap-1 bg-white text-black"
                    key={t}
                  >
                    <div className="flex flex-col gap-1 bg-white text-black px-4 pt-4">
                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row gap-2 justify-start items-center">
                          <div>{Truncate(transaction.from, 12, "...")}</div>
                          <div>{">"}</div>
                          <div>{Truncate(transaction.to, 12, "...")}</div>
                        </div>
                        <div className="text-lg font-bold text-right">
                          {(Math.random() * 10).toFixed(2)} ETH
                        </div>
                      </div>

                      <div className="flex flex-row justify-between items-center w-full">
                        <div>Date & Time:</div>
                        <div>
                          {moment(transaction["date&time"]).format("LLL")}
                        </div>
                      </div>
                      <div className="flex flex-row justify-between items-center w-full">
                        <div>Chain:</div>
                        <div>
                          <img
                            src={getChain(parseInt(transaction.chainId))?.icon}
                            width={20}
                            height={20}
                            alt={getChain(parseInt(transaction.chainId))?.name}
                          />
                        </div>
                      </div>

                      <div className="flex flex-row justify-between items-center w-full">
                        <div>Value:</div>
                        <div>{transaction.value}ETH</div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-end items-end">
                      <div className="flex flex-row justify-end items-end border-l border-black border-t gap-2 px-2 py-2 w-fit">
                        <div>
                          <Fuel size={20} />
                        </div>
                        <div>{transaction.gas}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
