"use client";
import {
  gasChainsTokens,
  getChainById,
  getTokenInfo,
} from "@/app/utils/tokens";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeEventHandler, useEffect, useState } from "react";
import {
  BadgeInfo,
  CalendarIcon,
  ChevronsRight,
  CircleArrowUp,
  Loader2,
  PlusSquareIcon,
  Wallet2,
} from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, set } from "date-fns";
import { cn } from "@/lib/utils";
import {
  buildAddSessionKey,
  buildTokenBridge,
  buildVaultRedeem,
  getAllSessions,
  sendTransaction,
} from "@/app/logic/module";
import { useAccount, useLoginProvider } from "../../context/LoginProvider";
import useAccountStore from "@/app/store/account/account.store";
import {
  convertToSeconds,
  fixDecimal,
  formatTime,
  getRedeemBalance,
  getSendQuote,
  getTokenBalance,
  getVaultBalance,
} from "@/app/logic/utils";
import { scheduleJob } from "@/app/logic/jobsAPI";
import { WaitForUserOperationReceiptTimeoutError } from "permissionless";
import { ZeroAddress, formatEther, formatUnits, parseUnits } from "ethers";
import { getJsonRpcProvider } from "@/app/logic/web3";
import { setHours, setMinutes } from "date-fns";
import moment from "moment";
import { waitForExecution } from "@/app/logic/permissionless";
import { Switch } from "@/components/ui/switch";

type Investment = {
  address: string;
  token: string;
  targetToken: string;
  vault: string;
  account: string;
  validAfter: number;
  validUntil: number;
  limitAmount: bigint;
  limitUsed: bigint;
  lastUsed: number;
  refreshInterval: bigint;
};

export default function Investments() {
  const { chainId, setChainId } = useAccountStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);
  const [investValue, setInvestValue] = useState<string>("0");
  const [investmentAdded, setInvestmentAdded] = useState(true);
  const [fromChain, setFromChain] = useState<number>(chainId);
  const [toChain, setToChain] = useState<number>(chainId);
  const [fromToken, setFromToken] = useState<number>(0);
  const [balance, setBalance] = useState<string>("0");
  const [layerZeroHash, setLayerZeroHash] = useState<string>("");
  const [targetToken, setTargetToken] = useState<number>(0);
  const [selectedVault, setSelectedVault] = useState<any>();
  const [frequency, setFrequency] = useState<number>(0);
  const [refreshInterval, setRefreshInterval] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date>(new Date(Date.now()));
  const [endDate, setEndDate] = useState<Date>(() => {
    const end = new Date(Date.now());
    end.setMinutes(end.getMinutes() + 5);
    return end;
  });

  const [investments, setInvestments] = useState<Investment[]>([]);
  const [tokenVaultDetails, setTokenVaultDetails] = useState<any[]>([]);
  const [nextSessionId, setNextSessionId] = useState<number>(0);

  const { address } = useAccount();
  const { validator } = useLoginProvider();

  useEffect(() => {
    (async () => {
      const provider = await getJsonRpcProvider(chainId.toString());
      const token = getChainById(Number(fromChain))?.tokens[fromToken].address;
      if (token == ZeroAddress) {
        setBalance(formatEther(await provider.getBalance(address)));
      } else {
        setBalance(await getTokenBalance(token!, address, provider));
      }
    })();
  }, [fromChain, fromToken]);

  useEffect(() => {
    (async () => {
      if (investmentAdded) {
        const provider = await getJsonRpcProvider(chainId.toString());
        let tokensWithVault = getChainById(Number(fromChain))?.tokens.filter(
          (token: any) => token.vault != undefined
        );

        if (tokensWithVault) {
          const updatedTokens = await Promise.all(
            tokensWithVault.map(async (token) => {
              const vaultBalance = await getVaultBalance(
                token.vault!,
                address,
                provider
              );
              return {
                ...token,
                vaultBalance, // Add the vault balance to each token
              };
            })
          );

          setTokenVaultDetails(updatedTokens); // Tokens now contain their respective vault balances
        }

        const investments = await getAllSessions(chainId.toString());
        setNextSessionId(investments.length);
        setInvestments(
          investments.filter(
            (investment: Investment) =>
              investment.account.toLowerCase() === address?.toLowerCase()
          )
        );
        setInvestmentAdded(false);
        setToChain(chainId);

      }
    })();
  }, [chainId, address, investmentAdded]);

  const Frequency = [
    {
      label: "minutes",
    },
    {
      label: "hours",
    },
    {
      label: "days",
    },
  ];

  const getCurrentTime = (offset = 0) => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + offset); // Add offset to the current minutes
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [startTimeValue, setStartTimeValue] = useState<string>(
    getCurrentTime()
  );
  const [endTimeValue, setEndTimeValue] = useState<string>(getCurrentTime(5));

  const handleStartTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!startDate) {
      setStartTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(startDate, minutes), hours);
    setStartDate(newSelectedDate);
    setStartTimeValue(time);
  };

  const handleEndTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!endDate) {
      setEndTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(endDate, minutes), hours);
    setEndDate(newSelectedDate);
    setEndTimeValue(time);
  };

  const handleStartDaySelect = (date: Date | undefined) => {
    if (!startTimeValue || !date) {
      setStartDate(date!);
      return;
    }
    const [hours, minutes] = startTimeValue
      .split(":")
      .map((str) => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes
    );
    setStartDate(newDate);
  };

  const handleEndDaySelect = (date: Date | undefined) => {
    if (!endTimeValue || !date) {
      setEndDate(date!);
      return;
    }
    const [hours, minutes] = endTimeValue
      .split(":")
      .map((str) => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes
    );
    setEndDate(newDate);
  };

  return (
    <div className="flex flex-col gap-6 justify-start p-4 items-start border border-accent w-full h-full">
      <div className="flex flex-row justify-between items-center w-full">
        <h3 className="font-bold text-2xl">Investments</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <button className="bg-black text-white py-2 px-2 md:px-6 font-medium text-lg flex flex-row justify-center items-center gap-2 border border-black hover:border-accent hover:bg-transparent hover:text-white">
              <PlusSquareIcon />{" "}
              <span className="hidden md:block">Create a Plan</span>
            </button>
          </DialogTrigger>
          <DialogContent className="bg-black dark:bg-white flex flex-col justify-start items-start gap-4 rounded-none sm:rounded-none max-w-lg mx-auto border border-accent">
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-white text-xl">
                Create a Investment
              </DialogTitle>
              <DialogDescription className="text-base text-accent mt-0">
                Create a new investment plan to store your assets and earn
                yield.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col border border-accent divide-y divide-accent gap-px">
              <div className=" px-4 py-3 flex flex-col gap-2 w-full text-base">
                <div className="flex flex-row justify-between items-center text-sm">
                  <div className="flex flex-row justify-start items-center gap-1 text-accent">
                    <div className="text-accent">Invest</div>
                    <BadgeInfo size={14} />
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center gap-2 w-full">
                  <input
                    type="text"
                    // placeholder={0.01}
                    value={investValue}
                    className="bg-transparent focus:outline-none w-full text-white text-4xl"
                    onChange={(e) => setInvestValue(e.target.value)}
                  />
                  <div className="flex flex-row justify-center items-center gap-2">
                    <Select
                      value={fromChain.toString()}
                      onValueChange={(e) => {
                        setFromChain(parseInt(e));
                        setChainId(parseInt(e));
                        setInvestmentAdded(true);
                        setFromToken(0);
                      }}
                    >
                      <SelectTrigger className=" w-28 bg-white px-2 py-2 border border-accent text-black flex flex-row gap-2 items-center justify-center text-sm rounded-full focus:outline-none focus:ring-offset-0 focus:ring-0 focus:ring-accent">
                        <SelectValue placeholder="From Chain" />
                      </SelectTrigger>
                      <SelectContent>
                        {gasChainsTokens.map((from, f) => (
                          <SelectItem key={f} value={from.chainId.toString()}>
                            <div className="flex flex-row justify-center items-center gap-2">
                              <Image
                                className="bg-white rounded-full"
                                src={from.icon}
                                alt={from.name}
                                width={25}
                                height={25}
                              />
                              <h3 className="truncate">{from.name}</h3>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={fromToken.toString()}
                      onValueChange={(e) => {
                        setFromToken(parseInt(e));
                      }}
                    >
                      <SelectTrigger className=" w-24 bg-white px-2 py-2 border border-accent text-black flex flex-row gap-2 items-center justify-center text-sm rounded-full focus:outline-none focus:ring-offset-0 focus:ring-0 focus:ring-accent">
                        <SelectValue placeholder="From Token" />
                      </SelectTrigger>
                      
                      <SelectContent>
                        {getChainById(Number(fromChain))?.tokens.map(
                          (from, f) => (
                            <SelectItem key={f} value={f.toString()}>
                              <div className="flex flex-row justify-center items-center gap-2">
                                <Image
                                  className="bg-white rounded-full"
                                  src={from.icon}
                                  alt={from.name}
                                  width={25}
                                  height={25}
                                />
                                <h3 className="truncate uppercase">
                                  {from.name}
                                </h3>
                              </div>
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-row justify-between items-center text-sm">
                  <div className="text-accent">
                    ${Number(balance).toFixed(8)}
                  </div>
                  <div className="flex flex-row justify-center items-center gap-2 text-accent">
                    <Wallet2 size={16} />
                    <h5>{Number(balance).toFixed(8)}</h5>
                  </div>
                </div>
              </div>

              <div className=" px-4 py-3 flex flex-col gap-2 w-full text-base">
                <div className="flex flex-row justify-start items-center gap-1 text-accent text-sm">
                  <div className="text-accent">Buy</div>
                  <BadgeInfo size={14} />
                </div>
                <div className="flex flex-row justify-between items-center gap-2 w-full">
                  <input
                    type="number"
                    disabled
                    placeholder=""
                    className="bg-transparent focus:outline-none w-full text-white text-4xl"
                  />
                  <div className="flex flex-row justify-center items-center gap-2">
                    <Select
                      value={targetToken.toString()}
                      onValueChange={(e) => {
                        setTargetToken(parseInt(e));
                      }}
                    >
                      <SelectTrigger className=" w-24 bg-white px-2 py-2 border border-accent text-black flex flex-row gap-2 items-center justify-center text-sm rounded-full focus:outline-none focus:ring-offset-0 focus:ring-0 focus:ring-accent">
                        <SelectValue placeholder="From Chain" />
                      </SelectTrigger>
                      <SelectContent>
                        {tokenVaultDetails.map((from, f) => (
                          <SelectItem key={f} value={f.toString()}>
                            <div className="flex flex-row justify-center items-center gap-2">
                              <Image
                                className="bg-white rounded-full"
                                src={from.icon}
                                alt={from.name}
                                width={25}
                                height={25}
                              />
                              <h3 className="truncate">{from.name}</h3>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className=" px-4 py-3 flex flex-col gap-2 w-full text-base">
                <div className="flex flex-row justify-start items-center gap-1 text-accent text-sm">
                  <div className="text-accent">Every</div>
                  <BadgeInfo size={14} />
                </div>
                <div className="flex flex-row justify-between items-center gap-2 w-full">
                  <input
                    type="number"
                    value={refreshInterval}
                    onChange={(e) =>
                      setRefreshInterval(parseInt(e.target.value))
                    }
                    className="bg-transparent focus:outline-none w-full text-white text-4xl"
                  />
                  <div className="flex flex-row justify-center items-center gap-2">
                    <Select
                      value={frequency.toString()}
                      onValueChange={(e) => {
                        console.log(e);
                        setFrequency(parseInt(e));
                      }}
                    >
                      <SelectTrigger className=" w-24 bg-white px-2 py-2 border border-accent text-black flex flex-row gap-2 items-center justify-center text-sm rounded-full focus:outline-none focus:ring-offset-0 focus:ring-0 focus:ring-accent">
                        <SelectValue placeholder="Frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {Frequency.map((frequency, fre) => {
                          return (
                            <SelectItem key={fre} value={fre.toString()}>
                              {frequency.label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex flex-row divide-x divide-accent">
                <div className=" px-4 py-3 flex flex-col justify-start items-start gap-2 w-full text-base">
                  <div className="flex flex-row justify-start items-center gap-1 text-accent text-sm">
                    <div className="text-accent">Start Date</div>
                    <BadgeInfo size={14} />
                  </div>
                  <div className="flex flex-row justify-between items-center gap-2 w-full mt-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          className={cn(
                            "w-fit justify-start text-left font-normal flex flex-row items-center border-accent text-white border-0"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-white" />
                          {startDate ? (
                            format(startDate, "PPP") +
                            " " +
                            moment(startTimeValue, "HH:mm:ss").format("hh:mm A")
                          ) : (
                            <span className="text-white">Pick start date</span>
                          )}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <div className="w-full flex flex-row justify-center items-center mt-4">
                          <input
                            className="focus:outline-none text-black bg-transparent w-28"
                            type="time"
                            value={startTimeValue}
                            onChange={handleStartTimeChange}
                          />
                        </div>
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={handleStartDaySelect}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className=" px-4 py-3 flex flex-col justify-start items-start gap-2 w-full text-base">
                  <div className="flex flex-row justify-start items-center gap-1 text-accent text-sm">
                    <div className="text-accent">End Date</div>
                    <BadgeInfo size={14} />
                  </div>
                  <div className="flex flex-row justify-between items-center gap-2 w-full mt-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          className={cn(
                            "w-fit justify-start text-left font-normal flex flex-row items-center border-accent text-white border-0"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-white" />
                          {endDate ? (
                            format(endDate, "PPP") +
                            " " +
                            moment(endTimeValue, "HH:mm:ss").format("hh:mm A")
                          ) : (
                            <span className="text-white">Pick end date</span>
                          )}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <div className="w-full flex flex-row justify-center items-center mt-4">
                          <input
                            className="focus:outline-none text-black bg-transparent w-28"
                            type="time"
                            value={endTimeValue}
                            onChange={handleEndTimeChange}
                          />
                        </div>
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={handleEndDaySelect}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="bg-transparent py-3 w-full bg-white text-black border border-accent hover:bg-transparent hover:text-white text-lg"
              disabled={isLoading}
              onClick={async () => {
                setIsLoading(true);
                try {
                  const sessionKeyCall = await buildAddSessionKey(
                    chainId.toString(),
                    address,
                    investValue,
                    Math.floor(startDate.getTime() / 1000),
                    Math.floor(endDate.getTime() / 1000),
                    convertToSeconds(
                      refreshInterval,
                      Frequency[frequency].label as any
                    ),
                    getChainById(Number(fromChain))?.tokens[fromToken].address!,
                    tokenVaultDetails[targetToken].address!,
                    tokenVaultDetails[targetToken].vault!
                  );
                  await sendTransaction(
                    chainId.toString(),
                    sessionKeyCall.to,
                    sessionKeyCall.value,
                    sessionKeyCall.data,
                    validator,
                    address
                  );
                } catch (error) {
                  if (
                    error instanceof WaitForUserOperationReceiptTimeoutError
                  ) {
                    const hashPattern = /hash\s"([^"]+)"/;
                    const match = error.message.match(hashPattern);

                    if (match && match[1]) {
                      const transactionHash = match[1];
                      console.log("Transaction hash:", transactionHash);
                      await waitForExecution(
                        fromChain.toString(),
                        transactionHash
                      );
                    } else {
                      console.error(
                        "No transaction hash found in the error message."
                      );
                    }
                    // console.error("User operation timed out:", error.message);
                  } else {
                    console.log("Something went bad")
                  }
                }
                try {
                await scheduleJob(nextSessionId.toString(), chainId.toString());
                setDialogOpen(false);
                }
                catch(e)
                {
                  console.log('Schedule failed');
                }
                setInvestmentAdded(true);
                setIsLoading(false);
              }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating your investement plan...
                </span>
              ) : (
                "Create Plan"
              )}
            </button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 text-white w-full">
        {tokenVaultDetails.map((tokenVault, index) => (
          <div
            key={index}
            className=" w-full flex flex-col gap-0 border border-accent"
          >
            <div className="flex flex-row justify-between items-center px-4 py-3 border-b border-accent">
              <div className="flex flex-row justify-start items-center gap-2">
                <Image
                  src={tokenVault.icon!}
                  alt="From Token"
                  width={30}
                  height={30}
                />
                <div className="font-semibold">{tokenVault.name!}</div>
              </div>
              <div>
                <Image
                  className="bg-white rounded-full"
                  src={getChainById(Number(chainId))?.icon!}
                  alt="Wallet Icon"
                  width={30}
                  height={30}
                />
              </div>
            </div>
            <div className="px-4 py-3 flex flex-col justify-start items-start">
              <div className="flex flex-col justify-between items-start gap-4 w-full">
                <div className="flex flex-row justify-between items-center w-full">
                  <h4 className="font-semibold">Balance</h4>
                  <h5>
                    {fixDecimal(
                      tokenVault.vaultBalance,
                      parseInt(tokenVault.vaultBalance) ? 4 : 6
                    )}
                  </h5>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div></div>
                  <Dialog>
        <DialogTrigger onClick={()=> setSelectedVault(tokenVault)} className="border border-accent px-6 py-2.5 bg-white text-black text-sm hover:bg-transparent hover:text-white">Withdraw</DialogTrigger>
        <DialogContent className="bg-black text-white dark:bg-white flex flex-col justify-start items-start gap-4 rounded-none sm:rounded-none max-w-lg mx-auto border border-accent">
          <DialogHeader>
            <DialogTitle>Withdraw Funds</DialogTitle>
            <DialogDescription>
              Withdraw your funds from the vault to your wallet on desired
              chain.
            </DialogDescription>
            <div className="flex flex-col gap-0 justify-start items-start pt-4">
              <div className="grid grid-rows-3 gap-4 w-full ">
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm">Your Chain</label>
                  <button
                    disabled
                    className="flex flex-row justify-center items-center gap-2 border border-accent w-full py-3 px-4 disabled:cursor-not-allowed"
                  >
                    <Image
                      src={getChainById(chainId)?.icon!}
                      className="bg-white rounded-full"
                      alt="From Chain"
                      width={25}
                      height={25}
                    />
                    { getChainById(chainId)?.name }
                  </button>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm">Withdraw Amount</label>
                  <input
                    value={fixDecimal(
                      selectedVault?.vaultBalance,
                      parseInt(tokenVault.vaultBalance) ? 4 : 6
                    )}
                    className="flex flex-row justify-center items-center gap-2 border border-accent w-full py-3 px-4 bg-transparent text-white focus:outline-none"
                  />

                </div>
               
                <div className="flex flex-row justify-start items-center gap-2">
                      <Image
                        src={
                          getTokenInfo(Number(chainId), selectedVault?.address)?.icon!
                        }
                        alt="From Token"
                        width={30}
                        height={30}
                      />
                      <div className="font-semibold">
                        {getTokenInfo(Number(chainId), selectedVault?.address)?.name!}
                      </div>
                  </div>
              </div>
              <div className="flex flex-row justify-center items-center gap-2 w-full pt-4 pb-2.5">
                <CircleArrowUp size={30} className=" rotate-180" />
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm">To Chain</label>

                  <Select defaultValue="chain"
                    value={toChain.toString()}
                    onValueChange={(e) => {
                    setToChain(parseInt(e));
                  }}
                  >
                    <SelectTrigger className="w-auto border border-accent bg-transparent px-4 py-3 flex flex-row justify-center items-center gap-2 focus:outline-none focus:ring-offset-0 focus:ring-0 h-full">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        {gasChainsTokens.map((to, f) => (
                          <SelectItem key={f} value={to.chainId.toString()}>
                            <div className="flex flex-row justify-center items-center gap-2">
                              <Image
                                className="bg-white rounded-full"
                                src={to.icon}
                                alt={to.name}
                                width={25}
                                height={25}
                              />
                              <h3 className="truncate">{to.name}</h3>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm">You Will Receive</label>
                  <input
                    disabled
                    placeholder={fixDecimal(
                      selectedVault?.vaultBalance,
                      parseInt(tokenVault.vaultBalance) ? 4 : 6
                    )}

                    className="flex flex-row justify-center items-center gap-2 border border-accent w-full py-3 px-4 bg-transparent text-white focus:outline-none disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              <button className="bg-white border border-accent hover:bg-transparent hover:text-white text-black w-full px-6 py-3 text-lg mt-8"
                onClick={ async () => {
    
                  setWithdrawing(true);
                  try {
                  const provider = await getJsonRpcProvider(chainId.toString());
                  const redeemBalance = await getRedeemBalance( tokenVault.vault, address, provider);
                  const buildVault = await buildVaultRedeem(chainId.toString(), address, tokenVault.vault);
                  await sendTransaction(chainId.toString(), buildVault.to, buildVault.value, buildVault.data, validator, address);  

                  if(chainId!=toChain) {
                  const sendQuote =  await getSendQuote(tokenVault.address, parseInt(getChainById(toChain)?.endpointId!), address, redeemBalance, provider);
                  const buildBridge = await buildTokenBridge(chainId.toString(), address, tokenVault.address, sendQuote.sendParam, sendQuote.fee); 
                  setLayerZeroHash(await sendTransaction(chainId.toString(), buildBridge.to, buildBridge.value, buildBridge.data, validator, address));  
                  }
                  }
                  catch(e) {
                    console.log("Failed to withdraw")
                  }
                  setWithdrawing(false);

                }}
              >
                
                {withdrawing ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Withdrawing funds to account...
                </span>
              ) : (
                "Withdraw"
              )}
              </button>
   
            </div>
            
            { layerZeroHash && 
            <><span className="flex items-center justify-center">
                 Transaction sent across chain 🚀   
             </span>
            <a className="flex items-center justify-center underline" target="_blank"  href={`https://layerzeroscan.com/tx/${layerZeroHash}`}>Track here ✅</a>
            </>
            } 
          </DialogHeader>
        </DialogContent>
      </Dialog>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 flex-grow w-full">
        {investments.length > 0 && (
          <h3 className="font-bold text-2xl">Investment Plans</h3>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8 text-white w-full  max-h-full h-24 overflow-y-scroll flex-grow pt-5">
          {investments.map((investment, index) => (
            <div
              key={index}
              className=" w-full flex flex-col gap-0 border border-accent relative h-fit"
            >
              <div className="flex flex-row justify-between items-center px-4 py-3 border-b border-accent">
                <h2 className=" text-xl font-semibold">
                  Investment {index + 1}
                </h2>
                <div className="absolute -right-px -top-5">
                  <Image
                    className="bg-white rounded-full"
                    src={getChainById(Number(chainId))?.icon!}
                    alt="Wallet Icon"
                    width={30}
                    height={30}
                  />
                </div>
                <div>
                  <Switch
                    className="bg-accent rounded-full data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-accent border border-accent"
                    defaultChecked={
                      investment.validUntil > Math.floor(Date.now() / 1000)
                        ? true
                        : false
                    }
                  />
                </div>
              </div>
              <div className="px-4 py-3 flex flex-col justify-start items-start">
                <div className="flex flex-col justify-between items-start gap-4 w-full">
                  <div className="flex flex-row justify-between items-center gap-3 w-full">
                    <div className="flex flex-row justify-start items-center gap-2">
                      <Image
                        src={
                          getTokenInfo(Number(chainId), investment.token)?.icon!
                        }
                        alt="From Token"
                        width={30}
                        height={30}
                      />
                      <div className="font-semibold">
                        {getTokenInfo(Number(chainId), investment.token)?.name!}
                      </div>
                    </div>
                    <div>
                      <ChevronsRight />
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2">
                      <Image
                        src={
                          getTokenInfo(Number(chainId), investment.targetToken)
                            ?.icon!
                        }
                        alt="From Token"
                        width={30}
                        height={30}
                      />
                      <div className="font-semibold">
                        {
                          getTokenInfo(Number(chainId), investment.targetToken)
                            ?.name
                        }
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center w-full">
                    <h4 className="font-semibold">Invests</h4>
                    <div className="flex flex-row justify-start items-center gap-2">
                      <Image
                        src={
                          getTokenInfo(Number(chainId), investment.token)?.icon!
                        }
                        alt="From Token"
                        width={20}
                        height={20}
                      />
                      <div className="font-semibold">
                        {formatUnits(
                          investment.limitAmount,
                          getTokenInfo(Number(chainId), investment.token)
                            ?.decimals
                        )}
                      </div>

                      <div className="font-semibold">
                        {getTokenInfo(Number(chainId), investment.token)?.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center w-full">
                    <h4 className="font-semibold">Every</h4>
                    <h5>{formatTime(Number(investment.refreshInterval))}</h5>
                  </div>
                  <div className="flex flex-row justify-between items-center w-full">
                    <h4 className="font-semibold">Expires On</h4>
                    <>
                      <h5>{`${new Date(
                        Number(investment.validUntil) * 1000
                      ).toDateString()} ${new Date(
                        Number(investment.validUntil) * 1000
                      ).toLocaleTimeString()}`}</h5>
                    </>
                  </div>
                  <div className="flex flex-row justify-between items-center w-full">
                    <h4 className="font-semibold">Status</h4>
                    <h5 className="flex flex-row justify-center items-center gap-2">
                      {investment.validUntil > Math.floor(Date.now() / 1000) ? (
                        <div className="bg-green-600 h-3 w-3 rounded-full"></div>
                      ) : (
                        <div className="bg-red-600 h-3 w-3 rounded-full"></div>
                      )}
                      {investment.validUntil > Math.floor(Date.now() / 1000) ? (
                        <h5>Active</h5>
                      ) : (
                        <h5>Expired</h5>
                      )}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
